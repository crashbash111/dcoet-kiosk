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
                
                <span className="sidebartoggle" onClick={this.toggleSidebar}>&#9776; open</span>
                <div className={(this.props.isMobile && !this.state.sidebarOpen) ? 'sidebar sidebarclosed' : 'sidebar sidebaropened'}>
                {/*<div className="sidebar" style={{ width: this.state.sidebarOpen ? '300px' : '0px' }}>*/}
                {this.props.isMobile ? <span className="sidebartoggle" onClick={this.toggleSidebar}>&#8592; Close</span> : null}
                    <img src="/images/logo.png"></img>
                    
                    <a href="./#">Entry 1</a>
                    <a href="./#">Entry 2</a>
                    <a href="./#">Entry 3</a>
                    <a href="./#">Entry 4</a>
                    
                </div>
            </span>

        )
    }
}