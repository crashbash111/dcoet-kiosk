import React from "react";

import CreateVideo from "./Videos/CreateVideo";
import VideoIndex from "./Videos/VideoIndex";
import Pagination from "../Pagination";

export default class Videos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            mode: 0,
            items: this.props.videos,
            searchTerm: "",
            currentPage: 1,
            itemsPerPage: 5,
        };

        this.handleClick = this.handleClick.bind( this );
        this.paginate = this.paginate.bind( this );
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log( this.state.mode );
    }

    paginate( number )
    {
        this.setState( { currentPage: number } );
    }

    handleCreateClick()
    {
        this.setState( { mode: 1 } );
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Videos</div>;

        const filteredVideos = this.state.items.filter((m) => { return m.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });

        const videos = filteredVideos.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.length}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <button className="btn btn-outline-dark btn-square" onClick={(event) => { this.viewClick(item.id) }}>View</button> | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> | <button className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = videos.slice(indexOfFirstItem, indexOfLastItem);

        switch (this.state.mode) {
            case 0:
                child = <div>
                <div style={{ padding: "5px", backgroundColor: "grey" }}><h2>Videos</h2></div>
                <div style={{ padding: "10px" }}>
                    <button className="btn btn-primary btn-square" onClick={ (event) => { this.handleCreateClick() } }>Create New</button>
                    <hr />
                    <input type="text" placeholder="Search term..." name="searchTerm" value={this.state.searchTerm} onChange={this.handleChange} />
                    <hr />

                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="active" style={{ cursor: "pointer" }}>ID</th>
                                <th>Name</th>
                                <th>Length</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems}
                        </tbody>
                    </table>
                    <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredVideos.length} paginate={this.paginate} />
                </div>
            </div>;
                //child = <VideoIndex videos={ this.props.videos } loading={ this.props.loading } />
                break;
            case 1:
                child = <CreateVideo />
                break;
            }

            return <div>{child}</div>;

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => this.handleClick(1)}>Create New</button>
            </div>
            
        </div>
    }
}