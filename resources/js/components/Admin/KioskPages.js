import React from "react";
import {withRouter} from "react-router-dom";

import Create from "../../pages/Admin/Create";
import Loader from "../Loader";
import ViewPages from "./KioskPages/ViewPages";

class KioskPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            pageId: -1
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log(this.state.mode);
    }

    handleCreateClick() {
        this.setState({ mode: 1 });
    }

    handleEditClick(i) {
        this.setState({ pageId: i, mode: 1 });
        //this.props.history.push( `admin/pages/${i}/edit` );
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Pages</div>;

        const pages = this.props.pages.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.heading}</td>
                    <td>{item.times_viewed}</td>
                    <td>{item.created_at}</td>
                    <td><button className="btn btn-success btn-square" onClick={ (event) => { this.handleEditClick( item.id ) } }>Edit</button> | <button className="btn btn-danger btn-square">Delete</button></td>
                </tr>
            );
        });

        console.log( this.props.pages );

        switch (this.state.mode) {
            case 0:
                child = <div>
                <div style={{ padding: "5px", backgroundColor: "grey" }}><h2>Kiosk Categories</h2></div>
                <div style={{ padding: "10px" }}>
                    <button className="btn btn-primary btn-square" onClick={ (event) => { this.handleCreateClick() } }>Create New</button>
                    <hr />
                    <input type="text" placeholder="Search term..." />
                    <hr />
    
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="active" style={{ cursor: "pointer" }}>ID</th>
                                <th>Name</th>
                                <th>View Count</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages}
                        </tbody>
                    </table>
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link">2</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link">3</a>
                        </li>
                    </ul>
    
                    {/* {child} */}
                </div>
                {/* <div style={{ display: "inline-block" }}>
                    <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(1)}>Create New</button>
                </div> */}
                {/* <Message shown={this.state.addedSuccessfully} message={"Added successfully."} /> */}
    
            </div>
                //<ViewPages pages={this.props.pages} handleCreateClick={this.handleCreateClick} loading={this.props.loading} handleEditClick={this.handleEditClick} />
                break;
            case 1:
                const page = (this.state.pageId) != -1 ? this.props.pages.find(m => (m.id == this.state.pageId)) : null;
                console.log(page);
                child = <Create page={(this.state.pageId) != -1 ? this.props.pages.find(m => (m.id == this.state.pageId)) : null} />
                break;
        }

        

        // <tr>
        //                     <td>1</td>
        //                     <td>Birds</td>
        //                     <td>3</td>
        //                     <td>11th November 2019 14:55:41 PM</td>
        //                     <td><button className="btn btn-success btn-square">Edit</button> | <button className="btn btn-danger btn-square">Delete</button></td>
        //                 </tr>

        //return <Create page={null} />

        return <div>{child}</div>

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(1)}>Create New</button>
            </div>
            {child}
        </div>
    }
}

export default withRouter( KioskPages );