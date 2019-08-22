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
            <div>
                <span className="opensidebar" onClick={this.toggleSidebar}>&#9776; open</span>
                <div className="sidebar" style={{ width: this.state.sidebarOpen ? '300px' : '0px' }}>
                    <img src="/images/logo.png"></img>
                    
                    <a href="./#">Entry 1</a>
                    <a href="./#">Entry 2</a>
                    <a href="./#">Entry 3</a>
                    <a href="./#">Entry 4</a>
                    <span className="opensidebar" onClick={this.toggleSidebar}>&#8592; Close</span>
                </div>
            </div>

        )
    }
}