import React from "react";

import SideBarEntry from "./SideBar/SideBarEntry";

export default class SideBar extends React.Component
{
    constructor( props )
    {
        super( props );

        console.log( props );
    }

    render()
    {
        let sideBarEntries = this.props.categories.map( item =>
            {
                return(
                    <SideBarEntry key={ item.id } id={ item.id } isActive={ this.props.activeCategory == item.id } name={ item.name } description={ item.description } handleChange={ this.props.handleChange } />
                );
            }
        );

        return(
            <div>
                { sideBarEntries }
            </div>
        );
    }
}