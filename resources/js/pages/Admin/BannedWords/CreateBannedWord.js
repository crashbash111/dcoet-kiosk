import React from "react";
import Axios from "axios";

import {Redirect} from "react-router-dom";

export default class CreateBannedWord extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            editMode: this.props.match != null && this.props.match.params != null && this.props.match.params.id != null,
            id: -1,
            word: "",
            redirect: false,
            redirectId: -1, //-1 unassigned, -2 submit+new
        };

        this.onSubmit = this.onSubmit.bind( this );
        this.onSubmitNew = this.onSubmitNew.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    componentDidMount()
    {
        if( this.state.editMode )
        {
            fetch( "./bannedwords/" + this.props.match.params.id )
            .then( response => response.json() )
            .then( data => this.setState( { id: data.id, word: data.word } ) )
            .catch( err => console.log( err ) );
        }
    }

    handleChange( event )
    {
        let { name, value } = event.target;
        this.setState( { [name]: value } );
    }

    onSubmit( event, r = true )
    {
        event.preventDefault();

        if( this.state.word.length != 3 )
        {
            return;
        }

        let formData = new FormData();
        if( this.state.editMode )
        {
            formData.append( "_method", "PUT" );
        }

        formData.append( "word", this.state.word );

        Axios({
            url: "./bannedwords" + (this.state.editMode ? "/" + this.props.match.params.id : ""),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                this.setState({ redirect: r });
            })
            .catch(err => console.log(err.response.data));
    }

    onSubmitNew( event )
    {
        this.setState( { word: "", redirectId: -2 } );
        setTimeout( () => this.setState( { redirectId: -1 } ), 1000 );
        this.onSubmit( event, false );
    }

    render()
    {
        if( this.state.redirect )
        {
            if( this.state.redirectId == -2 )
            {
                //window.location.reload();
                // return(
                //     <Redirect to="./createBannedWord" />
                // );
            }
            else
            {
                return (
                    <Redirect to="./bannedwords" />
                );   
            }
        }

        return (
            <div>
                <form onSubmit={ null }>
                    <div className="form-group">
                        <label><h3>Word</h3>
                            <input className="form-control" type="text" name="word" value={ this.state.word } onChange={ this.handleChange } placeholder="Word here..." />
                            <p style={{ color: "red", display: this.state.word.length != 3 ? "block" : "none" }}>Word must be exactly 3 characters</p>
                        </label>
                    </div>
                    <button onClick={ this.onSubmit } className="btn btn-primary">Submit</button>
                    <button onClick={ this.onSubmitNew } className="btn btn-outline-primary">Submit + Add</button>
                    {
                        this.state.redirectId == -2 ?
                            <div>Item added successfully</div>
                            :
                            null
                        }
                </form>
            </div>
        );
    }
}