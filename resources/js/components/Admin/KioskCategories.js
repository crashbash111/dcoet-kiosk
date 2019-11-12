import React from "react";

import CreateCategory from "./KioskCategories/CreateCategory";
import Loader from "../Loader";
import Message from "./Message";
import ViewCategories from "./KioskCategories/ViewCategories";

export default class KioskCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            addedSuccessfully: false,
            editMode: false,
            editId: -1,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
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

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Categories</div>;

        switch (this.state.mode) {
            case 0:
                child = <ViewCategories categories={this.props.categories}
                    createClick={this.handleCreateClick} editClick={this.handleEditClick} loading={this.props.loading}
                    refresh={this.props.refresh}
                />
                break;
            case 1:
                child = <CreateCategory handleSubmitted={this.handleSubmitted} refresh={this.props.refresh}
                    editMode={this.state.editMode} editId={this.state.editId}
                />
                break;
        }

        return <div>
            <div style={{ padding: "5px", backgroundColor: "grey" }}><h2>Kiosk Categories</h2></div>
            <div style={{ padding: "10px" }}>
                <button className="btn btn-primary btn-square">Create New</button>
                <hr />
                <input type="text" placeholder="Search term..." />
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
                        <tr>
                            <td>1</td>
                            <td>Birds</td>
                            <td>3</td>
                            <td>11th November 2019 14:55:41 PM</td>
                            <td><button className="btn btn-success btn-square">Edit</button> | <button className="btn btn-danger btn-square">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link">1</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link">2</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link">3</a>
                    </li>
                </ul>

                {/* {child} */}
            </div>
            {/* <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(1)}>Create New</button>
            </div> */}
            {/* <Message shown={this.state.addedSuccessfully} message={"Added successfully."} /> */}

        </div>
    }
}