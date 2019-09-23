import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Spring } from 'react-spring/renderprops';
import { Palette } from 'react-palette';

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
            sideSize: "45",
        };

        this.fade = this.fade.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });

        let { id } = this.props.match.params;

        fetch("./pages/" + id)
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
                                    //<div>
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
                                                filter: "color blur(18px)",
                                                height: "100vh",
                                                width: this.state.sideOpen ? this.state.sideSize + "vh" : "0px",
                                                padding: this.state.sideOpen ? "10px 10px 10px 10px" : "10px 0px 10px 0px",
                                                overflowY: "scroll",
                                                overflowX: "hidden",
                                                opacity: "0.8",
                                                transition: this.state.transitionTime,//"background-color " + this.state.transitionTime + ", color " + this.state.transitionTime + ", width: " + this.state.transitionTime,
                                                backgroundColor: !palette.loading ? palette.data.lightVibrant : "#363636",
                                                color: !palette.loading ? palette.data.darkMuted : "white",
                                            }}>
                                            <h1 style={{ textAlign: "center", fontSize: "4em" }}>{this.state.page.heading}</h1>
                                            <div style={{ textAlign: "center" }}>
                                                <Link to="/" className="btn btn-lg btn-light"
                                                    style={{
                                                        transition: "background-color " + this.state.transitionTime + ", color " + this.state.transitionTime,
                                                        backgroundColor: palette.loading ? "lightgray" : palette.data.darkMuted,
                                                        color: palette.loading ? "black" : palette.data.lightVibrant,
                                                        width: "160px",
                                                    }}
                                                    role="button">Back to Home</Link>
                                            </div>
                                            {this.state.page.stats.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>{statTableItems}</div> : null}
                                            {this.state.page.audios.length > 0 ? <div>Audios<div>{audioItems}</div></div> : null}
                                            <p style={{ fontSize: "25px", width: this.state.sideSize - 3 + "vh", display: "block" }}>{this.state.page.text}</p>
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