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
                <img style={{ height: "80vh" }} src="./images/logo.png" />
        );
    }
}