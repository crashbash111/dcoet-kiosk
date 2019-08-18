import React from "react";
import {Link} from "react-router-dom";

import {Logo} from "../components/Home/Logo";
import {MainContent} from "../components/Home/MainContent";
import {SearchBar} from "../components/Home/SearchBar";
import {SideBar} from "../components/Home/SideBar";

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

        //

        return(
            <div>
                <div>
                    <div>
                        <Logo />
                    </div>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <SideBar />
                    </div>
                    <div>
                        <MainContent />
                    </div>
                </div>
            </div>
        );
    }
}