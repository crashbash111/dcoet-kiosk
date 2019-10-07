import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";

const ViewBannedWords = ({ }) => {

    const [bannedWords, setBannedWords] = useState([]);
    const [profaneView, setProfaneView] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBannedWords = async () => {
            setLoading(true);
            const res = await Axios.get("./api/bannedwords/");
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
                <button className={profaneView ? "btn btn-success" : "btn btn-warning"} onClick={ profaneView ? () => { setProfaneView( false ) } : () => { setProfaneView( true ) } }>Turn profane view {profaneView ? "on" : "off"}</button>
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
                                    <td>{profaneView ? item.word : item.word[0] + "*" + item.word[2]}</td>
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