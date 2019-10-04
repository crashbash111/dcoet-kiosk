import React from "react";

import SideBarEntry from "./SideBar/SideBarEntry";

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        //console.log(props);
    }

    render() {

        let sideBarEntries = this.props.categories.map(item => {
            return (
                <SideBarEntry key={item.id} id={item.id} isActive={this.props.activeCategory == item.id} name={item.name} description={item.description} handleChange={this.props.handleChange} />
            );
        }
        );

        let gameId = -2;
        let videoId = -3;

        sideBarEntries.push(<SideBarEntry key={gameId} id={gameId} isActive={this.props.activeCategory == gameId} name="Games" description="Fun interactive activites." handleChange={this.props.handleChange} />);
        sideBarEntries.push(<SideBarEntry key={videoId} id={videoId} isActive={this.props.activeCategory == videoId} name="Videos" description="Educational and entertaining videos." handleChange={this.props.handleChange} />);
        
        return (
            <div className="no-scrollbar" style={{ height: "100%", display: "grid", gridTemplateRows: "repeat(6, 75px)", overflowY: "scroll", overflowX: "hidden" }}>
                {sideBarEntries}
            </div>
        );
    }
}