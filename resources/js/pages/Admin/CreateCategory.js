import React from "react";

export default class CreateCategory extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            name: "",
            description: "",
        };

        this.handleChange = this.handleChange.bind( this );
    }

    handleChange( event )
    {
        let { name, value } = event.target;

        this.setState( { [name]: value } );
    }

    handleSubmit( event )
    {
        event.preventDefault();
        let formData = new FormData();

        formData.append( "name", this.state.name );
        formData.append( "description", this.state.description );

        
    }

    render()
    {
        return(
            <div style={{ width: "100%" }}>
                <div className="container">
                    <h1>Create Category Page</h1>
                    <br />
                    <form onSubmit={ this.handleSubmit }>
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
                    </form>
                </div>
            </div>
        );
    }
}