import React from "react";

import CreateCategory from "./KioskCategories/CreateCategory";
import Loader from "../Loader";
import Message from "./Message";
import ViewCategories from "./KioskCategories/ViewCategories";
import Pagination from "../Pagination";
import { withRouter } from "react-router-dom";

class KioskCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            addedSuccessfully: false,
            editMode: false,
            editId: -1,
            currentPage: 1,
            itemsPerPage: 10,
            items: this.props.categories,
            searchTerm: "",
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.paginate = this.paginate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind( this );
    }

    handleCreateClick() {
        this.setState({ mode: 1 });
    }

    handleEditClick(i) {
        this.setState({ editId: i, editMode: true, mode: 1 });
    }

    handleSubmitted() {
        this.props.refresh();
        this.setState({ mode: 0, addedSuccessfully: true });
        setTimeout(() => {
            this.setState({ addedSuccessfully: false });
        }).bind(this);
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log(this.state.mode);
    }

    paginate = (number) => this.setState({ currentPage: number });

    viewClick = (i) => this.props.history.push(`/kiosk/${i}`);

    handleChange(event) {
        //[name, value] = event.target;
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCreateClick()
    {
        this.setState({ mode: 1 });
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Categories</div>;

        const filteredCategories = this.state.items.filter((m) => { return m.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });

        const categories = filteredCategories.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.numPages}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <button className="btn btn-outline-dark btn-square" onClick={(event) => { this.viewClick(item.id) }}>View</button> | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> | <button className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

        switch (this.state.mode) {
            case 0:
                child = <div>
                    <div style={{ padding: "5px", backgroundColor: "grey" }}><h2>Kiosk Categories</h2></div>
                    <div style={{ padding: "10px" }}>
                        <button className="btn btn-primary btn-square" onClick={ (event) => { this.handleCreateClick() } }>Create New</button>
                        <hr />
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                        <hr />

                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th className="active" style={{ cursor: "pointer" }}>ID</th>
                                    <th>Name</th>
                                    <th>Page Count</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredCategories.length} paginate={this.paginate} />
                    </div>
                </div>;
                break;
            case 1:
                child = <CreateCategory handleSubmitted={this.handleSubmitted} refresh={this.props.refresh}
                    editMode={this.state.editMode} editId={this.state.editId}
                />
                break;
        }

        return <div>{ child }</div>
    }
}

export default withRouter(KioskCategories);