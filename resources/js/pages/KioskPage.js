import React from "react";
import {Link} from "react-router-dom";

export default class KioskPage extends React.Component {

    constructor( props )
    {
        super( props );

        this.state = {
            loading: true,
            page: {},
            index: 0,
        };

        this.handleClick = this.handleClick.bind( this );
    }

    componentDidMount()
    {
        this.setState( { loading: true } );

        let {id} = this.props.match.params;

        fetch( "./pages/" + id )
        .then( response => response.json() )
        .then( data => this.setState( { page: data, loading: false } ) );
    }

    handleClick( event )
    {
        var t = setInterval( this.fade, 10 );
        setTimeout( () => {
            clearInterval( t );
            this.setState( { opacity: 1 } );
            this.setState( prevState => {
                return(
                    { index: ( this.state.index + 1 ) % this.state.page.images.length }
                );
            });
        }, 250 );
    }

    render() {

        if( this.state.loading )
        {
            return (
                <h1>Loading...</h1>
            );
        }
        else
        {
            let imgPath = "./storage/kiosk_images/" + this.state.page.images[ this.state.index ].image_name;

            return (
                <div>
                    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "15% auto" }}>
                        <div style={{ height: "100%", overflowY: "scroll" }}>
                            <h1>{ this.state.page.heading }</h1>
                            <p>{ this.state.page.text }</p>
                            <br />
                            <br />
                            <Link to="/" className="btn btn-lg btn-warning" role="button">Back to Home</Link>
                        </div>
                        <div onClick={ this.handleClick }>
                            <img style={{ opacity: this.state.opacity }} src={ imgPath } width="100%" />
                        </div>
                    </div>
                </div>
            );
        }
    }
}