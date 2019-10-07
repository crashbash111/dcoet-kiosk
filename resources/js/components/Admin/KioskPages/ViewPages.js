import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";

const ViewPages = ({}) => {

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div>
            <h2>Pages</h2>
            {/* <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div> */}
            <div style={{ float: "left", width: "100vh" }}>
                <table className="admin-table-new">
                    <thead>
                        <tr>
                            <th>Heading</th><th>Short Description</th><th>Long Description</th><th>Times Visited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pages.map(item => (
                                <tr key={item.id}>
                                    <td>{item.heading}</td>
                                    <td>{item.shortdesc}</td>
                                    <td>{ item.longdesc }</td>
                                    <td>{item.numPages}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPages;