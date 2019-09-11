import React, { useState } from "react";

const AdminTable = ({ pages, categories, loading, changeActiveCategory, activeCategory, changeActivePage, activePage, postsPerPage }) => {
    //const [ activeCategory, setActiveCategory ] = useState( -1 );

    if (loading) {
        return <h2>Loading</h2>
    }

    var activeCategoryStyle = {
        backgroundColor: "blue"
    };

    let currentPage = null;

    if( activePage != -1 )
    {
        currentPage = pages.find( m => m.id == activePage );
    }

    return <div style={{ height: "65vh", display: "grid", gridTemplateColumns: "auto auto auto" }}>
        <div style={{ display: "grid", gridTemplateRows: "repeat( " + categories.length + ", minmax( 30px, auto ) )", overflowY: scroll }}>
            {categories.map(category => (
                <div key={category.id} style={category.id == activeCategory ? activeCategoryStyle : null} onClick={() => changeActiveCategory(category.id)}>{category.name}</div>
            ))}
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat( " + postsPerPage + ", auto )" }}>
            {pages.map( page => (
                <div key={ page.id } style={ page.id == activePage ? activeCategoryStyle : null } onClick={ () => changeActivePage( page.id ) } >
                    { page.heading }
                </div>
            ))}
        </div>
        <div>
            {
                currentPage != null ?
                <div>
                    <h1>{ currentPage.heading }</h1>
                    <p>{ currentPage.text.length > 60 ?  currentPage.text.substring( 0, 60 ) + "..." : currentPage.text }</p>
                </div>
                :
                <h2>Nothing selected</h2>
            }
        </div>


    </div>
}

export default AdminTable;