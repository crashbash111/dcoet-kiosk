import React from "react";

import CreatePowerpoint from "./Powerpoints/CreatePowerpoint";
import Loader from "../Loader";
import ViewPowerpoints from "./Powerpoints/ViewPowerpoints";

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

        let child = <div>Powerpoints</div>;

        switch (this.state.mode) {
            case 0:
                child = <ViewPowerpoints />
                break;
            case 1:
                child = <CreatePowerpoint />
                break;
            }

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 0 ? "btn btn-primary" : "btn btn-dark" } onClick={(event) => this.handleClick(0)}>View</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={ this.state.mode == 1 ? "btn btn-primary" : "btn btn-dark" } onClick={(event) => this.handleClick(1)}>Create New</button>
            </div>
            {child}
        </div>
    }
}