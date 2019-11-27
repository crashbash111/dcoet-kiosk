import React from "react";
import Loader from "../Loader";
import { Redirect } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);

        //holds config for rendering tiles
        this.state = {
            fadeTime: "0.1s",
            defaultBackColour: ["#3491BF", "#226080", "#45C1FF", "#113040", "#3DADE6"],
            baseImagePath: "./storage/kiosk_images/",
        };
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        //selects random image for tile if not already specified
        let path = "";
        let x = -1;
        if (!this.props.imgOverride) {
            if (this.props.item.images.length > 0) {
                x = this.getRandomInt(0, this.props.item.images.length - 1);
                path = this.state.baseImagePath + (this.props.item.images[x].thumbnail_large != null ? this.props.item.images[x].thumbnail_large : this.props.item.images[x].image_name);
            }
        }
        else {
            //path = this.state.baseImagePath + this.props.imgOverride;
            path = this.props.imgOverride;
        }
        //returns random back colour (in event images do not load)
        let backgroundColourIndex = this.getRandomInt(0, this.state.defaultBackColour.length - 1);

        return (
            // <Spring key={this.props.item.id} from={{ opacity: 0, transform: "translateY(20px)" }} to={{ opacity: 1, transform: "translateY(0px)" }}></Spring>
            // <Spring key={this.props.item.id} from={{ opacity: 0 }} to={{ opacity: 1 }}>
            //     {paramx => (
                    <a style={{ textDecoration: "none" }} href={ this.props.linkOverride != null ? this.props.linkOverride : `#/kiosk/${this.props.item.id}` }>
                        <div key={this.props.item.id} data-role="tile" data-cover={path} data-size="large"
                            style={{
                                // opacity: paramx.opacity, transform: paramx.transform, transition: this.state.fadeTime,
                                backgroundColor: this.state.defaultBackColour[backgroundColourIndex]
                            }}>
                            {
                                this.props.flag == "ppt" ?
                                    <h3 style={{ textShadow: "2px 2px #111111" }}>{this.props.item.title}</h3>
                                    :
                                    <h3 style={{ textShadow: "2px 2px #111111" }}>{this.props.flag == "game" ? this.props.item.name : this.props.flag == "video" ? this.props.item.title : this.props.item.heading}</h3>
                            }
                            {/* <span class="branding-bar">{this.props.category}</span> */}
                        </div>
                    </a>
                // )}
            // </Spring>
        )
    }
}