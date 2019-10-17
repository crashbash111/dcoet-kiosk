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
            mode: 0,
            pageId: -1
        };

        this.handleClick = this.handleClick.bind( this );
        this.handleEditClick = this.handleEditClick.bind( this );
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log( this.state.mode );
    }

    handleEditClick( i )
    {
        this.setState( { pageId: i, mode: 1 } );
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Pages</div>;

        switch (this.state.mode) {
            case 0:
                child = <ViewPages pages={ this.props.pages } loading={ this.props.loading } handleEditClick={ this.handleEditClick } />
                break;
            case 1:
                const page = ( this.state.pageId ) != -1 ? this.props.pages.find( m => ( m.id == this.state.pageId ) ) : null;
                console.log( page );
                child = <Create page={ ( this.state.pageId ) != -1 ? this.props.pages.find( m => ( m.id == this.state.pageId ) ) : null } />
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