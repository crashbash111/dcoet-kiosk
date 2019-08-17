import React from "react";
import {Link} from "react-router-dom";
import SideBar from "../components/SideBar";

export default class Home extends React.Component
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
                <div data-role="tile" data-size="medium" style={{ backgroundColor: "lightblue" }}>
                    <h3 style={{ textAlign: "center" }}>{ item.name }</h3>
                    <p>{ item.description }</p>
                </div>
            );
        });

        return(
            <div>
                <SideBar />

            </div>
        );
    }
}