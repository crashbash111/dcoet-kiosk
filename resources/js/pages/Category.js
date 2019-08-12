import React from "react";
import {Link} from "react-router-dom";

export default class Category extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            category: {},
            pages: [],
        }
    }

    componentDidMount()
    {
        let {id} = this.props.match.params;
        fetch( "./category/" + id  )
        .then( response => response.json() )
        .then( data => this.setState( { category: data } ) );

        fetch( "./category/" + id + "/pages" )
        .then( response => response.json() )
        .then( data => this.setState( { pages: data } ) );
    }

    render()
    {
        let pageList = this.state.pages.map( item => {
            return(
                <div style={{ padding: "15px", border: "1px solid #cfcfcf" }}>
                    <Link to={ "/birds/" + item.id }><h3>{ item.heading }</h3></Link>
                    <div className="row">
                        <div className="col-6">
                            <p>{ item.text }</p>
                        </div>
                        <div className="col-6">
                            <img src={ "./storage/kiosk_images/" + item.images[ 0 ].image_name } style={{ width: "500px" }} />
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container">
                <h2>{ this.state.category.name }</h2>
                <br />
                { pageList }
            </div>
        );
    }
}