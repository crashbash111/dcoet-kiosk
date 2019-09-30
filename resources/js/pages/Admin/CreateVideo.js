import React from "react";
import Axios from "axios";

export default class CreateVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            video: null,
            copyright: "",
            length: -1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.postData = this.postData.bind(this);
        this.loadMetaData = this.loadMetaData.bind(this);
        this.submit = this.submit.bind( this );

        this.video = React.createRef();
    }

    handleChange(event) {
        let { name, value, files } = event.target;

        if (name != "video") {
            this.setState({ [name]: value });
        }
        else {
            this.setState({ [name]: files[0] });
        }

        console.log(this.state);
    }

    postData( duration ) {
        let formData = new FormData();

        if (this.state.title.length < 3 || this.state.description.length < 3 || this.video == null || this.video.current == null || this.video.current.files == null || this.video.current.files.length < 1) {
            return;
        }

        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("copyright", this.state.copyright);
        formData.append("length", duration);

        formData.append("video", this.video.current.files[0], this.video.current.files[0].name);

        Axios({
            url: "./videos", //+ (this.state.editMode ? "/" + this.props.match.params.id : "")
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                this.setState({ redirect: true });
            })
            .catch(err => console.log(err.response.data));
    }

    loadMetaData(video) {

        window.URL.revokeObjectURL(video.src);
        var duration = video.duration;
        duration = Math.round(duration);

        console.log(duration);
        return;

        this.postData(duration);
    }

    submit(video) {
        console.log( video );
        return;
        window.URL.revokeObjectURL(video.src);
        var duration = video.duration;
        //this.setState( { length: duration } );F
        this.postData(duration);
    }

    onSubmit(event) {
        event.preventDefault();

        var video = document.createElement('video');
        video.preload = 'metadata';

        //video.onloadedmetadata = this.loadMetaData( video );
        video.onloadedmetadata = this.submit(video);

        video.src = URL.createObjectURL(this.video.current.files[0]);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label><h3>Title</h3>
                            <input className="form-control" type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Enter title here..." />
                            <p style={{ color: "red", display: this.state.title.length > 2 ? "none" : "block" }}>Title requires at least 3 characters</p>
                        </label>
                    </div>
                    <div className="form-group">
                        <label><h3>Description</h3>
                            <input className="form-control" type="text" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Enter description here..." />
                            <p style={{ color: "red", display: this.state.description.length > 2 ? "none" : "block" }}>Description requires at least 3 characters</p>
                        </label>
                    </div>
                    <div className="form-group">
                        <label><h3>Video File</h3>
                            <input className="form-control" type="file" name="video" accept="video/*" onChange={this.handleChange} value={this.state.file} ref={this.video} />
                            <p style={{ color: "red", display: this.state.video != null ? "none" : "block" }}>Video file is required</p>
                        </label>
                    </div>
                    <div className="form-group">
                        <label><h3>Copyright Information</h3>
                            <input className="form-control" type="text" name="copyright" onChange={this.handleChange} value={this.state.copyright} placeholder="Enter copyright information here..." />
                        </label>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}