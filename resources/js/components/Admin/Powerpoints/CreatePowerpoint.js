import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreatePowerpoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: this.props.powerpoint != null,
            title: this.props.powerpoint != null ? this.props.powerpoint.title : "",
            redirect: false,
            submitting: false,
            progressValue: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateProgressBarValue = this.updateProgressBarValue.bind( this );

        this.pptImages = React.createRef();
    }

    handleChange(event) {
        let { name, value } = event.target;

        this.setState({
            [name]: value,
        })
    }

    updateProgressBarValue(x) {
        this.setState({ progressValue: x });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.title.length < 3 || this.pptImages == null || this.pptImages.current == null || this.pptImages.current.files == null || this.pptImages.current.files.length < 1) {
            return;
        }

        this.setState({ submitting: true });

        let formData = new FormData();

        formData.append("token", localStorage.getItem("id_token"));

        formData.append("title", this.state.title);

        if (this.state.editMode) {
            formData.append("_method", "PUT");
        }

        var files = this.pptImages.current.files;

        for (var i = 0; i < files.length; ++i) {
            var file = files[i];

            if (!file.type.match("image.*")) {
                continue;
            }

            formData.append("photos[]", file, file.name);
        }

        Axios({
            url: "./api/powerpoints",
            method: "POST",
            headers: {
            },
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    this.updateProgressBarValue(Math.round((progressEvent.loaded * 100) / totalLength));
                }
            },
            data: formData,
        })
            .then(response => {
                console.log(response);
                this.setState({ submitting: true });
                //this.setState({ redirect: true });
                this.props.handleSubmitted();
            })
            .catch(error => { console.log(error.response.data); this.setState({ submitting: true }); } );
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/Admin" />
        }

        let imgList = Array();

        if (this.pptImages.current != null && this.pptImages.current.files != null) {
            for (var i = 0; i < this.pptImages.current.files.length; ++i) {
                let file = this.pptImages.current.files[i];

                imgList.push(
                    <div style={{ display: "inline-block" }}>
                        <h3>{file.name}</h3>
                        <img src={URL.createObjectURL(file)} style={{ height: "200px" }} />
                    </div>
                )
            }
        }

        if (this.state.submitting) {
            return <div className="admin-boxshadow">
                <div className="admin-top-box"><h2>Submitting...</h2></div>
                <div style={{ padding: "30px" }}>
                    <label>{this.state.submitting ? "Uploading..." : "Done!"}</label>
                    <div className="progress" style={{ width: "100%" }}>
                        <div className="progress-bar" role="progressbar" style={{ color: "black", backgroundColor: this.state.error ? "red" : "green", width: `${this.state.progressValue}%` }}>{this.state.progressValue}%</div>
                    </div>
                </div>
            </div>
        }

        return <div>
            <div className="admin-top-box">
                <h2>Create New Presentation</h2>
            </div>
            <br />
            <div style={{ padding: "20px" }}>
                <div className="form-group">
                    <label><h3>Title</h3></label>
                    <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter title here..." />
                    <p style={{ color: "red", display: this.state.title.length > 2 ? "none" : "block" }}>Title requires at least 3 characters</p>
                </div>
                <div className="form-group">
                    <label><h3>Images</h3></label>
                    <input multiple name="photos" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.pptImages} onChange={this.handleChange} />
                    <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                </div>
                {
                    this.state.editMode ?
                        <div>
                            <hr />
                            <div className="form-group">
                                <label><h3>Current Images</h3></label>
                            </div>
                        </div>
                        :
                        null
                }
                {
                    this.state.error ?
                        <div>
                            Make sure to check all validation rules and try again.
                    </div>
                        :
                        null
                }
                <hr />
                <div>
                    <button onClick={this.props.handleCancelCreateClick} className="btn btn-outline-danger btn-square">Cancel</button>
                    <button onClick={(event) => { this.handleSubmit(event) }} style={{ float: "right" }} className="btn btn-primary btn-square">Submit</button>
                </div>
            </div>
        </div>;

        return (
            <div>
                <h2 className="big-shadow">Create Powerpoint</h2>

                <form className="create-form" onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label><h3>Title</h3>
                            <input className="form-control" type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter title here..." />
                            <p style={{ color: "red", display: this.state.title.length > 2 ? "none" : "block" }}>Title requires at least 3 characters</p>
                        </label>
                    </div>
                    <div className="form-group">
                        <label><h3>Images</h3>
                            <input multiple name="photos" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.pptImages} onChange={this.handleChange} />
                        </label>
                        <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                    </div>
                    <button className="btn btn-primary btn-square">Submit</button>
                </form>

                <div style={{ width: "200vh" }}>
                    {imgList}
                </div>
            </div>
        );
    }
}