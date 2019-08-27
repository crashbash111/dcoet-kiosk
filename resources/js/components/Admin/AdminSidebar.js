import React from "react";

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
        return (
            <span>
                <span className="sidebartoggle" onClick={this.toggleSidebar}>&#9776; Open</span>
                <div className={this.props.isMobile ? 'fullarea' : 'leftarea'}>

                    <div className={(this.props.isMobile && !this.state.sidebarOpen) ? 'sidebar sidebarclosed' : 'sidebar sidebaropened'}>
                        {/*<div className="sidebar" style={{ width: this.state.sidebarOpen ? '300px' : '0px' }}>*/}
                        {this.props.isMobile ? <span className="sidebartoggle" onClick={this.toggleSidebar}>&#8592; Close</span> : null}
                        <img src="./images/logo.png"></img>

                        <a href="./#">Dashboard</a>
                        <a href="./#">Categories</a>
                        <a href="./#">Pages</a>
                        <a href="./#">Games</a>
                        <a className="returns" href="./#">&#8592; Kiosk View</a>

                    </div>
                </div>
            </span>
        )
    }
}