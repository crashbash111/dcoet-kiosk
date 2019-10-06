import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../Loader";

const Dashboard = () => {
    const [mostViewed, setMostViewed] = useState([]);
    const [leastViewed, setLeastViewed] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMostViewed = async () => {
            setLoading(true);
            const res = await Axios.get("./api/pages/mostviewed");
            setMostViewed(res.data);
            //setLoading(false);
        }

        const fetchLeastViewed = async () => {
            setLoading(true);
            const res = await Axios.get("./api/pages/leastviewed");
            setLeastViewed(res.data);
            setLoading(false);
        }
        fetchMostViewed();
        fetchLeastViewed();
    }, []);

    if (loading) {
        return <div>
            <h2>Dashboard</h2>
            <br />
            <Loader />
        </div>
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <br />
            <h3>Most Viewed</h3>
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
                    {mostViewed.map(item => (
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
            <br />
            <h3>Least Viewed</h3>
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
    )
};

export default Dashboard;