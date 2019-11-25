import React from "react";

export default class DeleteCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const options = this.props.categories.map( item => {
            if( item.id == this.props.item.id )
            {
                return null;
            }
            return( <option key={item.id} value={item.id}>{item.name}</option>)
        });

        return <div className="admin-boxshadow">
            <div className="admin-top-box">
                <h2>Delete Category</h2>
            </div>
            <br />
            <div style={{ padding: "30px" }}>
                {
                    this.props.item.numPages > 0 ?
                        <div>
                            <h4 style={{ color: "red" }}><strong>This category still has {this.props.item.numPages} assigned pages.</strong></h4>
                            <p>Either reassign them separately, choose a new category to assign them to here, or they will all be deleted.</p>
                            <div className="form-group">
                                <label><h3>New Category</h3></label>
                                <select className="form-control" name="reassignCategory" onChange={this.props.handleChange} value={this.props.reassign}>
                                    <option value="-1">--None (delete all)--</option>
                                    {options}
                                </select>
                            </div>
                            <hr />
                        </div>
                        :
                        null
                }
                <h4>Are you sure you wish to delete this category?</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Pages</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.item.id}</td>
                            <td>{this.props.item.name}</td>
                            <td>{this.props.item.numPages}</td>
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
};