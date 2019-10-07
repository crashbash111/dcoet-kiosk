import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";

const ViewBannedWords = ({}) => {

    const [bannedWords, setBannedWords] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBannedWords = async () => {
            setLoading(true);
            const res = await Axios.get("./api/bannedwords/" );
            setBannedWords(res.data);
            setLoading(false);
        }
        fetchBannedWords();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2>Banned Words</h2>
            {/* <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div> */}
            <div style={{ float: "left", width: "100vh" }}>
                <table className="admin-table-new">
                    <thead>
                        <tr>
                            <th>Word</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bannedWords.map(item => (
                                <tr key={item.id}>
                                    <td>{item.word}</td>
                                    <td>
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

export default ViewBannedWords;