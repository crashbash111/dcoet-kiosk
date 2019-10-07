import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";

const ViewPowerpoints = ({}) => {

    const [powerpoints, setPowerpoints] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPowerpoints = async () => {
            setLoading(true);
            const res = await Axios.get("./api/powerpoints/" );
            setPowerpoints(res.data);
            setLoading(false);
        }
        fetchPowerpoints();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2>Powerpoints</h2>
            {/* <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div> */}
            <div style={{ float: "left", width: "100vh" }}>
                <table className="admin-table-new">
                    <thead>
                        <tr>
                            <th>Title</th><th>Length</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            powerpoints.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.ppt_images.length}</td>
                                    <td>
                                        <button className="btn btn-dark">View</button>
                                        <button className="btn btn-success">Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPowerpoints;