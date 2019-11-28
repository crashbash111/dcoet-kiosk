'use strict';

import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Spring } from 'react-spring/renderprops';
import { useSpring, animated, interpolate } from 'react-spring';
import { Palette } from 'react-palette';
import { useGesture } from 'react-with-gesture';
import { withRouter } from "react-router-dom";

import Slider from "../components/Slider";
import ErrorCatch from "../components/ErrorCatch";

class KioskPage extends React.Component {

    constructor(props) {
        super(props);

        const betterColours = [
            [
                "rgba( 54, 54, 54, 0.8 )",
                "rgba( 1, 1, 1, 0.8 )"
            ],
            [
                "rgba(1, 35, 69, 0.8)",
                "rgba(0, 18, 52, 0.8)"
            ],
        ];

        //const colours = [ "#363636", "#010101", "#012345" ];

        this.state = {
            loading: true,
            page: {},
            index: 0,
            transitionTime: "0.5s",
            imgPath: "",
            sideOpen: true,
            sideSize: "25",
            sidebarColor: "",
            playingIndex: -1,
            currentAudio: null,
            randomColour: betterColours[Math.floor(Math.random() * betterColours.length)],
            rotate: false,
            toggle: false,
        };

        console.log(this.state.randomColour);

        this.fade = this.fade.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.slideTransitionEnd = this.slideTransitionEnd.bind(this);
        this.startPlaying = this.startPlaying.bind(this);
        this.rotateDone = this.rotateDone.bind(this);

        this.sliderRef = React.createRef();
        //this.triangleRef = React.createRef();
    }

    rotateDone() {
        this.setState(function (state) {
            return {
                toggle: !state.toggle,
                rotate: false
            };
        });
    }

    componentDidMount() {
        //const triangleRef = this.triangleRef;
        //triangleRef.addEventListener("animationend", this.rotateDone);
        this.setState({ loading: true });
        let { id } = this.props.match.params;
        //console.log(id);
        fetch("./api/pages/" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({ page: data, loading: false });
                this.state.page.images.forEach((picture) => {
                    new Image().src = "./storage/kiosk_images/" + picture.image_name;
                    //console.log("preloaded!");
                });
            })
            .catch(error => { console.log(error); this.setState({ error: true }); });
    }

    componentWillUnmount() {
        //const triangleRef = this.triangleRef;
        //triangleRef.removeEventListener("animationend", this.rotateDone);
    }

    handleClick(event) {
        this.setState(prevState => {
            return (
                { index: (this.state.index + 1) % this.state.page.images.length }
            );
        });
    }

    fade() {
        this.setState(prevState => {
            return (
                { opacity: prevState.opacity - 0.04 }
            );
        });
    }

    slideTransitionEnd(index, elem) {
        this.setState({ index: index });
    }

    startPlaying(i) {
        // console.log( i );
        if (this.state.playingIndex == -1) {
            var aud = this.state.page.audios.find(m => m.id = i);
            var audio = new Audio(`./storage/audio_files/${aud.filepath}`);
            audio.play();
            audio.onended = function () { audio = null; this.setState({ currentAudio: null, playingIndex: -1 }) }
            // console.log( new Audio( `./storage/audio_files/${this.state.page.audios[0].filepath}` ) );
            this.setState({ playingIndex: i, currentAudio: audio });
        }
        // else if( this.state.playingIndex != i )
        // {
        //     this.state.currentAudio.pause();
        //     var aud = this.state.page.audios.find( m => m.id = i );
        //     var audio = new Audio(`./storage/audio_files/${aud.filepath}`);
        //     audio.play();
        //     audio.onended = function () { audio = null; this.setState({ currentAudio: null, playingIndex: -1 }) }.bind(this)
        //     // console.log( new Audio( `./storage/audio_files/${this.state.page.audios[0].filepath}` ) );
        //     this.setState({ playingIndex: i, currentAudio: audio });
        // }
        // else
        // {
        //     this.state.currentAudio.pause();
        //     this.setState({ currentAudio: null, playingIndex: -1 });
        // }
    }

    render() {

        if (this.state.error) {
            return <ErrorCatch error={true} newUrl="/"></ErrorCatch>
        }

        let swipeE1;

        if (this.state.loading) {
            return (
                <Loader />
            );
        }
        else {
            let imgPath;
            let dotimgnav = null;
            try //try
            {
                // imgPath = "./storage/kiosk_images/" + (this.state.page.images[this.state.index].thumbnail_large != null ? this.state.page.images[this.state.index].thumbnail_large : this.state.page.images[this.state.index].image_name);
                imgPath = "./storage/kiosk_images/" + this.state.page.images[this.state.index].image_name;
                let i = -1;
                dotimgnav = this.state.page.images.map(item => {
                    i++;
                    return (
                        <span key={i} index={item.id} className="dotimagenav" style={{
                            backgroundColor: i == this.state.index ? "white" : "darkgray",
                            transition: this.state.transitionTime,
                            opacity: i == this.state.index ? "1" : "0.8",
                        }}></span>
                    );
                })
                console.log(imgPath);
            }
            catch (e) //catch
            {
                this.setState({ error: true });
                console.error(e.message); //console log error
            }

            let statTableItems = this.state.page.stats.map(item => {
                return (
                    <div key={item.id}>
                        <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                        <p style={{ textAlign: "center" }}>{item.value}</p>
                    </div>
                );
            });

            let h = 0;
            console.log(this.state);
            let audioItems = this.state.page.audios.map(item => {
                let filePath = "./storage/audio_files/" + item.filepath;
                return (
                    <div key={item.id}>
                        <a style={{ display: "inline" }} onClick={(event) => { if (this.state.playingIndex == item.id) { this.state.currentAudio.pause(); this.setState({ currentAudio: null, playingIndex: -1 }) } else { if (this.state.currentAudio != null) { this.state.currentAudio.pause(); this.setState({ currentAudio: null, playingIndex: -1 }) }; var aud = new Audio(filePath); aud.play(); this.setState({ playingIndex: item.id, currentAudio: aud }); aud.onended = (event) => { this.setState({ playingIndex: -1, currentAudio: null }) } } }}>{this.state.playingIndex == item.id ? <img style={{ display: "inline" }} src="images/stop-white.png" width="50%" /> : <img style={{ display: "inline" }} src="images/play-white.png" width="50%" />}</a>
                    </div>
                )
            });

            // return (
            //     <div style={{ width: "100%", height: "100%", position: "absolute" }}>
            //         <Slider />
            //     </div>
            // );

            let longDescParts;

            if( this.state.page.longdesc != null )
            {
                longDescParts = this.state.page.longdesc.split( "<br>" );
            }

            let c = 0;
            return (
                <ErrorCatch error={this.state.error} newUrl="/">
                    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                        {props => {
                            let c = 0;
                            let f = 0;
                            return <div key={c++} className="hideScroll fixTransitions" style={props}>
                                <Palette src={imgPath}>
                                    {(palette) => (
                                        <div key={f++}>
                                            <img onClick={(event) => { this.props.history.push(`/${this.state.page.category_id}`) }} style={{ display: this.state.sideOpen ? "none" : "block", transition: "opacity 1s ease-in-out", position: "absolute", bottom: "10px", left: "10px", height: "7%", zIndex: 10 }} src="images/back-arrow-white.png" />
                                            <div style={{ width: "100%", height: "100%", position: "absolute" }}>
                                                <Slider slideTransitionEnd={this.slideTransitionEnd} draggable={true} startIndex={this.state.index} items={this.state.page.images} sliderRef={this.sliderRef} />
                                            </div>
                                            {/* <div onClick={this.handleClick}
                                            scr={imgPath}
                                            onError={() => this.div.style = { backgroundImage: "url(' ./storage/ui/err.png ')" }}
                                            style={{
                                                //styling for the background
                                                backgroundImage: "url(' " + imgPath + "')",
                                                backgroundColor: !palette.loading ? palette.data.darkMuted : "#141414",
                                                opacity: this.state.opacity,
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                                transition: this.state.transitionTime,//"background-image " + this.state.transitionTime + ", background-color " + this.state.transitionTime,
                                            }} > */}
                                            <div className="hideScroll"
                                                style={{
                                                    //styling for the side panel
                                                    height: "100vh",
                                                    width: this.state.sideOpen ? this.state.sideSize + "vw" : "0px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    overflowY: "hidden",
                                                    overflowX: "hidden",
                                                    // opacity: "0.8",
                                                    transition: this.state.transitionTime,//"background-color " + this.state.transitionTime + ", color " + this.state.transitionTime + ", width: " + this.state.transitionTime + ", left: " + this.state.transitionTime,
                                                    backgroundColor: this.state.randomColour[0],
                                                    color: "white",
                                                    zIndex: 11,
                                                }}>

                                                <h1 style={{ textAlign: "center", padding: "20px", fontSize: "4em", display: "block", width: "100%", opacity: "1" }}>{this.state.page.heading}</h1>


                                                <div className="hideScroll" style={{
                                                    overflowY: "scroll",
                                                    width: "100%",
                                                    flex: "1",
                                                    padding: this.state.sideOpen ? "10px 20px 30px 20px" : "10px 0px 30px 0px",
                                                    background: `linear-gradient(0deg, ${this.state.randomColour[1]} 40px, transparent 100px)`,
                                                }}>
                                                    {this.state.page.stats.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>{statTableItems}</div> : null}
                                                    <br />
                                                    <br />
                                                    {this.state.page.audios.length > 0 ? <div><h2>Audio</h2><div style={{ display: "grid", gridTemplateColumns: "auto auto auto", justifyContent: "space-evenly" }}>{audioItems}</div></div> : null}
                                                    <br />
                                                    <br />
                                                    <p style={{
                                                        fontSize: "28px",
                                                        textAlign: "left",
                                                        paddingBottom: "5px",
                                                    }}>{this.state.page.shortdesc}
                                                    </p>
                                                    <br />
                                                    <br />
                                                    <p style={{
                                                        fontSize: "18px",
                                                        textAlign: "justify",
                                                        paddingBottom: "50px",
                                                    }}>{ longDescParts != null && longDescParts.length > 1 ?
                                                        longDescParts.map( part => {
                                                            return <span>{part}<br /></span>
                                                        })
                                                        :
                                                        this.state.page.longdesc
                                                    }
                                                    </p>
                                                </div>
                                                <a onClick={(event) => { this.props.history.push(`/${this.state.page.category_id}`) }} className="returns"
                                                    style={{
                                                        color: "white",
                                                        padding: "8px 8px 8px 32px",
                                                        width: this.state.sideSize + "vw",
                                                        display: "block",
                                                        bottom: "0px",
                                                        position: "absolute",
                                                        textDecoration: "none",
                                                        fontSize: "25px",
                                                        transition: this.state.transitionTime,
                                                        backgroundImage: "linear-gradient( 0deg, black, rgba( 0, 0, 0, 0 )"
                                                    }} >&#8592; Back to Home</a>
                                            </div>

                                            {/* </div> */}
                                            <div onClick={() => { this.setState({ sideOpen: !this.state.sideOpen }) }} style={{
                                                backgroundColor: this.state.randomColour[0],//"background-color " + this.state.transitionTime + ", color " + this.state.transitionTime + ", width: " + this.state.transitionTime,
                                                color: "white",
                                                position: "absolute",
                                                top: "calc(50% - 60px)",
                                                borderRadius: "0px 15px 15px 0px",
                                                width: "45px",
                                                height: "120px",
                                                // opacity: "0.8",
                                                transition: this.state.transitionTime,
                                                left: this.state.sideOpen ? this.state.sideSize + "vw" : "0px",
                                            }}>
                                                <h1 style={{
                                                    textAlign: "center",
                                                    padding: "50% 0px 50% 0px",
                                                }}><img src={ this.state.toggle ? "/images/triangle-white-r.png" : "/images/triangle-white.png" } style={{ width: "100%" }}
                                                    // ref={ elm => { this.triangleRef = elm } }
                                                    onAnimationEnd={ (event) => { this.rotateDone() }}
                                                    onClick={(event) => this.setState({ rotate: true })}
                                                    className={ this.state.rotate ? "rotate" : ""}
                                                    /></h1>
                                            </div>

                                            {/* Image dot navigation */}
                                            <div style={{
                                                position: "absolute",
                                                bottom: "10px",
                                                left: "50%",
                                            }}>
                                                {dotimgnav}
                                            </div>

                                            {/* Copyright Information */}
                                            <div style={{
                                                position: "absolute",
                                                right: "10px",
                                                bottom: "10px",
                                                textAlign: "right",
                                            }}>
                                                <p style={{
                                                    color: "white",
                                                    margin: "0px",
                                                    backgroundColor: "rgba(0,0,0,.6)",
                                                    opacity: this.state.page.images[this.state.index].copyright == null || this.state.page.images[this.state.index].copyright == "" || this.state.page.images[this.state.index].copyright == "null" ? "0" : "1",
                                                    padding: "10px",
                                                    //transition: "opacity 0.2s",
                                                    fontSize: "18px",
                                                }}>
                                                    {/* &copy;*/} {this.state.page.images[this.state.index].copyright}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </Palette>

                            </div>
                        }}
                    </Spring>
                </ErrorCatch>
            );
        }
    }

    setBackupImg(event) {
        console.log("error called");
        event.style.backgroundImage = "url(' ./storage/ui/err.png ')";
    }
}

export default withRouter(KioskPage);