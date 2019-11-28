import React from "react";

import CreateCategory from "./KioskCategories/CreateCategory";
import Loader from "../Loader";
import Message from "./Message";
import ViewCategories from "./KioskCategories/ViewCategories";
import Pagination from "../Pagination";
import { withRouter } from "react-router-dom";
import DeleteCategory from "./KioskCategories/DeleteCategory";
import Axios from "axios";
import qs from "qs";
import ErrorPage from "./ErrorPage";

class KioskCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            addedSuccessfully: false,
            editMode: false,
            editId: -1,
            currentPage: 1,
            itemsPerPage: 5,
            items: this.props.categories,
            searchTerm: "",
            sortColumn: 0,
            sortDirection: false,
            deleteItem: null,
            deleteLoading: false,
            reassignCategory: -1,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.paginate = this.paginate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleCancelCreateClick = this.handleCancelCreateClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCancelDeleteClick = this.handleCancelDeleteClick.bind(this);
        this.handleActualDeleteClick = this.handleActualDeleteClick.bind(this);
    }

    handleCreateClick() {
        this.setState({ mode: 1 });
    }

    handleEditClick(i) {
        this.setState({ editId: i, editMode: true, mode: 1 });
    }

    handleSubmitted() {
        console.log("refreshing");
        this.props.refresh();
        this.setState({ mode: 0, currentPage: Math.ceil((this.props.categories.length + 1) / this.state.itemsPerPage) });
        // this.setState({ mode: 0, addedSuccessfully: true });
        // setTimeout(() => {
        //     this.setState({ addedSuccessfully: false });
        // }).bind(this);
    }

    handleCancelCreateClick(event) {
        event.preventDefault();
        console.log("Reeeee");
        this.setState({ mode: 0 });
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log(this.state.mode);
    }

    paginate = (number) => this.setState({ currentPage: number });

    viewClick = (i) => this.props.history.push(`/${i}`);

    handleChange(event) {
        //[name, value] = event.target;
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCreateClick() {
        this.setState({ mode: 1 });
    }

    handleClear() {
        this.setState({ searchTerm: "", currentPage: 1, sortColumn: 0, sortDirection: false });
    }

    handleDeleteClick(i) {
        const di = this.state.items.find(m => m.id == i);
        this.setState({ mode: 2, deleteItem: di });
    }

    handleCancelDeleteClick(event) {
        console.log("ree");
        event.preventDefault();
        this.setState({ mode: 0, deleteItem: null });
    }

    handleActualDeleteClick(event) {
        //const url = qs.stringify
        this.setState({ deleteLoading: true });
        // Axios.post(`./api/categories/${this.state.deleteItem.id}/${this.state.reassignCategory}`, {},
        //     {
        //         headers: {
        //             "Authorization": "Bearer " + localStorage.getItem("id_token")
        //         }
        //     }
        // )
        Axios({
            url: `./api/categories/${this.state.deleteItem.id}/${this.state.reassignCategory}`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("id_token")
            }
        })
            .then(response => {
                console.log(response)
                this.setState({ deleteLoading: false, deleteItem: null, mode: 0 });
                this.props.refresh();
                this.props.refreshPages();
            })
            .catch(err => console.log(err));
    }

    handleSortClick(i) {
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
        if (this.props.error) {
            return <ErrorPage errorObj={this.props.errorObj} reload={this.props.refresh} />
        }
        if (this.props.loading) {
            return <Loader />
        }

        let child = <div>Categories</div>;

        let filteredCategories = this.props.categories.filter((m) => { return m.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });
        if (this.state.sortColumn == 0) {
            if (!this.state.sortDirection) {
                filteredCategories = filteredCategories.sort((x, y) => { return x.id - y.id });
            }
            else {
                filteredCategories = filteredCategories.sort((x, y) => { return y.id - x.id });
            }
        }
        else if (this.state.sortColumn == 1) {
            if (!this.state.sortDirection) {
                filteredCategories = filteredCategories.sort((x, y) => { return x.name.localeCompare(y.name) });
            }
            else {
                filteredCategories = filteredCategories.sort((x, y) => { return y.name.localeCompare(x.name) });
            }
        }
        else if (this.state.sortColumn == 2) {
            if (!this.state.sortDirection) {
                filteredCategories = filteredCategories.sort((x, y) => { return x.numPages - y.numPages });
            }
            else {
                filteredCategories = filteredCategories.sort((x, y) => { return y.numPages - x.numPages });
            }
        }
        else if (this.state.sortColumn == 3) {
            if (this.state.sortDirection) {
                filteredCategories = filteredCategories.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    console.log(d1);
                    return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
                });
            }
            else {
                filteredCategories = filteredCategories.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
                });
            }
        }

        // let child = <div>Categories</div>;

        // const filteredCategories = this.state.items.filter((m) => { return m.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });

        const categories = filteredCategories.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.numPages}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <button className="btn btn-outline-dark btn-square" onClick={(event) => { this.viewClick(item.id) }}>View</button> | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> | <button onClick={(event) => { this.handleDeleteClick(item.id) }} className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

        switch (this.state.mode) {
            case 0:
                child = <div className="admin-boxshadow">
                    <div className="admin-top-box"><h2>Kiosk Categories</h2></div>
                    <div style={{ padding: "10px" }}>
                        <button className="btn btn-primary btn-square" onClick={(event) => { this.handleCreateClick() }}>Create New</button>
                        <hr />
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                        {this.state.searchTerm != "" ? <p>{`Showing results ${indexOfFirstItem + 1}-${currentItems.length < indexOfLastItem ? currentItems.length : indexOfLastItem} out of ${categories.length}`} <p onClick={(event) => { this.handleClear() }} style={{ display: "inline-block", textDecoration: "underline", cursor: "pointer", color: "blue" }}>clear</p></p> : null}
                        <hr />

                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th onClick={(event) => { this.handleSortClick(0) }} className={this.state.sortColumn == 0 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>ID</th>
                                    <th onClick={(event) => { this.handleSortClick(1) }} className={this.state.sortColumn == 1 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Name</th>
                                    <th onClick={(event) => { this.handleSortClick(2) }} className={this.state.sortColumn == 2 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Page Count</th>
                                    <th onClick={(event) => { this.handleSortClick(3) }} className={this.state.sortColumn == 3 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredCategories.length} paginate={this.paginate} activePage={this.state.currentPage} />
                    </div>
                </div>;
                break;
            case 1:
                const category = this.state.items.find(m => m.id == this.state.editId);
                child = <CreateCategory
                    handleCancelCreateClick={this.handleCancelCreateClick}
                    handleSubmitted={this.handleSubmitted} refresh={this.props.refresh} category={category}
                />
                break;
            case 2:
                child = <DeleteCategory item={this.state.deleteItem} handleCancelDeleteClick={this.handleCancelDeleteClick}
                    handleActualDeleteClick={this.handleActualDeleteClick}
                    categories={this.state.items}
                    reassign={this.state.reassignCategory}
                    handleChange={this.handleChange}
                />
                break;
        }

        return <div>{child}</div>
    }
}

export default withRouter(KioskCategories);