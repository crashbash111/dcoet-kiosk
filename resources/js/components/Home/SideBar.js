import React from "react";

import SideBarEntry from "./SideBar/SideBarEntry";

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {

        let sideBarEntries = this.props.categories.map(item => {
            return (
                <SideBarEntry key={item.id} id={item.id} isActive={this.props.activeCategory == item.id} name={item.name} description={item.description} handleChange={this.props.handleChange} />
            );
        }
        );




        let gameId = 999;

        sideBarEntries.push(<SideBarEntry key={gameId} id={gameId} isActive={this.props.activeCategory == gameId} name="Games" description="Games lol" handleChange={this.props.handleChange} />);

        return (
            <div className="no-scrollbar" style={{ display: "grid", gridTemplateRows: "repeat(6, 75px)", overflowY: "scroll", overflowX: "hidden" }}>
                {sideBarEntries}
            </div>
        );
    }
}