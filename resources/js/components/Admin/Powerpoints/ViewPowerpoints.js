import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import Axios from "axios";

import AdminTable from "../AdminTable";
import Loader from "../../Loader";

const ViewPowerpoints = ({history, powerpoints, loading, createClick }) => {

    // const [powerpoints, setPowerpoints] = useState([]);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchPowerpoints = async () => {
    //         setLoading(true);
    //         const res = await Axios.get("./api/powerpoints/" );
    //         setPowerpoints(res.data);
    //         setLoading(false);
    //     }
    //     fetchPowerpoints();
    // }, []);

    if (loading) {
        return <Loader />;
    }

    const viewClick = ( i ) => history.push( `/powerpoints/${i}` );

    const editClick = ( i ) => history.push( `/kiosk/${i}` );

    const heads = [
        { name: "id", text: "ID" },
        { name: "title", text: "Title" },
        { name: "length", text: "Length" },
        { name: "actions", text: "Actions" }
    ];

    return <AdminTable heads={ heads } items={ powerpoints } actions={ [ "View", "Edit", "Delete" ] } createClick={ createClick } viewClick={ viewClick } editClick={ editClick } />

    return (
        <div>
            <h2>Powerpoints</h2>
            {/* <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div> */}
            <div style={{ minWidth: "100vh" }}>
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
                                        <button className="btn btn-dark btn-square">View</button>
                                        <button className="btn btn-success btn-square">Edit</button>
                                        <button className="btn btn-danger btn-square">Delete</button>
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

export default withRouter( ViewPowerpoints );