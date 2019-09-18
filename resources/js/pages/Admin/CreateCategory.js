import React from "react";

import Axios from "axios";

export default class CreateCategory extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            name: "",
            description: "",
            editMode: (this.props.match != null && this.props.match.params != null && this.props.match.params.id != null),
            redirect: false,
            loading: false,
        };

        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange( event )
    {
        let { name, value } = event.target;

        this.setState( { [name]: value } );
    }

    handleSubmit( event )
    {
        console.log( this.state );
        event.preventDefault();
        let formData = new FormData();

        if (this.state.editMode) {
            formData.append("_method", "PUT");
            console.log( "put" );
        }

        formData.append( "name", this.state.name );
        formData.append( "description", this.state.description );

        Axios({
            url: "./categories" + (this.state.editMode ? "/" + this.props.match.params.id : ""),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                this.setState({ redirect: false });
            })
            .catch(err => console.log(err.response.data));
    }

    componentWillMount()
    {
        if( this.state.editMode )
        {
            this.setState( { loading: true } );
            fetch( "./categories/" + this.props.match.params.id )
                .then( response => response.json() )
                .then( data => this.setState( { name: data.name, description: data.description, loading: false } ) );
        }
    }

    render()
    {
        return(
            <div style={{ width: "100%" }}>
                <div className="container">
                    <h1>Create Category Page</h1>
                    <br />
                    <form onSubmit={ this.handleSubmit } encType="multipart/form-data">
                        <div className="form-group">
                            <label><h3>Name</h3>
                                <input className="form-control" type="text" name="name" onChange={ this.handleChange } value={ this.state.name } placeholder="Enter a category name..." />
                            </label>
                        </div>
                        <div className="form-group">
                            <label><h3>Description</h3>
                                <textarea rows="10" className="form-control" name="description" onChange={ this.handleChange } value={ this.state.description } placeholder="Enter a category description..." />
                            </label>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}