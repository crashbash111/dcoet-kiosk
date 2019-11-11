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
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            {
                this.state.editMode ?
                    <div style={{ display: "inline-block" }}>
                        <button className={"btn btn-success btn-square"}>Edit</button>
                    </div>
                    :
                    <div style={{ display: "inline-block" }}>
                        <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(1)}>Create New</button>
                    </div>
            }
            {/* <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(1)}>Create New</button>
            </div> */}
            {/* <Message shown={this.state.addedSuccessfully} message={"Added successfully."} /> */}
            {child}
        </div>
    }
}