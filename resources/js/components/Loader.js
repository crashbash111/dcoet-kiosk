import React from "react";
import { Spring } from 'react-spring/renderprops';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {props => (
                    <div style={{ width: "100%", height: "100%" }}>
                        <div className="loader" style={this.props.style}>
                        </div>
                    </div>
                )}
            </Spring>
        );
    }


}