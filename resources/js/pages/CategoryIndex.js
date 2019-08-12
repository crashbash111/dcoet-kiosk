import React from "react";
import {Link} from "react-router-dom";

export default class CategoryIndex extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            categories: [],
        }
    }

    componentDidMount()
    {
        fetch( "./pages/allCategories" )
        .then( response => response.json() )
        .then( data => this.setState( { categories: data } ) );
    }

    render()
    {
        let categoryList = this.state.categories.map( item => {
            return(
                <div>
                    <Link to={"/kiosk/" + item.id }><h3>{ item.name }</h3></Link>
                    <p>{ item.description }</p>
                </div>
            );
        });

        return(
            <div className="container">
                <h2>Category Index</h2>
                <br />
                <div>
                    { categoryList }
                </div>
            </div>
        );
    }
}