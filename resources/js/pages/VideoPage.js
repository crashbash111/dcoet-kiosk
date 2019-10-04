import React from "react";

export default class VideoPage extends React.Component {
    constructor( props )
    {
        super( props );

        this.state = {
            videoId: this.props.match.params.id,
            video: null,
        };

        this.video = React.createRef();
    }

    componentDidMount()
    {
        console.log( this.video );

        fetch( "./api/videos/" + this.state.videoId )
        .then( response => response.json() )
        .then( data => { this.setState( { video: data } ) } );

        fetch( "./api/videos/" + this.state.videoId + "/stream" )
        .then( stream => {
            try
            {
                this.video.srcObject = stream;
            }
            catch( err )
            {
                this.video.current.src = stream.url;
            }
        })
        .catch( err => {
            throw new Error( `Unable to fetch stream ${err}` );
        });
    }

    render()
    {
        return (this.state.video == null ? <div>
            Loading...
        </div>
        : <div>
            <h1>{ this.state.video.title }</h1>
            <video style={{ width: "100px" }} ref={ this.video } controls></video>
            <p>{ this.state.video.description }</p>
            <p><i>Running time: approx: {this.state.video.length } seconds</i></p>
            <p>Copyright: {this.state.video.copyright }</p>
        </div>
        );
    }
}