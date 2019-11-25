import React from "react";

import CreatePowerpoint from "./Powerpoints/CreatePowerpoint";
import Loader from "../Loader";
import ViewPowerpoints from "./Powerpoints/ViewPowerpoints";
import Pagination from "../Pagination";
import ErrorPage from "./ErrorPage";

import {withRouter} from "react-router-dom";

class Powerpoints extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            items: this.props.powerpoints,
            searchTerm: "",
            currentPage: 1,
            itemsPerPage: 5,
            sortColumn: 0,
            sortDirection: false,
            powerpoint: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.createClick = this.createClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.paginate = this.paginate.bind( this );
        this.handleSortClick = this.handleSortClick.bind( this );
        this.handleClear = this.handleClear.bind( this );
        this.handleCancelCreateClick = this.handleCancelCreateClick.bind( this );
        this.handleSubmitted = this.handleSubmitted.bind( this );
        this.handleEditClick = this.handleEditClick.bind( this );
    }

    handleChange( event )
    {
        this.setState( { [event.target.name ]: event.target.value } );
    }

    paginate( number )
    {
        this.setState( { currentPage: number } );
    }

    handleEditClick( i )
    {
        this.setState( { powerpoint: this.props.powerpoints.find( m => m.id == i ), mode: 1 } );
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log(this.state.mode);
    }

    handleCreateClick()
    {
        this.setState({ mode: 1 });
    }

    createClick() {
        this.setState({ mode: 1 });
    }

    handleClear()
    {
        this.setState( { searchTerm: "", currentPage: 1, sortColumn: 0, sortDirection: false } );
    }

    handleCancelCreateClick()
    {
        this.setState( { mode: 0 } );
    }

    handleSortClick( i )
    {
        if( this.state.sortColumn == i )
        {
            this.setState( prevState => {
                return {
                    sortDirection: !prevState.sortDirection
                };
            });
        }
        else
        {
            this.setState( { sortColumn: i, sortDirection: false } );
        }
    }

    handleSubmitted() {
        console.log( "refreshing" );
        this.props.refresh();
        this.setState( { mode: 0, currentPage: Math.ceil( ( this.props.powerpoints.length + 1 ) / this.state.itemsPerPage ) } );
    }

    render() {
        if( this.props.error )
        {
            return <ErrorPage errorObj={ this.props.errorObj } reload={ this.props.refresh } />
        }

        if (this.props.loading) {
            return <Loader />
        }

        let child = <div>Powerpoints</div>;

        let filteredPresentations = this.props.powerpoints.filter( (m) => { return m.title.toLowerCase().includes( this.state.searchTerm.toLowerCase() ) } );
        if( this.state.sortColumn == 0 )
        {
            if( !this.state.sortDirection )
            {
                filteredPresentations = filteredPresentations.sort( (x, y) => { return x.id - y.id } );
            }
            else
            {
                filteredPresentations = filteredPresentations.sort( (x, y) => { return y.id - x.id } );
            }
        }
        else if( this.state.sortColumn == 1 )
        {
            if( !this.state.sortDirection )
            {
                filteredPresentations = filteredPresentations.sort( (x, y ) => { return x.title.localeCompare( y.title ) });
            }
            else
            {
                filteredPresentations = filteredPresentations.sort( (x, y ) => { return y.title.localeCompare( x.title ) });
            }
        }
        else if( this.state.sortColumn == 2 )
        {
            if( !this.state.sortDirection )
            {
                filteredPresentations = filteredPresentations.sort( (x, y ) => { return x.ppt_images.length - y.ppt_images.length });
            }
            else
            {
                filteredPresentations = filteredPresentations.sort( (x, y ) => { return y.ppt_images.length - x.ppt_images.length });
            }
        }
        else if( this.state.sortColumn == 3 )
        {
            if( this.state.sortDirection )
            {
                filteredPresentations = filteredPresentations.sort( (x, y ) => {
                    const d1 = new Date( x.created_at );
                    const d2 = new Date( y.created_at );
                    console.log( d1 );
                    return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
                });
            }
            else
            {
                filteredPresentations = filteredPresentations.sort( (x, y ) => {
                    const d1 = new Date( x.created_at );
                    const d2 = new Date( y.created_at );
                    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
                });
            }
        }

        //const filteredPresentations = this.state.items.filter((m) => { return m.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });

        const presentations = filteredPresentations.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.ppt_images.length}</td>
                    <td>{item.created_at}</td>
                    <td>
                    {/* | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> */}
                        <button className="btn btn-outline-dark btn-square" onClick={(event) => { this.props.history.push( `/powerpoints/${item.id}` ) }}>View</button> | <button className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = presentations.slice(indexOfFirstItem, indexOfLastItem);

        switch (this.state.mode) {
            case 0:
                child = <div className="admin-boxshadow">
                    <div className="admin-top-box"><h2>Presentations</h2></div>
                    <div style={{ padding: "10px" }}>
                        <button className="btn btn-primary btn-square" onClick={(event) => { this.handleCreateClick() }}>Create New</button>
                        <hr />
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                        { this.state.searchTerm != "" ? <p>{ `Showing results ${indexOfFirstItem + 1}-${currentItems.length < indexOfLastItem ? currentItems.length : indexOfLastItem} out of ${presentations.length}` } <p onClick={ (event) => { this.handleClear() } } style={{ display: "inline-block", textDecoration: "underline", cursor: "pointer", color: "blue"}}>clear</p></p> : null }
                        <hr />

                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th onClick={ (event) => { this.handleSortClick( 0 ) } } className={ this.state.sortColumn == 0 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null } style={{ cursor: "pointer" }}>ID</th>
                                    <th onClick={ (event) => { this.handleSortClick( 1 ) } } className={ this.state.sortColumn == 1 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null } style={{ cursor: "pointer" }}>Name</th>
                                    <th onClick={ (event) => { this.handleSortClick( 2 ) } } className={ this.state.sortColumn == 2 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null } style={{ cursor: "pointer" }}>Slides</th>
                                    <th onClick={ (event) => { this.handleSortClick( 3 ) } } className={ this.state.sortColumn == 3 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null } style={{ cursor: "pointer" }}>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredPresentations.length} paginate={this.paginate} activePage={ this.state.currentPage} />
                    </div>
                </div>;
                break;
            case 1:
                child = <CreatePowerpoint powerpoint={ this.state.powerpoint } handleSubmitted={ this.handleSubmitted } handleCancelCreateClick={ this.handleCancelCreateClick } />
                break;
        }

        return <div>
            
            {child}
        </div>
    }
}

export default withRouter( Powerpoints );