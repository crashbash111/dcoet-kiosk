import React from "react";
import Axios from "axios";

export default class CreateVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.video != null ? this.props.video.title : "",
            description: this.props.video != null ? this.props.video.description : "",
            video: null,
            copyright: this.props.video != null ? this.props.video.copyright : "",
            length: -1,
            progressValue: 0,
            error: false,
            showBar: false,
            tabIndex: 0,
            status: 200,
            statusText: "",
            submitEnabled: true,
            completed: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.postData = this.postData.bind(this);
        this.submit = this.submit.bind(this);
        this.updateProgressBarValue = this.updateProgressBarValue.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);

        this.video = React.createRef();
        this.thumbnail = React.createRef();
    }

    handleChange(event) {
        let { name, value, files } = event.target;

        this.setState({ showBar: false });

        if (name != "video" || name != "thumbnail") {
            if (value.length < 191) {
                this.setState({ [name]: value });
            }
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

        if (this.thumbnail.current != null && this.thumbnail.current.files != null && this.thumbnail.current.files.length > 0) {
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
                //this.props.handleSubmitted();
                this.setState({ completed: true, status: response.status, statusText: response.statusText });
            })
            .catch(err => {
                console.log(err.response);
                this.setState({ error: true, status: err.response.status, statusText: err.response.statusText });
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

        if (this.state.title.length < 3 || this.state.description.length < 3 || !(this.props.video != null) && this.video != null && this.video.current != null && this.video.current.files != null && this.video.current.files.length < 1) {
            return;
        }

        this.setState({ submitEnabled: false });

        if (this.video != null && this.video.current != null && this.video.current.files != null && this.video.current.files.length == 1) {
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
                this.setState({ submitEnabled: true });
            }
        }
        else if( this.props.video != null ) {
            console.log( "Started" );
            var formData = new FormData();
            formData.append("token", localStorage.getItem("id_token"));
            formData.append("title", this.state.title);
            formData.append("description", this.state.description);
            formData.append("copyright", this.state.copyright);
            formData.append( "_method", "PUT" );
            Axios({
                url: `./api/videos/${this.props.video.id}`, //+ (this.state.editMode ? "/" + this.props.match.params.id : "")
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: formData
            })
                .then(response => {
                    console.log("from form submit ", response);
                    //this.props.handleSubmitted();
                    this.setState({ completed: true, status: response.status, statusText: response.statusText });
                    this.props.handleEditDone();
                })
                .catch(err => {
                    console.log(err.response);
                    this.setState({ error: true, submitEnabled: true, status: err.response.status, statusText: err.response.statusText });
                });
        }

    }

    handleTabClick(i) {
        this.setState({ tabIndex: i });
    }

    render() {

        let child = <div>Select a tab</div>;

        switch (this.state.tabIndex) {
            case 0:
                child = <div><div className="form-group">
                    <label><h3>Title</h3></label>
                    <p style={{ color: "red", display: this.state.title.length > 2 ? "none" : "block" }}>Title requires at least 3 characters</p>
                    <input className="form-control" type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Enter title here..." />
                </div>
                    <div className="form-group">
                        <label><h3>Description</h3></label>
                        <p style={{ color: "red", display: this.state.description.length > 2 ? "none" : "block" }}>Description requires at least 3 characters</p>
                        <textarea rows="5" cols="20" style={{ resize: "none" }} className="form-control" type="text" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Enter description here..." />
                    </div>
                </div>
                break;
            case 1:
                child = <div>
                    <div className="form-group">
                        <label><h3>Video File</h3></label>
                        <p style={{ color: "red", display: this.state.video != null ? "none" : "block" }}>Video file is required</p>
                        <input className="form-control" type="file" name="video" accept="video/*" onChange={this.handleChange} value={this.state.file} ref={this.video} />
                    </div>
                    <div className="form-group">
                        <label><h3>Thumbnail</h3></label>
                        <p>Optionally, choose a thumbnail to show on the kiosk page.</p>
                        <input className="form-control" type="file" name="thumbnail" accept="image/*" onChange={this.handleChange} value={this.state.file} ref={this.thumbnail} />
                    </div>
                    <div className="form-group">
                        <label><h3>Copyright Information</h3></label>
                        <input className="form-control" type="text" name="copyright" onChange={this.handleChange} value={this.state.copyright} placeholder="Enter copyright information here..." />
                    </div>
                </div>;
                break;
        }

        return <div>
            <div className="admin-top-box">
                <h2>Create New Video</h2>
            </div>
            <br />
            <div style={{ padding: "20px" }}>
                <div style={{ width: "100%" }}>
                    <button style={{ width: "50%" }} className={this.state.tabIndex == 0 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(0) }}>Text</button>
                    <button style={{ width: "50%" }} className={this.state.tabIndex == 1 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(1) }}>Video</button>
                </div>
                <br />
                <div>
                    <button disabled={this.state.tabIndex < 1} onClick={(event) => { this.handleTabClick(this.state.tabIndex - 1) }} className="btn btn-outline-dark btn-square">Previous</button>
                    <button disabled={this.state.tabIndex == 1} onClick={(event) => { this.handleTabClick(this.state.tabIndex + 1) }} style={{ float: "right" }} className="btn btn-dark btn-square">Next</button>
                </div>
                <div style={{ padding: "10px" }}>
                    <div style={{ display: this.state.tabIndex == 0 ? "block" : "none" }}>
                        <div className="form-group">
                            <label><h3>Title</h3></label>
                            <p style={{ color: "red", display: this.state.title.length > 2 ? "none" : "block" }}>Title requires at least 3 characters</p>
                            <input className="form-control" type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Enter title here..." />
                        </div>
                        <div className="form-group">
                            <label><h3>Description</h3></label>
                            <p style={{ color: "red", display: this.state.description.length > 2 ? "none" : "block" }}>Description requires at least 3 characters</p>
                            <textarea rows="5" cols="20" style={{ resize: "none" }} className="form-control" type="text" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Enter description here..." />
                        </div>
                    </div>
                    <div style={{ display: this.state.tabIndex == 1 ? "block" : "none" }}>
                        <div className="form-group">
                            <label><h3>Video File</h3></label>
                            <p style={{ color: "red", display: this.state.video != null ? "none" : "block" }}>Video file is required</p>
                            <input className="form-control" type="file" name="video" accept="video/*" onChange={this.handleChange} value={this.state.file} ref={this.video} />
                        </div>
                        <div className="form-group">
                            <label><h3>Thumbnail</h3></label>
                            <p>Optionally, choose a thumbnail to show on the kiosk page.</p>
                            <input className="form-control" type="file" name="thumbnail" accept="image/*" onChange={this.handleChange} value={this.state.file} ref={this.thumbnail} />
                        </div>
                        <div className="form-group">
                            <label><h3>Copyright Information</h3></label>
                            <input className="form-control" type="text" name="copyright" onChange={this.handleChange} value={this.state.copyright} placeholder="Enter copyright information here..." />
                        </div>
                    </div>
                    <hr />
                    <div>
                        <button onClick={this.props.handleCancelCreateClick} className="btn btn-outline-danger btn-square">Cancel</button>
                        <button disabled={!this.state.submitEnabled} onClick={(event) => { this.onSubmit(event) }} style={{ float: "right" }} className="btn btn-primary btn-square">Submit</button>
                    </div>
                </div>
                {/* <div style={{ width: "300px", backgroundColor: "green", backgroundPosition: `${100 - this.state.progressValue}% 0` }}></div> */}
                {
                    this.state.showBar ?
                        <div>
                            <hr />
                            <div className="progress" style={{ width: "100%" }}>
                                <div className="progress-bar" role="progressbar" style={{ color: "black", backgroundColor: this.state.error ? "red" : "green", width: `${this.state.progressValue}%` }}>{this.state.progressValue}%</div>
                            </div>
                            {this.state.completed ? <div>
                                <hr />
                                <button onClick={(event) => { this.props.handleSubmitted() }} style={{ marginLeft: "auto", marginRight: "auto" }} className="btn btn-primary btn-square">Done</button>
                            </div>
                                :
                                null
                            }
                            {
                                this.state.error ?
                                    this.state.status == 413 ?
                                        <div style={{ width: "100% " }}>
                                            <p style={{ textAlign: "center", color: "red" }}>File was too big.</p>
                                        </div>
                                        :
                                        <div style={{ width: "100% " }}>
                                            <p style={{ textAlign: "center", color: "red" }}>Something went wrong. Please contact a developer an show them this: </p>
                                            <p>{this.state.status + ": " + this.state.statusText}</p>
                                        </div>
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }
            </div>
        </div>


        return (
            <div>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label><h3>Title</h3></label>
                        <input className="form-control" type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Enter title here..." />
                        <p style={{ color: "red", display: this.state.title.length > 2 ? "none" : "block" }}>Title requires at least 3 characters</p>
                    </div>
                    <div className="form-group">
                        <label><h3>Description</h3></label>
                        <textarea rows="5" cols="20" style={{ resize: "none" }} className="form-control" type="text" name="description" onChange={this.handleChange} value={this.state.description} placeholder="Enter description here..." />
                        <p style={{ color: "red", display: this.state.description.length > 2 ? "none" : "block" }}>Description requires at least 3 characters</p>
                    </div>
                    <div className="form-group">
                        <label><h3>Video File</h3></label>
                        <input className="form-control" type="file" name="video" accept="video/*" onChange={this.handleChange} value={this.state.file} ref={this.video} />
                        <p style={{ color: "red", display: this.state.video != null ? "none" : "block" }}>Video file is required</p>
                    </div>
                    <div className="form-group">
                        <label><h3>Thumbnail</h3></label>
                        <p>Optionally, choose a thumbnail to show on the kiosk page.</p>
                        <input className="form-control" type="file" name="thumbnail" accept="image/*" onChange={this.handleChange} value={this.state.file} ref={this.thumbnail} />
                    </div>
                    <div className="form-group">
                        <label><h3>Copyright Information</h3></label>
                        <input className="form-control" type="text" name="copyright" onChange={this.handleChange} value={this.state.copyright} placeholder="Enter copyright information here..." />
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