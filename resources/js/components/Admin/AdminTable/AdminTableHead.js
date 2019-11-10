import React from "react";

const AdminTableHead = ( { items, sortName, headItemClick } ) => {
    
    console.log( "ttt" + sortName );

    const upCaret = {
            width: 0,
            height: 0,
            borderLeft: "1em solid transparent",
            borderRight: "1em solid transparent",
            borderBottom: "2em solid black"
    }

    let i = 0;
    const rows = items.map( item => {
        //console.log( item.name );
        return <th key={ i++ } onClick={ (event) => { headItemClick( item.name ) } } style={{ width: ( i == 0 ? "25px" : "1fr" ) }} className={ ( sortName == item.name ) ? "active" : null }>{ item.text }{ ( sortName == item.name ) ? <span className="caret-down"></span> : null }</th>
    });
    
    return <thead>
        <tr>
            {rows}
        </tr>
    </thead>
};

export default AdminTableHead;