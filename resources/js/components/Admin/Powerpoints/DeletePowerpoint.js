import React from "react";

export default class DeletePowerpoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return <div className="admin-boxshadow">
            <div className="admin-top-box">
                <h2>Delete Presentation</h2>
            </div>
            <br />
            <div style={{ padding: "30px" }}>
                <h4>Are you sure you wish to delete this presentation?</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Slides</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.item.id}</td>
                            <td>{this.props.item.title}</td>
                            <td>{this.props.item.ppt_images.length}</td>
                            <td>{this.props.item.created_at}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={this.props.handleCancelDeleteClick} className="btn btn-outline-danger btn-square">Cancel</button>
                    <button onClick={this.props.handleActualDeleteClick} className="btn btn-danger btn-square" style={{ float: "right" }}>Delete</button>
                </div>
            </div>
        </div>
    }
};