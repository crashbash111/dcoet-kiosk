import React from "react";
import {Link} from "react-router-dom";

import Logo from "../components/Home/Logo";
import MainContent from "../components/Home/MainContent";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

export default class Home extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            categories: [],
        }

        this.handleCategoryChange = this.handleCategoryChange.bind( this );
    }

    componentDidMount()
    {
        fetch( "./pages/allCategories" )
        .then( response => response.json() )
        .then( data => this.setState( { categories: data } ) );
    }

    handleCategoryChange( i )
    {
        console.log( "clicked category " + i );
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

        //

        return(
            <div>
                <div className="grid-container">
                <div className="grid-item item1">
                    <Logo />
                    <img src="/images/logo.png"></img>
                </div>
                <div className="grid-item item2">
                    <SearchBar />
                </div>
                <div className="grid-item item3">
                    <SideBar categories={ this.state.categories } handleChange={ this.handleCategoryChange } />
                </div>
                <div className="grid-item item4">
                    <MainContent />
                </div>
            </div>
                <div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        );
    }
}