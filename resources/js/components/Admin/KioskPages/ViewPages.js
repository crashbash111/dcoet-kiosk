import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";
import Pagination from "../../Pagination";

const ViewPages = ({}) => {

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchPages = async () => {
            setLoading(true);
            const res = await Axios.get("./api/pages/" );
            setPages(res.data);
            setLoading(false);
        }
        fetchPages();
    }, []);

    if (loading) {
        return <Loader />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pages.slice( indexOfFirstItem, indexOfLastItem );

    const paginate = (number) => setCurrentPage(number);

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

export default ViewPages;