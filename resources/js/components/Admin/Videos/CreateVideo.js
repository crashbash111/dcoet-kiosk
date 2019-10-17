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
            progressValue: 0,
            error: false,
            showBar: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.postData = this.postData.bind(this);
        this.submit = this.submit.bind(this);
        this.updateProgressBarValue = this.updateProgressBarValue.bind(this);

        this.video = React.createRef();
        this.thumbnail = React.createRef();
    }

    handleChange(event) {
        let { name, value, files } = event.target;

        this.setState({ showBar: false });

        if (name != "video" || name != "thumbnail") {
            this.setState({ [name]: value });
        }
        else {
            this.setState({ [name]: files[0] });
        }

        console.log(this.state);
    }

    postData(duration) {
        if (this.state.title.length < 3 || this.state.description.length < 3 || this.video == null || this.video.current == null || this.video.current.files == null || this.video.current.files.length < 1) {
            Console.log("Please fill out all fields");
            return;
        }

        let formData = new FormData();

        formData.append("token", localStorage.getItem("id_token"));

        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("copyright", this.state.copyright);
        formData.append("length", duration);

        formData.append("video", this.video.current.files[0], this.video.current.files[0].name);

        if (this.thumbnail.current != null) {
            formData.append("thumbnail", this.thumbnail.current.files[0], this.thumbnail.current.files[0].name);
        }

        this.setState({ showBar: true });

        Axios({
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    this.updateProgressBarValue(Math.round((progressEvent.loaded * 100) / totalLength));
                }

            },
            url: "./api/videos", //+ (this.state.editMode ? "/" + this.props.match.params.id : "")
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
            .catch(err => {
                console.log(err.response.data);
                this.setState({ error: true });
            });
    }

    updateProgressBarValue(x) {
        this.setState({ progressValue: x });
    }

    submit(video) {
        window.URL.revokeObjectURL(video.src);
        var duration = video.duration;
        duration = Math.round(duration);
        this.postData(duration);
    }

    onSubmit(event) {
        event.preventDefault();

        try {
            var video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function () {
                this.submit(video);
            }.bind(this);

            video.src = URL.createObjectURL(this.video.current.files[0]);
        }
        catch (e) {
            video = null;
            console.log(e);
        }

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
                            <textarea rows="5" cols="20" style={{ resize: "none" }} className="form-control" type="text" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Enter description here..." />
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
                        <label><h3>Thumbnail</h3>
                            <p>Optionally, choose a thumbnail to show on the kiosk page.</p>
                            <input className="form-control" type="file" name="thumbnail" accept="image/*" onChange={this.handleChange} value={this.state.file} ref={this.thumbnail} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label><h3>Copyright Information</h3>
                            <input className="form-control" type="text" name="copyright" onChange={this.handleChange} value={this.state.copyright} placeholder="Enter copyright information here..." />
                        </label>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                    <div style={{ width: "300px", backgroundColor: "green", backgroundPosition: `${100 - this.state.progressValue}% 0` }}></div>

                    {
                        this.state.showBar ?
                        <div className="progress" style={{ width: "500px" }}>
                            <div className="progress-bar" role="progressbar" style={{ color: "black", backgroundColor: this.state.error ? "red" : "green", width: `${this.state.progressValue}%` }}>{this.state.progressValue}%</div>
                        </div>
                        :
                        null
                    }
                    {
                        this.state.error ?
                            <p>Something went wrong. Please contact an administrator.</p>
                            :
                            null
                    }
                </form>
            </div>
        );
    }
}