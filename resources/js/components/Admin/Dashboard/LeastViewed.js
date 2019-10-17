import React, { useState, useEffect } from "react";
import Axios from "axios";

import AdminTable from "../AdminTable";
import Loader from "../../Loader";

const LeastViewed = ( { leastViewed, loading } ) => {

    // const [loading, setLoading] = useState(false);
    // const [leastViewed, setLeastViewed] = useState([]);

    // useEffect(() => {
    //     const fetchLeastViewed = async () => {
    //         setLoading(true);
    //         const res = await Axios.get("./api/pages/leastviewed");
    //         setLeastViewed(res.data);
    //         setLoading(false);
    //     }
    //     fetchLeastViewed();
    // }, []);

    if (loading) {
        return <Loader />;
    }

    const heads = [
        { name: "id", text: "ID" },
        { name: "name", text: "Name" },
        { name: "categoryname", text: "Category" },
        { name: "times_viewed", text: "Times Viewed" }
    ];

    return <AdminTable heads={ heads } items={ leastViewed } />

    return (
        <div>
            <h2 className="big-shadow">Least Viewed</h2>
            <table className="admin-table-new">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Heading</th>
                        {/* <th>Short Description</th>
                        <th>Long Description</th> */}
                        <th>Category</th>
                        <th>Times Viewed</th>
                    </tr>
                </thead>
                <tbody>
                    {leastViewed.map(item => (
                        <tr key={item.id}>
                            {/* <td>{item.id}</td> */}
                            <td>{item.heading}</td>
                            {/* <td>{item.shortdesc.length > 15 ? item.shortdesc.substring(0, 12) + "..." : item.shortdesc}</td>
                            <td>{item.longdesc == null ? null : item.longdesc.length > 20 ? item.longdesc.substring(0, 17) + "..." : item.longdesc}</td> */}
                            <td>{item.categoryname}</td>
                            <td>{item.times_viewed}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeastViewed;