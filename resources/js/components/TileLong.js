import React from "react";

export default class TileLong extends React.Component
{
    constructor( props )
    {
        super( props );

    }

    render()
    {
        var tileStyle = {
            boxShadow: "4px 4px 5px black",
            width: "250px",
            height: "450px",
            backgroundColor: "rgba( 0, 0, 0, 0 )",
            backgroundImage: "url( '" + this.props.img + "' )",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "10px"
        }

        return(
            <div style={ tileStyle }>
                <h2>{ this.props.text }</h2>
            </div>
        );
    }
}