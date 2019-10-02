import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <form>
                <label>Username
                    <input type="text" />
                </label>
                <br />
                <label>password
                    <input type="password" />
                </label>
                <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}