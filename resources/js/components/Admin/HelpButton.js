import React from "react";
import Popup from "reactjs-popup";

const Card = ({ heading, text }) => (
    <div className="card">
        <div className="header">{heading}</div>
        <div className="content">
            {text}
        </div>
    </div>
);

const HelpButton = ({ position, heading, text }) => {
    return (
        <Popup trigger={<button style={{ borderRadius: "50%", display: "inline-block" }}>?</button>} position={position != null ? position : "top center"} closeOnDocumentClick on="hover">
            <div style={{ color: "black",  }}>
                {heading}
                <br />
                {text != null ? text : "Help text here"}
            </div>
        </Popup>
    );
};

export default HelpButton;