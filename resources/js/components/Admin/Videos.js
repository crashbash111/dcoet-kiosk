import React from "react";
import {withRouter} from "react-router-dom";

import CreateVideo from "./Videos/CreateVideo";
import VideoIndex from "./Videos/VideoIndex";
import Pagination from "../Pagination";
import ErrorPage from "./ErrorPage";
import Loader from "../Loader";
import DeleteVideo from "./Videos/DeleteVideo";
import Axios from "axios";

class Videos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            mode: 0,
            items: this.props.videos,
            searchTerm: "",
            currentPage: 1,
            itemsPerPage: 5,
            searchTerm: "",
            sortColumn: 0,
            sortDirection: false,
            deleteItem: null,
            deleteLoading: false,
            video: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.paginate = this.paginate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
        this.handleCancelCreateClick = this.handleCancelCreateClick.bind(this);
        this.handleSubmitted = this.handleSubmitted.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
        this.handleCancelDeleteClick = this.handleCancelDeleteClick.bind( this );
        this.handleActualDeleteClick = this.handleActualDeleteClick.bind( this );
        this.handleEditClick = this.handleEditClick.bind( this );

        this.viewClick = this.viewClick.bind( this );
        this.handleEditDone = this.handleEditDone.bind( this );
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log(this.state.mode);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
        if (name == "searchTerm") {
            this.setState({
                sortColumn: 0,
                sortDirection: false,
            });
        }
    }

    paginate(number) {
        this.setState({ currentPage: number });
    }

    handleCreateClick() {
        this.setState({ mode: 1 });
    }

    handleEditClick( i ) {
        const vid = this.props.videos.find( m => m.id == i );
        this.setState( { video: { ...vid, copyright: vid.copyright == "null" ? "" : vid.copyright }, mode: 1 } );
    }

    handleCancelCreateClick(event) {
        event.preventDefault();
        this.setState({ mode: 0 });
    }

    handleClear() {
        this.setState({ searchTerm: "", currentPage: 1, sortColumn: 0, sortDirection: false });
    }

    handleSubmitted() {
        console.log("refreshing");
        this.props.refresh();
        this.setState({ mode: 0, currentPage: Math.ceil((this.props.videos.length + 1) / this.state.itemsPerPage) });
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

    handleDeleteClick(i) {
        const di = this.state.items.find(m => m.id == i);
        this.setState({ mode: 2, deleteItem: di });
    }

    handleCancelDeleteClick(event) {
        console.log("ree");
        event.preventDefault();
        this.setState({ mode: 0, deleteItem: null });
    }

    handleActualDeleteClick(event) {
        //const url = qs.stringify
        this.setState({ deleteLoading: true });
        Axios.delete(`/api/videos/${this.state.deleteItem.id}`,
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("id_token")
                }
            }
        )
            .then(response => {
                console.log(response)
                this.setState({ deleteLoading: false, deleteItem: null, mode: 0 });
                this.props.refresh();
            })
            .catch(err => console.log(err));
    }

    viewClick( i )
    {
        this.props.history.push( `/videos/${i}` );
    }

    handleEditDone()
    {
        this.setState( { video: null, mode: 0 } );
    }

    render() {
        if (this.props.error) {
            return <ErrorPage errorObj={this.props.errorObj} reload={this.props.refresh} />
        }

        if (this.props.loading) {
            return <Loader />
        }

        let child = <div>Videos</div>;

        let filteredVideos = this.props.videos.filter((m) => { return m.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });
        if (this.state.sortColumn == 0) {
            if (!this.state.sortDirection) {
                filteredVideos = filteredVideos.sort((x, y) => { return x.id - y.id });
            }
            else {
                filteredVideos = filteredVideos.sort((x, y) => { return y.id - x.id });
            }
        }
        else if (this.state.sortColumn == 1) {
            if (!this.state.sortDirection) {
                filteredVideos = filteredVideos.sort((x, y) => { return x.title.localeCompare(y.title) });
            }
            else {
                filteredVideos = filteredVideos.sort((x, y) => { return y.title.localeCompare(x.title) });
            }
        }
        else if (this.state.sortColumn == 2) {
            if (!this.state.sortDirection) {
                filteredVideos = filteredVideos.sort((x, y) => { return x.length - y.length });
            }
            else {
                filteredVideos = filteredVideos.sort((x, y) => { return y.length - x.length });
            }
        }
        else if (this.state.sortColumn == 3) {
            if (this.state.sortDirection) {
                filteredVideos = filteredVideos.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    console.log(d1);
                    return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
                });
            }
            else {
                filteredVideos = filteredVideos.sort((x, y) => {
                    const d1 = new Date(x.created_at);
                    const d2 = new Date(y.created_at);
                    return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
                });
            }
        }

        //const filteredVideos = this.state.items.filter((m) => { return m.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });

        const videos = filteredVideos.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.length}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <button className="btn btn-outline-dark btn-square" onClick={(event) => { this.viewClick(item.id) }}>View</button> | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> | <button onClick={ (event) => { this.handleDeleteClick( item.id ) } } className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = videos.slice(indexOfFirstItem, indexOfLastItem);

        switch (this.state.mode) {
            case 0:
                child = <div className="admin-boxshadow">
                    <div className="admin-top-box"><h2>Videos</h2></div>
                    <div style={{ padding: "10px" }}>
                        <button className="btn btn-primary btn-square" onClick={(event) => { this.handleCreateClick() }}>Create New</button>
                        <hr />
                        <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                        {this.state.searchTerm != "" ? <p>{`Showing results ${indexOfFirstItem + 1}-${currentItems.length < indexOfLastItem ? currentItems.length : indexOfLastItem} out of ${videos.length}`} <p onClick={(event) => { this.handleClear() }} style={{ display: "inline-block", textDecoration: "underline", cursor: "pointer", color: "blue" }}>clear</p></p> : null}
                        <hr />

                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th onClick={(event) => { this.handleSortClick(0) }} className={this.state.sortColumn == 0 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>ID</th>
                                    <th onClick={(event) => { this.handleSortClick(1) }} className={this.state.sortColumn == 1 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Name</th>
                                    <th onClick={(event) => { this.handleSortClick(2) }} className={this.state.sortColumn == 2 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Length</th>
                                    <th onClick={(event) => { this.handleSortClick(3) }} className={this.state.sortColumn == 3 ? this.state.sortDirection ? "headerSortDown" : "headerSortUp" : null} style={{ cursor: "pointer" }}>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredVideos.length} paginate={this.paginate} activePage={this.state.currentPage} />
                    </div>
                </div>;
                //child = <VideoIndex videos={ this.props.videos } loading={ this.props.loading } />
                break;
            case 1:
                child = <CreateVideo video={this.state.video} handleEditDone={ this.handleEditDone } handleSubmitted={this.handleSubmitted} handleCancelCreateClick={this.handleCancelCreateClick} />
                break;
            case 2:
                child = <DeleteVideo handleCancelDeleteClick={ this.handleCancelDeleteClick } handleActualDeleteClick={ this.handleActualDeleteClick }
                item={ this.state.deleteItem } deleteLoading={ this.state.deleteLoading } />
                break;
        }

        return <div>{child}</div>;

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square"} onClick={(event) => this.handleClick(1)}>Create New</button>
            </div>

        </div>
    }
}

export default withRouter( Videos );