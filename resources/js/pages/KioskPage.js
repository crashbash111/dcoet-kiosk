import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Spring } from 'react-spring/renderprops';
import { useSpring, animated, interpolate } from 'react-spring';
import { Palette } from 'react-palette';
import { useGesture } from 'react-with-gesture';
import { blockStatement, whileStatement } from "@babel/types";

export default class KioskPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            page: {},
            index: 0,
            transitionTime: "0.5s",
            imgPath: "",
            sideOpen: true,
            sideSize: "25",
            sidebarColor: "",
        };

        this.fade = this.fade.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.slider = this.slider.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });

        let { id } = this.props.match.params;

        fetch("./api/pages/" + id)
            .then(response => response.json())
            .then(data => this.setState({ page: data, loading: false }));
    }

    handleClick(event) {
        {/*var t = setInterval(this.fade, 10);
        setTimeout(() => {
            clearInterval(t);
            this.setState({ opacity: 1 });
            this.setState(prevState => {
                return (
                    { index: (this.state.index + 1) % this.state.page.images.length }
                );
            });
        }, 250);*/}
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

    slider(bg,{ children }) {
        const [bind, { delta, down }] = useGesture()
        const { x } = useSpring({
            x: down ? delta[0] : 0,
            immediate: name => down && name === 'x'
        })
        //const avSize = x.interpolate({ map: Math.abs, range: [50, 300], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' })
        return (
            <animated.div {...bind()} className="item" onClick={() => { this.setState({ sideOpen: !this.state.sideOpen }) }} style={{
                position: "absolute",
                //backgroundColor: bg,
                top: "calc(50% - 60px)",
                borderRadius: "0px 15px 15px 0px",
                width: "45px",
                height: "120px",
                opacity: "0.8",
                //transition: this.state.transitionTime,
                left: this.state.sideOpen ? this.state.sideSize + "vw" : "0px",
                transform: interpolate([x], (x) => `translateX(${x}px)`),
            }}>
                {children}

            </animated.div>
        )
    }

    render() {

        if (this.state.loading) {
            return (
                <Loader />
            );
        }
        else {
            let imgPath;
            try //try
            {
                imgPath = "./storage/kiosk_images/" + this.state.page.images[this.state.index].image_name;
            }
            catch (e) //catch
            {
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

            let audioItems = this.state.page.audios.map(item => {
                let filePath = "./storage/audio_files/" + item.filepath;
                return (
                    <div key={item.id}>
                        <embed src={filePath} />
                    </div>
                )
            });




            return (
                <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                    {props => (
                        <div className="hideScroll fixTransitions" style={props}>
                            <Palette src={imgPath}>
                                {(palette) => (
                                    <div>
                                        <div onClick={this.handleClick}
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
                                            }} >
                                            <div className="hideScroll"
                                                style={{
                                                    //styling for the side panel
                                                    //filter: "color blur(60px)",
                                                    height: "100vh",
                                                    width: this.state.sideOpen ? this.state.sideSize + "vw" : "0px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    overflowY: "hidden",
                                                    overflowX: "hidden",
                                                    opacity: "0.8",
                                                    transition: this.state.transitionTime,//"background-color " + this.state.transitionTime + ", color " + this.state.transitionTime + ", width: " + this.state.transitionTime,
                                                    backgroundColor: !palette.loading ? palette.data.lightVibrant : "#363636",
                                                    color: !palette.loading ? palette.data.darkMuted : "white",
                                                }}>

                                                <h1 style={{ textAlign: "center", fontSize: "4em", display: "block", width: "100%" }}>{this.state.page.heading}</h1>


                                                <div className="hideScroll" style={{
                                                    overflowY: "scroll",
                                                    width: "100%",
                                                    flex: "1",
                                                    padding: this.state.sideOpen ? "10px 20px 30px 20px" : "10px 0px 30px 0px",
                                                    background: "linear-gradient(0deg, " + (!palette.loading ? palette.data.darkMuted : "#141414") + " 40px, transparent 100px)",
                                                }}>
                                                    {this.state.page.stats.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>{statTableItems}</div> : null}
                                                    {this.state.page.audios.length > 0 ? <div>Audios<div>{audioItems}</div></div> : null}
                                                    <p style={{
                                                        fontSize: "28px",
                                                        textAlign: "left",
                                                        paddingBottom: "50px",
                                                        //width: this.state.sideSize - 3 + "vw",
                                                        // overflowX: "hidden",
                                                    }}>{this.state.page.text}
                                                    </p>
                                                </div>
                                                <Link to= { `/${this.state.page.category_id}` } className="returns"
                                                    style={{
                                                        //backgroundColor: !palette.loading ? palette.data.darkMuted : "#141414",
                                                        color: palette.loading ? "white" : palette.data.lightVibrant,
                                                        padding: "8px 8px 8px 32px",
                                                        width: this.state.sideSize + "vw",
                                                        display: "block",
                                                        bottom: "0px",
                                                        position: "absolute",
                                                        textDecoration: "none",
                                                        fontSize: "25px",
                                                        transition: this.state.transitionTime,
                                                    }} >&#8592; Back to Home</Link>
                                            </div>

                                        </div>

                                        <this.slider >
                                            <div style={{
                                                backgroundColor: !palette.loading ? palette.data.lightVibrant : "#363636",//"background-color " + this.state.transitionTime + ", color " + this.state.transitionTime + ", width: " + this.state.transitionTime,
                                                color: !palette.loading ? palette.data.darkMuted : "white",
                                            }}>
                                                <h1 style={{
                                                    textAlign: "center",
                                                    padding: "50% 0px 50% 0px",
                                                }}>&lt;</h1>
                                            </div>
                                        </this.slider>

                                        <div style={{
                                            position: "absolute",
                                            right: "10px",
                                            bottom: "10px",
                                            textAlign: "right",
                                        }}>
                                            {/*<button onClick={() => { this.setState({ sideOpen: !this.state.sideOpen }) }} className="btn btn-lg btn-light"
                                                style={{
                                                    transition: "background-color " + this.state.transitionTime + ", color " + this.state.transitionTime,
                                                    backgroundColor: palette.loading ? "lightgray" : palette.data.darkMuted,
                                                    color: palette.loading ? "black" : palette.data.lightVibrant,
                                                    width: "160px",
                                                    margin: "0px 0px 10px 0px",
                                                }}
                                            role="button">Toggle Sidebar</button>*/}
                                            <p style={{
                                                color: "white",
                                                margin: "0px",
                                                backgroundColor: "rgba(0,0,0,.6)",
                                                opacity: this.state.page.images[this.state.index].copyright == null || this.state.page.images[this.state.index].copyright == "" || this.state.page.images[this.state.index].copyright == "null" ? "0" : "1",
                                                padding: "10px",
                                                transition: "opacity " + this.state.transitionTime,
                                            }}>
                                                &copy; {this.state.page.images[this.state.index].copyright}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Palette>

                        </div>
                    )}
                </Spring>
            );
        }
    }

    setBackupImg(event) {
        console.log("error called");
        event.style.backgroundImage = "url(' ./storage/ui/err.png ')";
    }
}