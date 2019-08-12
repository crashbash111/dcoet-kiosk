import React from "react";
import {Link} from "react-router-dom";

import ItemRow from "../components/Admin/ItemRow";
import Axios from "axios";

export default class Admin extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            birds: [],
        }

        this.handleDelete = this.handleDelete.bind( this );
    }

    componentDidMount()
    {
        fetch( "./pages/all" )
            .then( response => response.json() )
            .then( data => this.setState( { birds: data } ) );
    }

    handleDelete( id )
    {
        let result = confirm( "Are you sure you want to delete this item?" );
        if( result )
        {
            let notId = t => t.id !== id;
            let updatedList = this.state.birds.filter( notId );
            this.setState( { birds: updatedList } );
            Axios.delete( "/pages/" + id );
        }
    }

    render()
    {
        const items = this.state.birds.map(
            i => <ItemRow key={ i.id } id={ i.id } heading={ i.heading } text={ i.text } images={ i.imgs } categoryName={ i.categoryName } handleDelete={ this.handleDelete } />
            );

        return(
            <div>
                <h2>Admin</h2>
                <br />
                <h2>Pages</h2>
                <br />
                <Link to="/admin/create"><button className="btn btn-primary">Create New</button></Link>
                <br />
                <table style={{ width: "1300px" }} className="admin-table">
                    <thead>
                        <tr>
                            <th>Heading</th>
                            <th>Text body</th>
                            <th>Category</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}