import React from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "../components/Loader";
import VideoPlayer from "../components/VideoPlayer";
import "video.js/dist/video-js.css";
import ErrorCatch from "../components/ErrorCatch";
import { thisExpression } from "@babel/types";

class VideoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: -1,
            video: null,
            showMore: false,
            error: false,
            width: window.innerWidth,
        };

        this.video = React.createRef();

        this.toggleDescription = this.toggleDescription.bind(this);
        // this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {

        // window.addEventListener('resize', this.handleWindowResize);

        this.setState({ videoId: this.props.match.params.id });

        fetch("./api/videos/" + this.props.match.params.id)
            .then(response => response.json())
            .then(data => { this.setState({ video: data }) })
            .catch(error => { console.log(error); this.setState({ error: true }) });

        // fetch("./api/videos/" + this.state.videoId + "/stream")
        //     .then(stream => {
        //         try {
        //             this.video.srcObject = stream;
        //         }
        //         catch (err) {
        //             try {
        //                 this.video.current.src = stream.url;
        //             }
        //             catch (ex) {
        //                 console.log(ex);
        //                 this.setState( {error: true});
        //             }
        //         }
        //     })
        //     .catch(err => {
        //         console.log(Error(`Unable to fetch stream ${err}`));
        //         this.setState( {error: true});
        //     });

        // var myVar = setInterval(() => {
        //     let error = false;
        //     fetch("./api/videos/" + this.state.videoId + "/stream")
        //         .then(stream => {
        //             try {
        //                 this.video.srcObject = stream;
        //             }
        //             catch (err) {
        //                 var my = setInterval(() => {
        //                     let e = false;

        //                     try {
        //                         this.video.current.src = stream.url;
        //                     }
        //                     catch (ex) {
        //                         e = true;
        //                         console.log(ex);
        //                     }
        //                     if (!e) {
        //                         clearInterval(my);
        //                     }
        //                 }, 100);

        //             }
        //         })
        //         .catch(err => {
        //             error = true;
        //             console.log(Error(`Unable to fetch stream ${err}`));
        //         });
        //     if (!error) {
        //         clearInterval(myVar);
        //     }
        // }, 100);
    }

    componentDidCatch(error) {
        alert("An error has occurred.");
        window.location = "/";
    }

    toggleDescription() {
        this.setState((prevState) => {
            return {
                showMore: !prevState.showMore
            };
        });
    }

    //handles page resizing for dynamic layouts
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.handleWindowResize);
    // }

    // componentDidCatch(error, info) {
    //     this.setState({ hasError: true });
    // }

    // handleWindowResize() {
    //     console.log("resize");
    //     this.setState({ width: window.innerWidth });
    // }

    render() {
        if (this.state.error) {
            return <ErrorCatch error={true} newUrl="/">

            </ErrorCatch>
        }

        let w = 0;

        if (this.state.width < 300) {
            w = 150;
        }
        else if (this.state.width < 500) {
            w = 250;
        }
        else if (this.state.width < 700) {
            w = 350;
        }
        else if (this.state.width < 900) {
            w = 450;
        }
        else if (this.state.width < 1200) {
            w = 600;
        }
        else if (this.state.width < 2000) {
            w = 1000;
        }
        const videoJsOptions = {
            autoplay: false,
            controls: true,
            width: `${w}px`,
            sources: [{
                src: "./api/videos/" + this.state.videoId + "/stream",
                type: 'video/mp4'
            }],
            hideControls: ["seekbar"],
        }

        if (this.state.video == null) {
            return <Loader />
        }

        return <div style={{ width: "100%", height: "100%", padding: "20px" }}>
            <img onClick={ (event) => { this.props.history.push( "/-3" )} } style={{ zIndex: 1, cursor: "pointer", position: "absolute", top: "10px", left: "10px", height: "7%" }} src="/images/back-arrow-white.png" />
            {/* <div style={{ width: `${w}px`}}>
            </div> */}
            <div style={{ height: "calc( 7% + 10px )" }}></div>
            <div style={{ width: `calc( ${w}px + 50px )` }}>
                <VideoPlayer {...videoJsOptions} />
                <h1 style={{ display: "inline" }}>{this.state.video.title}</h1>
                <h5>Uploaded {this.state.video.created_at}</h5>
                {/* <p>{this.state.video.description}</p> */}
                <div>
                    {this.state.video.description.length > 50 ?
                        this.state.showMore ?
                            <div>
                                <p>{this.state.video.description}</p>
                                <hr />
                                <p onClick={ (event) => { this.toggleDescription()} } style={{ cursor: "pointer" }}><strong>Show Less</strong></p>
                            </div>
                            :
                            <div>
                                <p>{this.state.video.description.substring(0, 47) + "..."}</p>
                                <hr />
                                <p onClick={ (event) => { this.toggleDescription()} } style={{ cursor: "pointer" }}><strong>Show More</strong></p>
                            </div>
                        :
                        <div>
                            <p>{this.state.video.description}</p>
                            <hr />
                        </div>
                    }
                </div>
            </div>

            {/* <p>{this.state.video.description.length > 50 && !this.state.showMore ? this.state.video.description.substring(0, 47) + "..." : this.state.video.description}</p>
            {
                this.state.video.description.length > 50 ? <button onClick={(event) => { this.toggleDescription() }}>{this.state.showMore ? "Show Less" : "Show More"}</button> : null
            } */}
        </div>;


        return (this.state.video == null ? <Loader />
            : <div>
                <Link to={`/`} className="returns"
                    style={{
                        //backgroundColor: !palette.loading ? palette.data.darkMuted : "#141414",
                        padding: "8px 8px 8px 8px",
                        width: "100px",
                        display: "inline",
                        textDecoration: "none",
                        fontSize: "25px",
                    }} >&#8592; Back to Home</Link>
                <h1 style={{ display: "inline", paddingLeft: "40px" }}>{this.state.video.title}</h1>
                <video style={{ width: "100px" }} ref={this.video} controls></video>
                <p>{this.state.video.description}</p>
                <p><i>Running time: approx: {this.state.video.length} seconds</i></p>
                <p>Copyright: {this.state.video.copyright}</p>
            </div>
        );
    }
}

export default withRouter(VideoPage);