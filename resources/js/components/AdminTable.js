import React, { useState } from "react";

const AdminTable = ({ pages, categories, loading, changeActiveCategory, activeCategory }) => {
    //const [ activeCategory, setActiveCategory ] = useState( -1 );

    if (loading) {
        return <h2>Loading</h2>
    }

    var activeCategoryStyle = {
        backgroundColor: "blue"
    };

    return <div style={{ height: "65vh", display: "grid", gridTemplateColumns: "auto auto auto" }}>
        <div style={{ display: "grid", gridTemplateRows: "repeat( " + categories.length + ", minmax( 30px, auto ) )", overflowY: scroll }}>
            {categories.map(category => (
                <div key={category.id} style={ category.id == activeCategory ? activeCategoryStyle : null } onClick={ () => changeActiveCategory( category.id ) }>{category.name}</div>
            ))}
        </div>
        <div>
            <ul className="list-group mb-4" style={{ color: "black" }}>
                {pages.map(page => (
                    <li key={page.id} className="list-group-item">
                        {page.heading}
                    </li>
                ))}
            </ul>
        </div>
        <div>
            Currently selected
        </div>


    </div>
}

export default AdminTable;