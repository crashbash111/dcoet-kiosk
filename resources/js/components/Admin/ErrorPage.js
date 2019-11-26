import React from "react";

export default class ErrorPage extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {

        };
    }

    render()
    {
        console.log( this.props );

        return <div className="admin-boxshadow">
            <div className="admin-top-box-red">
                <h2>Error</h2>
            </div>
            <div style={{ padding: "30px" }}>
                <h3 style={{ color: "red" }}>An error has occurred.</h3>
                <p>If you think you know how to fix the error, then proceed. Otherwise, consult a developer.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Status Code</th>
                            <th>Status Text</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ this.props.errorObj.status }</td>
                            <td>{ this.props.errorObj.statusText }</td>
                            <td>{ this.props.errorObj.url }</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <button onClick={ (event) => { this.props.reload() } } className="btn btn-primary btn-square">Reload</button>
            </div>
        </div>
    }
}