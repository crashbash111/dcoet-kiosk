import React from "react";

export default class MainContent extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            loading: false,
            pages: [],
        };
    }

    componentDidMount()
    {
        this.setState( { loading: true } );
        fetch( "./category/" + "1" + "/pages" )
        .then( response => response.json() )
        .then( data => this.setState( { pages: data, loading: false } ) );
    }

    fetchData()
    {

    }

    render()
    {
        if( this.state.pages == null )
        {
            return(
                <div>Main Content</div>
            );
        }
        else
        {
            if( this.state.loading )
            {
                return(
                    <h1>Loading...</h1>
                )
            }
            else
            {
                var pagesList = this.state.pages.map( item => {
                    return(
                        <h1>{ item.heading }</h1>
                    );
                });

                return(
                    <div>
                        { pagesList }
                    </div>
                );
            }
        }
    }
}