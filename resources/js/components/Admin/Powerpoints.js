import React from "react";

import CreatePowerpoint from "./Powerpoints/CreatePowerpoint";
import Loader from "../Loader";
import ViewPowerpoints from "./Powerpoints/ViewPowerpoints";
import Pagination from "../Pagination";

export default class KioskPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
            items: this.props.powerpoints,
            searchTerm: "",
            currentPage: 1,
            itemsPerPage: 5,
        };

        this.handleClick = this.handleClick.bind(this);
        this.createClick = this.createClick.bind(this);
        this.handleCreateClick = this.handleCreateClick.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.paginate = this.paginate.bind( this );
    }

    handleChange( event )
    {
        this.setState( { [event.target.name ]: event.target.value } );
    }

    paginate( number )
    {
        this.setState( { currentPage: number } );
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

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Powerpoints</div>;

        const filteredPresentations = this.state.items.filter((m) => { return m.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) });

        const presentations = filteredPresentations.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.ppt_images.length}</td>
                    <td>{item.created_at}</td>
                    <td>
                        <button className="btn btn-outline-dark btn-square" onClick={(event) => { console.log(item.id) }}>View</button> | <button className="btn btn-success btn-square" onClick={(event) => { this.handleEditClick(item.id) }}>Edit</button> | <button className="btn btn-danger btn-square">Delete</button>
                    </td>
                </tr>
            );
        });

        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = presentations.slice(indexOfFirstItem, indexOfLastItem);

        switch (this.state.mode) {
            case 0:
                child = <div>
                    <div style={{ padding: "5px", backgroundColor: "grey" }}><h2>Presentations</h2></div>
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
                                    <th>Slides</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems}
                            </tbody>
                        </table>
                        <Pagination itemsPerPage={this.state.itemsPerPage} totalItems={filteredPresentations.length} paginate={this.paginate} />
                    </div>
                </div>;
                break;
            case 1:
                child = <CreatePowerpoint />
                break;
        }

        return <div>
            
            {child}
        </div>
    }
}