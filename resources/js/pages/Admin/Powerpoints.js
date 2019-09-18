import React from "react";
import {Redirect} from "react-router-dom";

export default class Powerpoints extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            loading: true,
            ppts: [],
            redirect: false,
            redirectId: -1,
        };

        this.handleClick = this.handleClick.bind( this );
    }

    componentDidMount()
    {
        fetch( "./powerpoints/all" )
        .then( response => response.json() )
        .then( data => { this.setState( { ppts: data, loading: false } ); console.log( data ); } );
    }

    handleClick( id )
    {
        this.setState( { redirectId: id, redirect: true } );
    }

    render()
    {
        if( this.state.redirect )
        {
            let r = "./powerpoint/" + this.state.redirectId;
            return <Redirect to={ r } />
        }

        if( this.state.loading )
        {
            return(
                <div>Loading...</div>
            );
        }

        let pptList = Array();

        for( var i = 0; i < this.state.ppts.length; ++i )
        {
            var pt = this.state.ppts[ i ];

            pptList.push( <div onClick={ () => this.handleClick( pt.id ) } style={{ width: "300px", height: "200px", backgroundImage: "url('./storage/ppt_images/" + ( pt.ppt_images.length > 0 ? pt.ppt_images[0].filepath : "default.png" ) + "')", backgroundPosition: "center", backgroundSize: "300px 200px", backgroundRepeat: "no-repeat" }}><h2 style={{ textShadow: "2px 2px #000000" }}>{ pt.title }</h2></div>)
        }

        return(
            <div>
                <h1>
                    List of powerpoints
                </h1>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", gridRowGap: "50px" }}>
                    { pptList }
                </div>
            </div>
        );
    }
}