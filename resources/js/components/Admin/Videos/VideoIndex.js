import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";

import {withRouter} from "react-router-dom";

const VideoIndex = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            const res = await Axios.get("./api/videos");
            setVideos(res.data);
            setLoading(false);
        }
        fetchVideos();
    }, []);

    if (loading) {
        return <Loader />;
    }

    console.log(videos);

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
                                    <button onClick={ () => { history.push( `/videos/${item.id}` ) } } className="btn btn-dark">View</button>
                                    <button className="btn btn-success">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
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