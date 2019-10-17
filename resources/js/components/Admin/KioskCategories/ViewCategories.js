import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import Axios from "axios";

import AdminTable from "../AdminTable";
import Loader from "../../Loader";

const ViewCategories = ({ history, categories, loading }) => {

    // const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         setLoading(true);
    //         const res = await Axios.get("./api/categories/" );
    //         setCategories(res.data);
    //         setLoading(false);
    //     }
    //     fetchCategories();
    // }, []);

    if (loading) {
        return <Loader />;
    }

    const editClick = ( i ) => history.push( `/kiosk/${i}` );

    const heads = [
        { name: "id", text: "ID" },
        { name: "name", text: "Name" },
        { name: "description", text: "Description" },
        { name: "numPages", text: "Number of Pages" },
        { name: "actions", text: "Actions" }
    ];

    return <AdminTable heads={ heads } items={ categories } actions={ [ "Edit", "Delete" ] } editClick={ editClick } />

    return (
        <div>
            <h2>Categories</h2>
            {/* <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div> */}
            <div style={{ minWidth: "100vh" }}>
                <table className="admin-table-new">
                    <thead>
                        <tr>
                            <th>Name</th><th>Description</th><th>Number of Pages</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.numPages}</td>
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

export default withRouter( ViewCategories );