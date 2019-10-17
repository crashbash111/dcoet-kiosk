import React from "react";
import { Link, withRouter } from "react-router-dom";
import Loader from "../components/Loader";

class VideoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: this.props.match.params.id,
            video: null,
        };

        this.video = React.createRef();
    }

    componentDidMount() {
        console.log(this.video);

        fetch("./api/videos/" + this.state.videoId)
            .then(response => response.json())
            .then(data => { this.setState({ video: data }) });

        var myVar = setInterval(() => {
            let error = false;
            fetch("./api/videos/" + this.state.videoId + "/stream")
                .then(stream => {
                    try {
                        this.video.srcObject = stream;
                    }
                    catch (err) {
                        var my = setInterval(() => {
                            let e = false;

                            try
                            {
                                this.video.current.src = stream.url;
                            }
                            catch( ex )
                            {
                                e = true;
                                console.log( ex );
                            }
                            if( !e )
                            {
                                clearInterval( my );
                            }
                        }, 100 );

                    }
                })
                .catch(err => {
                    error = true;
                    console.log(Error(`Unable to fetch stream ${err}`));
                });
            if (!error) {
                clearInterval(myVar);
            }
        }, 100);


    }

    render() {
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