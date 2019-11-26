import React from "react";
import { returnStatement } from "@babel/types";

export default class DeletePage extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {

        };
    }

    render()
    {
        return <div className="admin-boxshadow">
        <div className="admin-top-box">
            <h2>Delete Page</h2>
        </div>
        <br />
        <div style={{ padding: "30px" }}>
            <h4>Are you sure you wish to delete this page?</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Heading</th>
                        <th>View Count</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.item.id}</td>
                        <td>{this.props.item.Heading}</td>
                        <td>{this.props.item.times_viewed}</td>
                        <td>{this.props.item.created_at}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={ this.props.handleCancelDeleteClick } className="btn btn-outline-danger btn-square">Cancel</button>
                <button onClick={ this.props.handleActualDeleteClick } className="btn btn-danger btn-square" style={{ float: "right" }}>Delete</button>
            </div>
        </div>
    </div>
    }
}