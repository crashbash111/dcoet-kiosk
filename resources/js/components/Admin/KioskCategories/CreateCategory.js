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
            error: false,
        };

        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.showError = this.showError.bind( this );
    }

    handleChange( event )
    {
        let { name, value } = event.target;

        this.setState( { [name]: value } );
    }

    handleSubmit( event )
    {
        event.preventDefault();

        this.showError();
        return;

        if( this.state.name.length < 3 || this.state.description.length < 3 )
        {
            this.setState( { error: true } );
            return;
        }
        
        let formData = new FormData();

        if (this.state.editMode) {
            formData.append("_method", "PUT");
            console.log( "put" );
        }

        formData.append( "name", this.state.name );
        formData.append( "description", this.state.description );

        Axios({
            url: "./api/categories" + (this.state.editMode ? "/" + this.props.match.params.id : ""),
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
            .catch(err => { console.log(err.response.data); this.showError() });
    }

    showError()
    {
        this.setState( { error: true } );
        setTimeout( () => {
            this.setState( { error: false } );
        }).bind( this );
    }

    componentWillMount()
    {
        if( this.state.editMode )
        {
            this.setState( { loading: true } );
            fetch( "./api/categories/" + this.props.match.params.id )
                .then( response => response.json() )
                .then( data => this.setState( { name: data.name, description: data.description, loading: false } ) )
                .catch( error => console.log( error ) );
        }
    }

    render()
    {
        return(
            <div style={{ width: "100%" }}>
                <div className="container">
                    <h1>Create Category Page</h1>
                    <br />
                    {/* <Message shown={this.state.error} message={ "There was an error submitting." } color={ "red" } /> */}
                    <form onSubmit={ this.handleSubmit } encType="multipart/form-data">
                        <div className="form-group">
                            <label><h3>Name</h3>
                                <input className="form-control" type="text" name="name" onChange={ this.handleChange } value={ this.state.name } placeholder="Enter a category name..." />
                            </label>
                            <p style={{ color: "red", display: this.state.name.length > 3 ? "none" : "block" }}>Name is required</p>
                        </div>
                        <div className="form-group">
                            <label><h3>Description</h3>
                                <textarea rows="10" className="form-control" name="description" onChange={ this.handleChange } value={ this.state.description } placeholder="Enter a category description..." />
                            </label>
                            <p style={{ color: "red", display: this.state.description.length > 3 ? "none" : "block" }}>Description is required</p>
                        </div>
                        {
                            this.state.error ?
                            <div>
                                Make sure to check all validation rules and try again.
                            </div>
                            :
                            null
                        }
                        <button className="btn btn-primary btn-square">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}