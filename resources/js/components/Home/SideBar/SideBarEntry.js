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
                textAlign: "center",
                color: "blue",
            };
        }

        return(
            <div style={divStyle}>
                <h1>{ this.props.name }</h1>
                <button onClick={ () => this.props.handleChange( this.props.id ) }>{ this.props.name }</button>
            </div>
        );
    }
}