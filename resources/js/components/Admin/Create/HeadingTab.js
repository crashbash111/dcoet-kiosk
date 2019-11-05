import React from "react";

const HeadingTab = ({ heading, handleChange }) => {
    return (
        <div className="form-group" id="heading">
            <label><h3 className="big-shadow">Heading</h3>
                {/* <HelpButton position="right center" heading="Heading"
                text="The heading is what is shown at the top of the kiosk page. It is also what displays in the kiosk home page and is used for searching."
            /> */}
                <input className="form-control" type="text" name="heading" value={heading} onChange={handleChange} placeholder="Enter heading here..." />
                {/* <p className="red-shadow" style={{ color: "red", display: ( heading.length > 2 ) ? "none" : "block" }}>Heading requires at least 3 characters</p> */}
            </label>
        </div>
    );
};

export default HeadingTab;