import React from "react";

export default class VideoPage extends React.Component {
    constructor( props )
    {
        super( props );

        this.state = {

        };
        this.video = React.createRef();
    }

    componentDidMount()
    {
        console.log( this.video );

        fetch( "./video" )
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
        return <div>
            <video style={{ width: "100px" }} ref={ this.video } controls></video>
        </div>
    }
}