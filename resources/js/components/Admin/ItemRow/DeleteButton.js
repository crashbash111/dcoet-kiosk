import React from "react";

export default function DeleteButton( props )
{
    return(
        <div>
            <button className="btn btn-danger" onClick={ () => props.handleDelete( props.id ) } role="button">Delete</button>
        </div>
    );
}