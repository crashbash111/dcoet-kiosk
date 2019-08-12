import React from "react";

export default class TileHome extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            loading: false
        }

        this.handleClick = this.handleClick.bind( this );
    }

    handleClick()
    {
        this.setState( { loading: true } );

        this.props.handleClick( this.props.id );
    }

    render()
    {
        var tileStyle = {
        
            backgroundColor: "rgba( 0, 0, 0, 0 )",
            backgroundImage: "url( '" + this.props.img + "' )",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }

        return(
            <div onClick={ () => this.handleClick() }  className="item" style={ tileStyle }>
                <div style={{ top: "0", left: "0", right: "0", bottom: "0", backgroundColor: "rgba( 0, 0, 0, 0.7 )", position: "fixed", width: "100%", height: "100%", display: this.state.loading ? "block" : "none" }}>
                    <h2 style={{ textAlign: "center" }}>Loading...</h2>
                </div>
                <h2>{ this.props.text }</h2>
            </div>
        );
    }
}