import React from "react";

const AdminTable = ({ pages, loading }) => {
    if( loading )
    {
        return <h2>Loading</h2>
    }

    return <ul className="list-group mb-4" style={ { color: "black" } }>
        {pages.map( page => (
            <li key={ page.id } className="list-group-item">
                {page.heading}
            </li>
        ))}
    </ul>
}

export default AdminTable;