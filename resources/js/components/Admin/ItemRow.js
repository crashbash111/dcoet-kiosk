import React from "react";
import {Link} from "react-router-dom";

import DeleteButton from "./ItemRow/DeleteButton";

export default function ItemRow( props )
{
    let imgCells = props.images.map( item => {
        return(
            <td style={{ borderStyle: "none" }}><img src={ "./storage/kiosk_images/" + item.image_name } style={{ height: "150px" }} /></td>  
        );
    })

    return(
        <tr>
            <td>
                { props.heading }
            </td>
            <td>
                { props.text }
            </td>
            <td>
                { props.categoryName }
            </td>
            <td>
                <table style={{ borderStyle: "none" }}>
                    <tr style={{ borderStyle: "none" }}>
                        { imgCells }
                    </tr>
                </table>
                
            </td>
            <td>
                <Link to={ "/birds/" + props.id }><button className="btn btn-light" role="button">Show</button></Link>
                <DeleteButton id={ props.id } handleDelete={ props.handleDelete } />
            </td>
        </tr>
    );
}