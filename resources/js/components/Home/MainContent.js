import React from "react";
import Loader from "../Loader";
import { Redirect } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';

export default class MainContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
            games: [],
            redirectId: -1,
            redirect: false,
        };

        //shows config for rendering tiles
        this.tileConfig = {
            fadeTime: "0.1s",
            defaultBackColour: "#2794C3",
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("./pages/all")
            .then(response => response.json())
            .then(data => this.setState({ pages: data }));

        fetch("./allGames")
            .then(response => response.json())
            .then(data => this.setState({ games: data, loading: false }));

        //console.log(this.state.games);
    }

    fetchData() {

    }

    handleClick(i) {
        this.setState({ redirectId: i, redirect: true });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {

        if (this.state.redirect) {
            let target = "/kiosk/1/" + this.state.redirectId;
            return <Redirect to={target} />
        }

        // if (this.props.activeCategory == -1) {
        //     return (
        //         <div className="homeslideshow">
        //             <video loop={true} autoPlay={true}>
        //                 <source type="video/mp4" data-reactid=".0.1.0.0.0" src="./storage/kiosk_images/181129_DC_Banner_Video_Cropped.mp4"/>
        //             </video>
        //         </div>
        //     );
        // }

        if (this.state.pages == null) {
            return (
                <div>Main Content</div>
            );
        }
        else {
            if (this.state.loading) {
                return (
                    <Loader />
                )
            }
            else {

                if (this.props.activeCategory == 999) {
                    var gamesList = this.state.games.map(item => {
                        //console.log(item.img);
                        return (
                            <div key={item.id} onClick={() => window.open("../Resources/Game/index.html", "_blank")} data-role="tile" data-cover="./Game/assets/images/background.png" data-size="large" style={{ backgroundColor: "black" }}>
                                <h3 style={{ textShadow: "2px 2px #111111" }}>{item.Name}</h3>
                            </div>
                        );
                    });

                    return (
                        <div style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>

                            {gamesList}

                        </div>

                    );
                }

                //renders each individual tile
                var pagesList = this.state.pages.map(item => {
                    if (this.props.filter != "") {
                        if (!item.heading.toLowerCase().includes(this.props.filter.toLowerCase())) {
                            return null;
                        }
                    }
                    else if (this.props.activeCategory != item.category_id) {
                        return null;
                    }

                    let x = -1;
                    let path = "";
                    if (item.images.length > 0) {
                        x = this.getRandomInt(0, item.images.length - 1);
                        path = "./storage/kiosk_images/" + item.images[x].image_name;
                    }
                    //console.log(x);
                    return (
                        <Spring key={item.id} from={{ opacity: 0, transform: "translateY(20px)" }} to={{ opacity: 1, transform: "translateY(0px)" }}>
                            {paramx => (
                                <div key={item.id} onClick={() => this.handleClick(item.id)} data-role="tile" data-cover={x != -1 ? path : ""} data-size="large"
                                    style={{ 
                                        opacity: paramx.opacity, transform: paramx.transform, transition: this.tileConfig.fadeTime,
                                        backgroundColor: this.tileConfig.defaultBackColour 
                                    }}>
                                    <h3 style={{ textShadow: "2px 2px #111111" }}>{item.heading}</h3>
                                </div>
                            )}
                        </Spring>
                    );
                    let images;
                    if (item.images.length < 2) {
                        let imgNameNew;
                        images = item.images.map(img => {
                            let imgName = "./storage/kiosk_images/" + img.image_name;
                            imgNameNew = imgName;
                            console.log(imgName);
                            return (
                                <div key={img.id} className="slide" data-cover={imgName}><h3 style={{ textShadow: "2px 2px #111111" }}>{item.heading}</h3></div>

                            );
                        });
                        images.push(<div className="slide" data-cover={imgNameNew}><h3 style={{ textShadow: "2px 2px #111111" }}>{item.heading}</h3></div>);
                    }
                    else {
                        images = item.images.map(img => {
                            let imgName = "./storage/kiosk_images/" + img.image_name;
                            console.log(imgName);
                            return (
                                <div key={img.id} className="slide" data-cover={imgName}><h3 style={{ textShadow: "2px 2px #111111" }}>{item.heading}</h3></div>
                            );
                        });
                    }
                    return (
                        <div onClick={() => this.handleClick(item.id)} data-role="tile" data-effect="animate-fade" data-size="large" style={{ backgroundColor: "green" }}>
                            {images}
                        </div>
                    );
                });

                //Making the main content view have a grid of tiles
                return (
                    <div className="no-scrollbar" style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                        {pagesList}
                    </div>
                );
            }
        }
    }
}