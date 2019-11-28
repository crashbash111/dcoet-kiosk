import React, {Component } from "react";
import Keyboard from "react-simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <form>
                    <input onFocus={ this.props.onFocus } style={{ borderRadius: "100px" }} type="text" name="searchTerm" placeholder="Search..." value={ this.props.searchTerm } onChange={ this.props.handleChange } />
                </form>
            </div>
        );
    }
}