import React from "react";
import Axios from "axios";

import { Redirect } from "react-router-dom";

import Loader from "../Loader";
import ViewBannedWords from "./BannedWords/ViewBannedWords";
import CreateBannedWord from "./BannedWords/CreateBannedWord";

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
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.toggleProfane = this.toggleProfane.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind( this );
        this.handleClick = this.handleClick.bind( this );
    }

    componentDidMount() {
        this.setState( { loading: true } );
        fetch("./api/bannedwords")
            .then(response => response.json())
            .then(data => { this.setState({ bannedWords: data, loading: false }); console.log(data) })
            .catch(err => console.log(err));
    }

    handleEditClick(i, word) {
        this.setState({ id: i, editMode: true, word: word });
    }

    handleDeleteClick(id) {
        let result = confirm("Are you sure you want to delete this item?");
        if (result) {
            let notId = t => t.id !== id;
            let updatedList = this.state.bannedWords.filter(notId);
            this.setState({ bannedWords: updatedList });
            Axios.delete("./bannedwords/" + id);
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
    }

    handleCancelClick( event )
    {
        event.preventDefault();

        this.setState( { word: "", editMode: false } );
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
            url: "./api/bannedwords" + (this.state.editMode ? "/" + this.state.id : ""),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                this.setState({ added: true });
                if (!this.editMode) {
                    this.setState({ bannedWords: [...this.state.bannedWords, { id: response.data.id, word: response.data.word }] });
                }
                else {
                    this.setState({
                        bannedWords: this.state.bannedWords.map(item => {
                            if (item.id == this.state.id) {
                                return { id: item.id, word: this.state.word };
                            }
                            else {
                                return item;
                            }
                        })
                    });
                }
                this.setState({ editMode: false, id: -1, word: "" });
                setTimeout(() => { this.setState({ added: false }) }, 1000);
                //this.setState({ redirect: r });
            })
            .catch(err => console.log(err.response.data));
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log( this.state.mode );
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Banned Words</div>;

        switch (this.state.mode) {
            case 0:
                child = <ViewBannedWords />
                break;
            case 1:
                child = <CreateBannedWord />
                break;
            }

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => this.handleClick(1)}>Create New</button>
            </div>
            {child}
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