import React from "react";

export default class SideBarEntry extends React.Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        let divStyle;

        if( this.props.isActive )
        {
            divStyle = {
                height: "150px",
                textAlign: "center",
                color: "blue",
            };
        }

        return(
            <div style={divStyle} onClick={ () => this.props.handleChange( this.props.id ) }>
                <h1>{ this.props.name }</h1>
            </div>
        );
    }
}