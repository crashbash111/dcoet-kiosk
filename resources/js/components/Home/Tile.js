import React from "react";
import Loader from "../Loader";
import { Redirect } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }



    render() {

        

        return (
            <Spring key={this.props.item.id} from={{ opacity: 0, transform: "translateY(20px)" }} to={{ opacity: 1, transform: "translateY(0px)" }}>
                {paramx => (
                    <div key={this.props.item.id} onClick={() => this.handleClick(this.props.item.id)} data-role="tile" data-cover={this.props.x != -1 ? this.props.path : ""} data-size="large"
                        style={{
                            opacity: paramx.opacity, transform: paramx.transform, transition: this.props.tileConfig.fadeTime,
                            backgroundColor: this.props.tileConfig.defaultBackColour
                        }}>
                        <h3 style={{ textShadow: "2px 2px #111111" }}>{this.props.item.heading}</h3>
                    </div>
                )}
            </Spring>
        )
    }
}