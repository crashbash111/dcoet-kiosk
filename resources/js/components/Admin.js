import React from "react";
import ReactDOM from "react-dom";

export default class Admin extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            heading: "",
            text: "",
            category: "",
        }

        this.handleChange = this.handleChange.bind( this );
    }

    handleChange( event )
    {
        const { name, value } = event.target;
        this.setState( {
            [name]: value
        });
    }

    render()
    {
        return (
            <div className="container">
                <h1>Make New Page</h1>
                <br />
                <form>
                    <div className="form-group">
                        <h2>Heading</h2>
                        <input className="form-control" type="text" placeholder="Heading" onChange={ this.handleChange } name="heading" value={ this.state.heading } />
                        <p style={{ color: "red", display: this.state.heading.length > 2 ? "none" : "block" }}>Heading requires at least 3 characters</p>
                    </div>
                    <br />
                    <div className="form-group">
                        <h2>Body text</h2>
                        <textarea className="form-control" placeholder="Body text here" name="text" value={ this.state.text } onChange={ this.handleChange } />
                        <p style={{ color: "red", display: this.state.text.length > 9 ? "none" : "block" }}>Text body requires at least 10 characters</p>
                    </div>
                    <div className="form-group" style={{ border: "1px solid #ffffff", borderRadius: "4px", padding: "8px" }}>
                        <h2>Categories</h2>
                        <label>Bird</label>
                        <input type="radio" value={ this.state.category == "bird" } name="category" onChange={ this.handleChange } />
                        <br />
                        <label>Pest</label>
                        <input type="radio" value={ this.state.category == "pest" } name="category" onChange={ this.handleChange } />
                    </div>
                    <p style={{ color: "red", display: this.state.category.length > 0 ? "none" : "block" }}>Category is required</p>
                    <button className="btn btn-primary btn-lg">Create</button>
                </form>
            </div>
        );
    }
}

if( document.getElementById( "admin") )
{
    ReactDOM.render( <Admin />, document.getElementById( "admin" ) );
}