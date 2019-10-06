import React from "react";

const AdminSidebarEntry = ({ item, handleClick, isActive }) => {
    return <a className={ isActive ? "active" : null } key={ item.id } onClick={ (event) => handleClick( item.id ) }>{ item.text }</a> 
};

export default AdminSidebarEntry;