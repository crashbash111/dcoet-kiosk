import React from "react";
import { Link } from "react-router-dom";

import AdminSidebarEntry from "./AdminSidebar/AdminSidebarEntry";

export default class AdminSidebar extends React.Component {

    constructor() {
        super();
        this.state = {
            sidebarOpen: false,
        }
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }


    toggleSidebar() {
        this.setState(state => ({
            sidebarOpen: !state.sidebarOpen
        }));
    }

    render() {
        let entries = this.props.items.map(item => {
            return <AdminSidebarEntry key={item.id} item={item} handleClick={ this.props.handleTabClick } />
        });

        return (
            <span>
                <span className="sidebartoggle" onClick={this.toggleSidebar}>&#9776; Open</span>
                <div className={this.props.isMobile ? 'fullarea' : 'leftarea'}>

                    <div className={(this.props.isMobile && !this.state.sidebarOpen) ? 'sidebar sidebarclosed' : 'sidebar sidebaropened'}>
                        {/*<div className="sidebar" style={{ width: this.state.sidebarOpen ? '300px' : '0px' }}>*/}
                        {this.props.isMobile ? <span className="sidebartoggle" onClick={this.toggleSidebar}>&#8592; Close</span> : null}
                        <img src="./images/logo.png"></img>

                        {entries}

                        {/* <a onClick={ () => this.props.handleTabClick( 0 ) }>Dashboard</a>
                        <a onClick={ () => this.props.handleTabClick( 1 ) }>Categories</a>
                        <a href="./#/powerpoints">Slideshows</a>
                        <a href="./#">Games</a>
        <a onClick={ (event) => this.props.handleTabClick(4)}>Banned Words</a>*/}
                        <a className="returns" href="./#">&#8592; Kiosk View</a>

                    </div>
                </div>
            </span>
        )
    }
}