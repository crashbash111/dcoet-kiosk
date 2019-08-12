import React from "react";
import ReactDOM from "react-dom";
import TileHome from "./TileHome";
import TileLong from "./TileLong";

export default class Test2 extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            birds: {},
            pests: {},
            loading: false
        };
    }

    componentDidMount()
    {
        this.setState( { loading: true } );
        fetch( "/data2" )
        .then( response => response.json() )
        .then( data => this.setState( { birds: data } ) );

        fetch( "/dataPests" )
        .then( response => response.json() )
        .then( data => this.setState( { pests: data, loading: false } ) );
    }

    handleClick( i )
    {
        window.location.href = "/" + i;
    }

    render()
    {
        var bodyStyle = {
            display: "grid",
            placeItems: "center",
            backgroundColor: "#111111"
        }

        var ulStyle = {
            listStyle: "none",
            padding: 0
        }

        var headingStyle = {
            margin: 0
        }

        var h1Style = {
            color: "white",
            fontSize: "75px"
        }

        var h2Style = {
            textShadow: "2px 2px 4px #000000",
            fontSize: "50px"
        }

        var itemsBirds = [];
        var itemsPests = [];

        var keys = Object.keys( this.state.birds );

        keys.forEach( fat => {
            var is = Object.keys( this.state.birds[ fat ] );
            is.forEach( i => {
                var value = this.state.birds[ fat ][ i ];

                itemsBirds[ this.state.birds[ fat ][ "id" ] ] =
                    <TileHome key={this.state.birds[ fat ][ "id" ]}
                        id={ this.state.birds[ fat ][ "id" ] }
                        text={ this.state.birds[ fat ][ "text" ] }
                        img={ this.state.birds[ fat ][ "img" ] }
                        handleClick={ this.handleClick }
                    />

                console.log( this.state.birds[ fat ][ "id" ] );
            });
        });

        var keys = Object.keys( this.state.pests );

        keys.forEach( fat => {
            var is = Object.keys( this.state.pests[ fat ] );
            is.forEach( i => {
                var value = this.state.pests[ fat ][ i ];

                itemsPests[ this.state.pests[ fat ][ "id" ] ] =
                    <TileHome key={this.state.pests[ fat ][ "id" ]}
                        id={ this.state.pests[ fat ][ "id" ] }
                        text={ this.state.pests[ fat ][ "text" ] }
                        img={ this.state.pests[ fat ][ "img" ] }
                        handleClick={ this.handleClick }
                    />

                console.log( this.state.pests[ fat ][ "id" ] );
            });
        });

        return(
            <div className="app full">
                <h1>Birds</h1>
                <ul className="hs full">
                    { itemsBirds }
                </ul>
                <h1>Pests</h1>
                <ul className="hs full">
                    { itemsPests }
                </ul>
                <h1>Tracks</h1>
                <ul className="hs full no-scrollbar">
                        <li className="item">Item</li>
                        <li className="item">Item</li>
                        <li className="item">Item</li>
                    </ul>
            </div>
        );
    }
}

if( document.getElementById( "test2" ) )
{
    ReactDOM.render( <Test2 />, document.getElementById( "test2" ) );
}