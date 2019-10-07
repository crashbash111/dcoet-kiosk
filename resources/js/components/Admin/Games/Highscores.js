import React, { useState, useEffect } from "react";
import Axios from "axios";

import Loader from "../../Loader";

const Highscores = ({ game, handleBackClick }) => {

    const [highscores, setHighscores] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHighscores = async () => {
            setLoading(true);
            const res = await Axios.get("./api/games/" + game.id + "/highscores");
            setHighscores(res.data);
            setLoading(false);
        }
        fetchHighscores();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2>Highscores - {game.name}</h2>
            <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div>
            <div style={{ float: "left", width: "100vh" }}>
                <table className="admin-table-new">
                    <thead>
                        <tr>
                            <th>Initials</th><th>Score</th><th>Timestamp</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            highscores.map(item => (
                                <tr key={item.id}>
                                    <td>{item.initials}</td>
                                    <td>{item.score}</td>
                                    <td>{item.created_at}</td>
                                    <td>
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

export default Highscores;