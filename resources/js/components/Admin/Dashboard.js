import React, { useState, useEffect } from "react";
import Axios from "axios";

import LeastViewed from "./Dashboard/LeastViewed";
import Loader from "../Loader";
import MostViewed from "./Dashboard/MostViewed";

const Dashboard = ( { mostViewed, mostViewedLoading, leastViewed, leastViewedLoading } ) => {
    // const [mostViewed, setMostViewed] = useState([]);
    const [mode, setMode] = useState(0);
    //const [leastViewed, setLeastViewed] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     // const fetchMostViewed = async () => {
    //     //     setLoading(true);
    //     //     const res = await Axios.get("./api/pages/mostviewed");
    //     //     setMostViewed(res.data);
    //     //     //setLoading(false);
    //     // }

    //     // const fetchLeastViewed = async () => {
    //     //     setLoading(true);
    //     //     const res = await Axios.get("./api/pages/leastviewed");
    //     //     setLeastViewed(res.data);
    //     //     setLoading(false);
    //     // }
    //     // fetchMostViewed();
    // }, []);

    if (loading) {
        return <div>
            <h2>Dashboard</h2>
            <br />
            <Loader />
        </div>
    }

    var child = <div>Dashboard</div>;

    switch (mode) {
        case 0:
            child = <MostViewed mostViewed={ mostViewed } loading={ mostViewedLoading } />
            break;
        case 1:
            child = <LeastViewed leastViewed={ leastViewed } loading={ leastViewedLoading } />
            break;
        }

    return <div>
        <div style={{ display: "inline-block" }}>
            <button className={ mode == 0 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => setMode(0)}>Most Viewed</button>
        </div>
        <div style={{ display: "inline-block" }}>
            <button className={ mode == 1 ? "btn btn-primary btn-square" : "btn btn-dark btn-square" } onClick={(event) => setMode(1)}>Least Viewed</button>
        </div>
        {child}
    </div>

    return (
        

        <div>
            <h2>Dashboard</h2>
            <br />
            <MostViewed />
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