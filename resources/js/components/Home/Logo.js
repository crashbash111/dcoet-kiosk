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
                <a href={`#/admin`}><img style={{ height: "80vh" }} src="./images/logo.png" /></a>
        );
    }
}