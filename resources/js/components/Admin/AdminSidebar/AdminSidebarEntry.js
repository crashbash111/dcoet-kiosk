import React from "react";

const AdminSidebarEntry = ({ item, handleClick }) => {
    return <a onClick={ (event) => handleClick( item.id ) }>{ item.text }</a> 
};

export default AdminSidebarEntry;