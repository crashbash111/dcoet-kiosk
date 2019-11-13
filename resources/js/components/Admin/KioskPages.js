import React from "react";
import { withRouter } from "react-router-dom";

import Create from "../../pages/Admin/Create";
import Loader from "../Loader";
import ViewPages from "./KioskPages/ViewPages";
import Pagination from "../Pagination";

class KioskPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            pageId: -1,
            currentPage: 1,
            itemsPerPage: 5,
            searchTerm: "",
            items: this.props.pages,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.paginate = this.paginate.bind(this);
        this.viewClick = this.viewClick.bind(this);
        this.handleChange = this.handleChange.bind( this );
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

    paginate = (number) => this.setState({ currentPage: number });

    viewClick = (i) => history.push(`/kiosk/${i}`);

    handleChange(event) {
        //[name, value] = event.target;
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Pages</div>;

        const filteredPages = this.state.items.filter( (m) => { return m.heading.toLowerCase().includes( this.state.searchTerm.toLowerCase() ) } );

        const pages = filteredPages.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.heading}</td>
                    <td>{item.times_viewed}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <button className="btn btn-outline-dark btn-square" onClick={(event) => { console.log(item.id) }}>View</button> | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> | <button className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = pages.slice(indexOfFirstItem, indexOfLastItem);

        console.log(this.props.pages);

        switch (this.state.mode) {
            case 0:
                child = <div>
                    <div style={{ padding: "5px", backgroundColor: "grey" }}><h2>Kiosk Pages</h2></div>
                    <div style={{ padding: "10px" }}>
                        <button className="btn btn-primary btn-square" onClick={(event) => { this.handleCreateClick() }}>Create New</button>
                        <hr />
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
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
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredPages.length} paginate={this.paginate} />

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

export default withRouter(KioskPages);