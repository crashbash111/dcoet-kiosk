import React from "react";

import {Redirect} from "react-router-dom";
import {PostData} from "../services/PostData";

import AuthService from "../components/AuthService";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirectToReferrer: false,
        }

        this.login = this.login.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.handleFormSubmit = this.handleFormSubmit.bind( this );

        this.Auth = new AuthService();
    }

    login()
    {
        if( this.state.username && this.state.password )
        {
            PostData( 'login', this.state ).then( (result) => {
                let responseJson = result;
                if( responseJson.userData ) {
                    sessionStorage.setItem( 'userData', JSON.stringify( responseJson ) );
                    this.setState( { redirectToReferrer: true } );
                }
            });
        }
    }

    handleChange( event )
    {
        let { name, value } = event.target;
        this.setState( { [name]: value } );
    }

    handleFormSubmit( event )
    {
        event.preventDefault();

        this.Auth.login( this.state.username, this.state.password )
        .then( res => {
            this.props.history.replace( '/' );
        })
        .catch( error => {
            alert( error );
        });
    }

    componentWillMount()
    {
        if( this.Auth.loggedIn() )
        {
            this.props.history.replace( '/' );
        }
    }

    render() {
        if( this.state.redirectToReferrer || sessionStorage.getItem( 'userData' ) )
        {
            <Redirect to="/admin" />
        }

        return (
            <form onSubmit={ this.handleFormSubmit }>
                <label>Username
                    <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange } />
                </label>
                <br />
                <label>password
                    <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } />
                </label>
                <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}