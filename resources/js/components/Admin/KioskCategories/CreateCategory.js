import React from "react";

import Axios from "axios";

export default class CreateCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: (this.props.category != null),
            name: this.props.category != null ? this.props.category.name : "",
            description: this.props.category != null ? this.props.category.description : "",
            redirect: false,
            loading: false,
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showError = this.showError.bind(this);
    }

    handleChange(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        // this.showError();
        // return;

        const editMode = this.props.category != null;

        if (this.state.name.length < 3 || this.state.description.length < 3) {
            this.setState({ error: true });
            return;
        }

        let formData = new FormData();

        if (editMode) {
            formData.append("_method", "PUT");
            console.log("put");
        }

        formData.append("name", this.state.name);
        formData.append("description", this.state.description);

        Axios({
            url: "./api/categories" + (editMode ? "/" + this.props.category.id : ""),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                //this.setState({ redirect: false });
                this.props.handleSubmitted();
            })
            .catch(err => { console.log(err.response); this.showError() });
    }

    showError() {
        this.setState({ error: true });
        setTimeout(() => {
            this.setState({ error: false });
        });
    }

    // componentWillMount() {
    //     if (this.state.editMode) {
    //         this.setState({ loading: true });
    //         fetch("./api/categories/" + this.props.editId)
    //             .then(response => response.json())
    //             .then(data => this.setState({ name: data.name, description: data.description, loading: false }))
    //             .catch(error => console.log(error));
    //     }
    // }

    render() {
        return <div className="admin-boxshadow">
            <div className="admin-top-box">
                <h2>Create New Category</h2>
            </div>
            <br />
            <div style={{ padding: "20px" }}>
                <div className="form-group">
                    <label><h3>Name</h3></label>
                    <p style={{ color: "red", display: this.state.name.length >= 3 ? "none" : "block" }}>Name is required</p>
                    <input className="form-control" type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Enter a category name..." />
                </div>
                <div className="form-group">
                    <label><h3>Description</h3></label>
                    <p style={{ color: "red", display: this.state.description.length >= 3 ? "none" : "block" }}>Description is required</p>
                    <textarea rows="3" className="form-control" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Enter a category description..." />
                </div>
                {
                    this.state.error ?
                        <div>
                            Make sure to check all validation rules and try again.
                            </div>
                        :
                        null
                }
                <hr />
                <div>
                    <button onClick={this.props.handleCancelCreateClick} className="btn btn-outline-danger btn-square">Cancel</button>
                    <button onClick={(event) => { this.handleSubmit(event) }} style={{ float: "right" }} className="btn btn-primary btn-square">Submit</button>
                </div>
            </div>
        </div>

    }
}