import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import Axios from "axios";

import AdminTable from "../AdminTable";
import Loader from "../../Loader";
import Pagination from "../../Pagination";

const ViewPages = ({history, pages, loading, handleEditClick }) => {

    //const [pages, setPages] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // useEffect(() => {
    //     const fetchPages = async () => {
    //         setLoading(true);
    //         const res = await Axios.get("./api/pages/" );
    //         console.log( res.data );
    //         setPages(res.data);
    //         setLoading(false);
    //     }
    //     fetchPages();
    // }, []);

    if (loading) {
        return <Loader />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pages.slice( indexOfFirstItem, indexOfLastItem );

    const paginate = (number) => setCurrentPage(number);

    const viewClick = ( i ) => history.push( `/kiosk/${i}` );

    const heads = [
        { name: "id", text: "ID" },
        { name: "heading", text: "Heading" },
        { name: "shortdesc", text: "Short Description" },
        { name: "longdesc", text: "Long Description" },
        { name: "times_viewed", text: "Times Visited" },
        { name: "actions", text: "Actions" }
    ];

    return <AdminTable heads={ heads } items={ pages } actions={ [ "View", "Edit", "Delete" ] } viewClick={ viewClick } editClick={ handleEditClick } />

    return (
        <div>
            <h2>Pages</h2>
            {/* <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div> */}
            <div>
                <table className="admin-table-new">
                    <thead>
                        <tr>
                            <th>Heading</th><th>Short Description</th><th>Long Description</th><th>Times Visited</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.heading}</td>
                                    <td>{item.shortdesc.length > 20 ? item.shortdesc.substring( 0, 17 ) + "..." : item.shortdesc }</td>
                                    <td>{ (item.longdesc != null && item.longdesc != "" && item.longdesc.length > 30 ) ? item.longdesc.substring(0,27) + "..." : item.longdesc }</td>
                                    <td>{item.times_viewed}</td>
                                    <td>
                                        <button className="btn btn-dark btn-square">View</button>
                                        <button className="btn btn-success btn-square">Edit</button>
                                        <button className="btn btn-danger btn-square">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div style={{ width: "40vh", marginLeft: "auto", marginRight: "auto" }}>
                <Pagination itemsPerPage={itemsPerPage} totalItems={pages.length} paginate={paginate} />
                </div>
                
            </div>
        </div>
    );
};

export default withRouter( ViewPages );