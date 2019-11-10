import React, { useState, useEffect } from "react";
import Axios from "axios";

import AdminTable from "../AdminTable";
import Loader from "../../Loader";

import {withRouter} from "react-router-dom";

const VideoIndex = ({history, videos, loading}) => {
    // const [loading, setLoading] = useState(false);
    // const [videos, setVideos] = useState([]);

    // useEffect(() => {
    //     const fetchVideos = async () => {
    //         setLoading(true);
    //         const res = await Axios.get("./api/videos");
    //         setVideos(res.data);
    //         setLoading(false);
    //     }
    //     fetchVideos();
    // }, []);

    if (loading) {
        return <Loader />;
    }

    //console.log(videos);

    const viewClick = ( i ) => history.push( `/videos/${i}` );

    const editClick = ( i ) => history.push( `/kiosk/${i}` );

    

    const heads = [
        { name: "id", text: "ID" },
        { name: "title", text: "Title" },
        { name: "description", text: "Description" },
        { name: "copyright", text: "Copyright" },
        // { name: "length", text: "Length" },
        // { name: "size", text: "Size" },
        { name: "actions", text: "Actions" }
    ];

    return <AdminTable heads={ heads } items={ videos } actions={ [ "View", "Edit", "Delete" ] } viewClick={ viewClick } editClick={ editClick } />

    return (
        <div>
            <h2 className="big-shadow">Videos</h2>
            <table className="admin-table-new">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Copyright
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    {item.description.length > 30 ? item.description.substring( 0, 27 ) + "..." : item.description.length }
                                </td>
                                <td>
                                    {item.copyright}
                                </td>
                                <td>
                                    <button onClick={ () => { history.push( `/videos/${item.id}` ) } } className="btn btn-dark btn-square">View</button>
                                    <button className="btn btn-success btn-square">Edit</button>
                                    <button className="btn btn-danger btn-square">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
};

export default withRouter(VideoIndex);