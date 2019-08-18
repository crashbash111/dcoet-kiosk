import React from "react";

export default class Logo extends React.Component
{
    constructor( props )
    {
        super( props );

    }

    render()
    {
        return(
            <div>
                <img src="/images/logo.png"></img>
            </div>
        );
    }
}