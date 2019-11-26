import React from "react";
import Axios from "axios";

import { Redirect } from "react-router-dom";

import Loader from "../Loader";
import ViewBannedWords from "./BannedWords/ViewBannedWords";
import CreateBannedWord from "./BannedWords/CreateBannedWord";
import Pagination from "../Pagination";

import ErrorCatch from "../ErrorCatch";

import { Spring } from 'react-spring/renderprops';
import ErrorPage from "./ErrorPage";

export default class BannedWords extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bannedWords: [],
            loading: false,

            redirectId: -1,
            redirect: false,
            profaneView: false,
            added: false,
            word: "",
            editMode: false,
            id: -1,
            mode: 0,
            addedSuccessfully: false,

            items: this.props.bannedWords.map((item) => { return { ...item, profane: false } }),
            currentPage: 1,
            itemsPerPage: 5,
            searchTerm: "",
            sortColumn: 0,
            sortDirection: false,
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.toggleProfane = this.toggleProfane.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addClick = this.addClick.bind(this);
        this.showWord = this.showWord.bind(this);
        this.hideWord = this.hideWord.bind(this);
        this.paginate = this.paginate.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
    }

    // componentDidMount() {
    //     this.setState({ loading: true });
    //     fetch("./api/bannedwords")
    //         .then(response => response.json())
    //         .then(data => { this.setState({ bannedWords: data, loading: false }); console.log(data) })
    //         .catch(err => console.log(err));
    // }

    paginate(number) {
        this.setState({ currentPage: number });
    }

    handleEditClick(i, word) {
        this.setState({ id: i, editMode: true, word: word });
    }

    handleDeleteClick(id) {
        //let result = confirm("Are you sure you want to delete this item?");
        if (true) {
            let notId = t => t.id !== id;
            let updatedList = this.state.bannedWords.filter(notId);
            //this.setState({ bannedWords: updatedList });
            Axios.delete("./api/bannedwords/" + id);

            this.setState((prevState) => {
                console.log(prevState.items.map((item) => {
                    if (item.id == id) {
                        return null;
                    }
                    return item;
                }));
                return (
                    {
                        items: prevState.items.filter( m => m.id != id )
                    }
                )
            });
        }
    }

    toggleProfane(event) {
        this.setState(prevState => {
            return {
                profaneView: !prevState.profaneView
            };
        });
    }

    handleChange(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
        if (name == "searchTerm") {
            this.setState({
                sortColumn: 0,
                sortDirection: false,
            });
        }
    }

    handleCancelClick(event) {
        event.preventDefault();

        this.setState({ word: "", editMode: false });
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.state.word.length != 3) {
            return;
        }

        let formData = new FormData();
        if (this.state.editMode) {
            formData.append("_method", "PUT");
        }

        formData.append("word", this.state.word);

        Axios({
            url: "/api/bannedwords" + (this.state.editMode ? "/" + this.state.id : ""),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                this.setState((prevState) => {
                    const pageId = Math.ceil((prevState.items.length + 1) / this.state.itemsPerPage);
                    return (
                        {
                            word: "", items: [...prevState.items, { id: response.data.id, word: response.data.word, profane: false, created_at: response.data.created_at }],
                            currentPage: pageId,
                        }
                    );
                });
                //this.props.refresh();
                // this.setState({ added: true });
                // if (!this.editMode) {
                //     this.setState({ bannedWords: [...this.state.bannedWords, { id: response.data.id, word: response.data.word }] });
                // }
                // else {
                //     this.setState({
                //         bannedWords: this.state.bannedWords.map(item => {
                //             if (item.id == this.state.id) {
                //                 return { id: item.id, word: this.state.word };
                //             }
                //             else {
                //                 return item;
                //             }
                //         })
                //     });
                // }
                // this.setState({ editMode: false, id: -1, word: "" });
                // setTimeout(() => { this.setState({ added: false }) }, 1000);
                //this.setState({ redirect: r });
            })
            .catch(err => console.log(err.response.data));
    }

    handleClick(i) {
        this.setState({ mode: i });
    }

    handleCreateClick(event) {
        this.setState({ mode: 1 });
    }

    addClick() {
        this.setState({ mode: 0, addedSuccessfully: true });
        setTimeout(() => {
            this.setState({ addedSuccessfully: false });
        }, 1000).bind(this);
    }

    handleAddClick(event) {

    }

    showWord(id) {
        this.setState((prevState) => {
            return (
                {
                    items: prevState.items.map((item) => {
                        if (item.id != id) {
                            return { ...item, profane: false };
                        }
                        else {
                            return { ...item, profane: true };
                        }
                    })
                }
            );
        });
    }

    hideWord(id) {
        this.setState((prevState) => {
            return (
                {
                    items: prevState.items.map((item) => {
                        return { ...item, profane: false };
                    })
                }
            )
        });
    }

    handleClear() {
        this.setState({ searchTerm: "", currentPage: 1, sortColumn: 0, sortDirection: false });
    }

    handleSortClick(i) {
        console.log(i);
        if (this.state.sortColumn == i) {
            this.setState(prevState => {
                return {
                    sortDirection: !prevState.sortDirection
                };
            });
        }
        else {
            this.setState({ sortColumn: i, sortDirection: false });
        }
    }

    render() {
        console.log(this.props);
        if (this.props.error) {
            return <ErrorPage errorObj={this.props.errorObj} reload={this.props.refresh} />
        }

        if (this.props.loading) {
            return <Loader />
        }

        let child = <div>Banned Words</div>;

        let filteredWords = this.state.items.filter((m) => { return m.word.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });

        if (this.state.sortColumn == 0) {
            if (!this.state.sortDirection) {
                filteredWords = filteredWords.sort((x, y) => { return x.id - y.id });
            }
            else {
                filteredWords = filteredWords.sort((x, y) => { return y.id - x.id });
            }
        }
        else if (this.state.sortColumn == 1) {
            if (!this.state.sortDirection) {
                filteredWords = filteredWords.sort((x, y) => { return x.word.localeCompare(y.word) });
            }
            else {
                filteredWords = filteredWords.sort((x, y) => { return y.word.localeCompare(x.word) });
            }
        }
        else if (this.state.sortColumn == 2) {
            if (this.state.sortDirection) {
                filteredWords = filteredWords.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
                });
            }
            else {
                filteredWords = filteredWords.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
                });
            }
        }

        const words = filteredWords.map(item => {
            return (
                <tr key={item.id} onMouseEnter={(event) => { this.showWord(item.id) }} onMouseLeave={(event) => { this.hideWord(item.id) }}>
                    <td>{item.id}</td>
                    <td>{item.profane ? item.word : item.word[0] + "*" + item.word[2]}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <button onClick={(event) => { this.handleDeleteClick(item.id) }} className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = words.slice(indexOfFirstItem, indexOfLastItem);

        switch (this.state.mode) {
            case 0:
                child = <div className="admin-boxshadow">
                    <div className="admin-top-box"><h2>Kiosk Categories</h2></div>
                    <div style={{ padding: "10px" }}>
                        {/* <button className="btn btn-primary btn-square" onClick={(event) => { this.handleCreateClick() }}>Create New</button>
                        <hr /> */}
                        <input type="text" placeholder="Add word..." name="word" value={this.state.word} onChange={this.handleChange} />
                        <button className="btn btn-primary btn-square" onClick={(event) => { this.onSubmit(event) }}>Add</button>
                        <hr />
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                        {this.state.searchTerm != "" ? <p>{`Showing results ${indexOfFirstItem + 1}-${currentItems.length < indexOfLastItem ? currentItems.length : indexOfLastItem} out of ${words.length}`} <p onClick={(event) => { this.handleClear() }} style={{ display: "inline-block", textDecoration: "underline", cursor: "pointer", color: "blue" }}>clear</p></p> : null}
                        <hr />
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th onClick={(event) => { this.handleSortClick(0) }} className={this.state.sortColumn == 0 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>ID</th>
                                    <th onClick={(event) => { this.handleSortClick(1) }} className={this.state.sortColumn == 1 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Word</th>
                                    <th onClick={(event) => { this.handleSortClick(2) }} className={this.state.sortColumn == 2 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredWords.length} paginate={this.paginate} activePage={this.state.currentPage} />
                    </div>
                </div>;
                //child = <ViewBannedWords bannedWords={this.props.bannedWords} loading={this.props.loading} addedSuccessfully={this.state.addedSuccessfully} />
                break;
            case 1:
                child = <CreateBannedWord submitClick={this.addClick} />
                break;
        }

        return <div>{child}</div>;

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(1)}>Create New</button>
            </div>
            <ErrorCatch>
                {/* <div style={{ display: "inline-block" }}>
                    <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => { this.addClick() }}>Create New</button>
                </div> */}
                {null}
            </ErrorCatch>

            {/* {this.state.addedSuccessfully ?
            <Spring from={{ padding: "0px" }} to={{ padding: "20px" }}>
                { props => (
                    <div style={{ ...props, backgroundColor: "green", width: "100vh" }}><p>Item added successfully.</p></div>
                )}
            </Spring>
            :
            null
            } */}

        </div>

        // if (this.state.redirect) {
        //     return <Redirect to={`./createBannedWord/${this.state.redirectId}`} />
        // }

        // let words = this.state.bannedWords.map(item => {
        //     return (
        //         <tr key={item.id}>
        //             <td>
        //                 <p>{this.state.profaneView ? item.word : `${item.word[0]}*${item.word[2]}`}</p>
        //             </td>
        //             <td>
        //                 <button onClick={(event) => this.handleEditClick(item.id, item.word)} className="btn btn-success">Edit</button>
        //                 <button onClick={(event) => this.handleDeleteClick(item.id)} className="btn btn-danger">Delete</button>
        //             </td>
        //         </tr>
        //     )
        // });

        // return (
        //     <div>
        //         <div>
        //             <h2>Banned Words</h2>
        //             <br />
        //             <form onSubmit={this.onSubmit}>
        //                 <div className="form-group">
        //                     <label><h3>Word</h3>
        //                         <input className="form-control" type="text" name="word" value={this.state.word} onChange={this.handleChange} placeholder="Word here..." />
        //                         <p style={{ color: "red", display: this.state.word.length != 3 ? "block" : "none" }}>Word must be exactly 3 characters</p>
        //                     </label>
        //                 </div>
        //                 {this.state.added ?
        //                     <div>Item {this.state.editMode ? "updated" : "added"} successfully.</div> :
        //                     null
        //                 }
        //                 <button className={this.state.editMode ? "btn btn-success" : "btn btn-primary"}>{this.state.editMode ? "Update" : "Add"}</button>
        //                 {
        //                     this.state.editMode ? <button className="btn btn-danger" onClick={ this.handleCancelClick }>Cancel</button> :
        //                     null
        //                 }
        //             </form>
        //         </div>
        //         <div>
        //             <button className={this.state.profaneView ? "btn btn-success" : "btn btn-warning"} onClick={this.toggleProfane}>Turn profane view {this.state.profaneView ? "on" : "off"}</button>
        //             <br />
        //             <table className="admin-table-new" style={{ width: "50vh" }}>
        //                 <thead>
        //                     <tr><td>Word</td><td>Actions</td></tr>
        //                 </thead>
        //                 <tbody>
        //                     {words}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // );
    }
}