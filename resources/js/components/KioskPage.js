import React from "react";
import { Link } from "react-router-dom";

export default class KioskPage extends React.Component
{
    render()
    {
        return(
            <div>
                <h1>Tub</h1>
                <Link to="/dashboard">Hello</Link>
            </div>
        );
    }
}