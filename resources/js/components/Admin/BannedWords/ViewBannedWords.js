import React, { useState, useEffect } from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";

import AdminTable from "../AdminTable";
import Loader from "../../Loader";

import { useTransition, animated } from "react-spring";

const ViewBannedWords = ({ history, bannedWords, loading, addedSuccessfully }) => {

    // const [bannedWords, setBannedWords] = useState([]);
    const [profaneView, setProfaneView] = useState(false);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const fetchBannedWords = async () => {
    //         setLoading(true);
    //         const res = await Axios.get("./api/bannedwords/");
    //         setBannedWords(res.data);
    //         setLoading(false);
    //     }
    //     fetchBannedWords();
    // }, []);

    if (loading) {
        return <Loader />;
    }

    const editClick = (i) => history.push(`/kiosk/${i}`);

    const heads = [
        { name: "id", text: "ID" },
        { name: "word", text: "Word" },
        { name: "created_at", text: "Date Added" },
        { name: "actions", text: "Actions" }
    ];

    const bw = bannedWords.map( item => {
        return { ...item, word: !profaneView ? `${item.word[0]}*${item.word[2]}` : item.word };
    });

    const expand = useTransition( addedSuccessfully, null, {
        from: {
            opacity: 0,
            padding: "0px"
        },
        enter: {
            opacity: 100,
            padding: "20px"
        },
        leave: {
            opacity: 0,
            padding: "0px",
            height: "0px"
        }
    } );

    return (
        <div>
            {
                expand.map( ( { item, props, key } ) => (
                    item && <animated.div
                        key={ key }
                        style={{ ...props, backgroundColor: "green", width: "100vh" }}
                        >
                            <p>Item added successfully.</p>
                        </animated.div>
                ))
            }
            <h2>Banned Words</h2>
            <button className={profaneView ? "btn btn-success" : "btn btn-warning"} onClick={profaneView ? () => { setProfaneView(false) } : () => { setProfaneView(true) }}>Turn profane view {profaneView ? "on" : "off"}</button>
            <AdminTable heads={heads} items={bw} actions={["Edit", "Delete"]} editClick={editClick} />
        </div>
    );

    return (
        <div>
            <button className={profaneView ? "btn btn-success" : "btn btn-warning"} onClick={profaneView ? () => { setProfaneView(false) } : () => { setProfaneView(true) }}>Turn profane view {profaneView ? "on" : "off"}</button>

        </div>
    )

    return (
        <div>
            <h2>Banned Words</h2>
            {/* <div style={{ float: "right" }}>
                <button onClick={handleBackClick} className="btn btn-danger">Back</button>
            </div> */}
            <div style={{ minWidth: "100vh" }}>
                <button className={profaneView ? "btn btn-success" : "btn btn-warning"} onClick={profaneView ? () => { setProfaneView(false) } : () => { setProfaneView(true) }}>Turn profane view {profaneView ? "on" : "off"}</button>
                <table className="admin-table-new">
                    <thead>
                        <tr>
                            <th>Word</th><th>Timestamp</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bannedWords.map(item => (
                                <tr key={item.id}>
                                    <td>{profaneView ? item.word : item.word[0] + "*" + item.word[2]}</td>
                                    <td>{item.created_at}</td>
                                    <td>
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

export default withRouter( ViewBannedWords );