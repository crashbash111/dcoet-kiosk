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
                <img style={{ height: "80vh", padding: "20px 0px 0px 0px" }} src="./images/logo.png" />
        );
    }
}