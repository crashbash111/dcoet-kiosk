import React from "react";
import { Link } from "react-router-dom";

const CategoryTable = ( { categories, shownCategory, categoryClick } ) => {

    const selectedStyle = {
        backgroundColor: "blue",
    };

    var categoryItems = categories.map( item => (
        <div key={ item.id } onClick={ () => categoryClick( item.id )} style={ item.id == shownCategory ? selectedStyle : null }>
            <h2>{ item.name }</h2>
        </div>
    ));

    var currentCategory = null;

    if( shownCategory != -1 )
    {
        currentCategory = categories.find( m => m.id == shownCategory );
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            <div style={{ display: "grid", gridTemplateRows: "repeat(" + categories.length + ", minmax( 30px, auto ))" }}>
                { categoryItems }
            </div>
            <div>
                { currentCategory != null ?
                    <div>
                        <h1>{ currentCategory.name }</h1>
                        <p>{ currentCategory.description.length > 40 ? currentCategory.description.substring( 0, 40 ) + "..." : currentCategory.description }</p>
                        <br />
                        <Link to={ "/admin/createCategory/" + currentCategory.id } className="btn btn-success">Edit</Link>
                        <Link to={ "/admin/createCategory/" + currentCategory.id } className="btn btn-danger">Delete</Link>
                    </div>
                    :
                    <h2>Nothing selected</h2>
                }
            </div>
        </div>
    );
};

export default CategoryTable;