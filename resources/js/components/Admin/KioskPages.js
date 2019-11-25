import React from "react";
import { withRouter } from "react-router-dom";

import Create from "../../pages/Admin/Create";
import Loader from "../Loader";
import ViewPages from "./KioskPages/ViewPages";
import Pagination from "../Pagination";
import { runInThisContext } from "vm";
import DeletePage from "./KioskPages/DeletePage";
import Axios from "axios";
import ErrorPage from "./ErrorPage";

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
            sortColumn: 0,
            sortDirection: false,
            deleteItem: null,
            deleteLoading: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.paginate = this.paginate.bind(this);
        this.viewClick = this.viewClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
        this.handleCancelCreateClick = this.handleCancelCreateClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
        this.handleCancelDeleteClick = this.handleCancelDeleteClick.bind( this );
        this.handleActualDeleteClick = this.handleActualDeleteClick.bind( this );
        this.handleSubmitted = this.handleSubmitted.bind( this );
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log(this.state.mode);
    }

    handleCreateClick() {
        this.setState({ mode: 1 });
    }

    handleEditClick(i) {
        console.log(i);
        console.log(this.props.pages.find(m => m.id == i));
        this.setState({ pageId: i, mode: 1 });
        //this.props.history.push( `admin/pages/${i}/edit` );
    }

    handleCancelCreateClick(event) {
        event.preventDefault();
        this.setState({ mode: 0 });
    }

    handleSortClick(i) {
        if (this.state.sortColumn == i) {
            this.setState(prevState => {
                return {
                    sortDirection: !prevState.sortDirection
                };
            });
        }
        else {
            this.setState({ sortColumn: i, sortDirection: false });
        }
    }

    paginate = (number) => this.setState({ currentPage: number });

    viewClick = (i) => history.push(`/kiosk/${i}`);

    handleSubmitted( editMode ) {
        console.log( editMode );
        this.props.refresh();
        if( editMode )
        {
            this.setState( { mode: 0, currentPage: 1 } );
        }
        else
        {
            this.setState( { mode: 0, currentPage: Math.ceil( ( this.props.pages.length + 1 ) / this.state.itemsPerPage ) } );
        }
    }

    handleChange(event) {
        //[name, value] = event.target;
        if (event.target.name == "searchTerm") {
            this.setState({ currentPage: 1, sortColumn: 0, sortDirection: false });
        }

        this.setState({ [event.target.name]: event.target.value });
    }

    handleClear() {
        this.setState({ searchTerm: "", currentPage: 1, sortColumn: 0, sortDirection: false });
    }

    handleDeleteClick( i )
    {
        const di = this.state.items.find( m => m.id == i );
        this.setState( { deleteItem: di, mode: 2 } );
    }

    handleCancelDeleteClick( event )
    {
        this.setState( { mode: 0, deleteItem: null } );
    }

    handleActualDeleteClick( event )
    {
        this.setState( { deleteLoading: true } );
        Axios.delete( `/api/pages/${this.state.deleteItem.id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem( "id_token" )
            }
        } )
        .then( response => {
            console.log( response );
            this.setState( { deleteLoading: false, deleteItem: null, mode: 0 } );
            this.props.refresh();
        } )
        .catch( err => console.log( err ) );
        this.props.refresh();
    }

    render() {
        if( this.props.error )
        {
            return <ErrorPage errorObj={ this.props.errorObj } reload={ this.props.refresh } />
        }

        if (this.props.loading)
        {
            return <Loader />
        }

        let child = <div>Pages</div>;

        let filteredPages = this.props.pages.filter((m) => { return m.heading.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });
        if (this.state.sortColumn == 0) {
            if (!this.state.sortDirection) {
                filteredPages = filteredPages.sort((x, y) => { return x.id - y.id });
            }
            else {
                filteredPages = filteredPages.sort((x, y) => { return y.id - x.id });
            }
        }
        else if (this.state.sortColumn == 1) {
            if (!this.state.sortDirection) {
                filteredPages = filteredPages.sort((x, y) => { return x.heading.localeCompare(y.heading) });
            }
            else {
                filteredPages = filteredPages.sort((x, y) => { return y.heading.localeCompare(x.heading) });
            }
        }
        else if (this.state.sortColumn == 2) {
            if (!this.state.sortDirection) {
                filteredPages = filteredPages.sort((x, y) => { return x.times_viewed - y.times_viewed });
            }
            else {
                filteredPages = filteredPages.sort((x, y) => { return y.times_viewed - x.times_viewed });
            }
        }
        else if (this.state.sortColumn == 3) {
            if (this.state.sortDirection) {
                filteredPages = filteredPages.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    console.log(d1);
                    return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
                });
            }
            else {
                filteredPages = filteredPages.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
                });
            }
        }

        const pages = filteredPages.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.heading}</td>
                    <td>{item.times_viewed}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <a href={`#/kiosk/${item.id}`}><button className="btn btn-outline-dark btn-square" onClick={(event) => { console.log(item.id) }}>View</button></a> | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> | <button onClick={ (event) => { this.handleDeleteClick( item.id ) } } className="btn btn-danger btn-square">Delete</button>
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
                child = <div className="admin-boxshadow">
                    <div className="admin-top-box"><h2>Kiosk Pages</h2></div>
                    <div style={{ padding: "10px" }}>
                        <button className="btn btn-primary btn-square" onClick={(event) => { this.handleCreateClick() }}>Create New</button>
                        <hr />
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                        {this.state.searchTerm != "" ? <p>{`Showing results ${indexOfFirstItem + 1}-${currentItems.length < indexOfLastItem ? currentItems.length : indexOfLastItem} out of ${pages.length}`} <p onClick={(event) => { this.handleClear() }} style={{ display: "inline-block", textDecoration: "underline", cursor: "pointer", color: "blue" }}>clear</p></p> : null}
                        <hr />

                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th onClick={(event) => { this.handleSortClick(0) }} className={this.state.sortColumn == 0 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>ID</th>
                                    <th onClick={(event) => { this.handleSortClick(1) }} className={this.state.sortColumn == 1 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Name</th>
                                    <th onClick={(event) => { this.handleSortClick(2) }} className={this.state.sortColumn == 2 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>View Count</th>
                                    <th onClick={(event) => { this.handleSortClick(3) }} className={this.state.sortColumn == 3 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredPages.length} paginate={this.paginate} activePage={ this.state.currentPage } />

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
                child = <Create page={page} handleSubmitted={ this.handleSubmitted } handleCancelCreateClick={this.handleCancelCreateClick} />
                break;
            case 2:
                child = <DeletePage handleCancelDeleteClick={ this.handleCancelDeleteClick } handleActualDeleteClick={ this.handleActualDeleteClick }
                    item={ this.state.deleteItem } deleteLoading={ this.state.deleteLoading }
                />
        }

        // if( this.state.mode == 1 )
        // {
        //     const page = (this.state.pageId) != -1 ? this.props.pages.find(m => (m.id == this.state.pageId)) : null;
        //     console.log(page);
        //     return <Create page={ page } />
        // }



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