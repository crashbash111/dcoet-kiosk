import React from "react";

export default class SideBarEntry extends React.Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return(
            <div>
                <h1>{ this.props.name }</h1>
                <button onClick={ () => console.log( this.props.id ) }>{ this.props.name }</button>
            </div>
        );
    }
}