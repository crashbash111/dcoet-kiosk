import React from "react";

const AdminSidebarEntry = ({ item, handleClick }) => {
    return <a key={ item.id } onClick={ (event) => handleClick( item.id ) }>{ item.text }</a> 
};

export default AdminSidebarEntry;