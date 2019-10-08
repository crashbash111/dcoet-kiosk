import React from "react";

import Create from "../../pages/Admin/Create";
import Loader from "../Loader";
import ViewPages from "./KioskPages/ViewPages";

export default class KioskPages extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            mode: 0
        };

        this.handleClick = this.handleClick.bind( this );
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log( this.state.mode );
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Pages</div>;

        switch (this.state.mode) {
            case 0:
                child = <ViewPages />
                break;
            case 1:
                child = <Create />
                break;
            }

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => this.handleClick(1)}>Create New</button>
            </div>
            {child}
        </div>
    }
}