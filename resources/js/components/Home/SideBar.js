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
                    <SideBarEntry key={ item.id } id={ item.id } name={ item.name } description={ item.description } handleChange={ item.handleCategoryChange } />
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