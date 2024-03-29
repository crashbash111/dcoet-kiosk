import React from "react";
import Axios from "axios";

import { Redirect } from "react-router-dom";
//import { runInThisContext } from "vm";
import withAuth from "../../components/withAuth";

import AuthService from "../../components/AuthService";
//import { Link } from "react-router-dom";

const Auth = new AuthService();

import HelpButton from "../../components/Admin/HelpButton";
import HeadingTab from "../../components/Admin/Create/HeadingTab";
import TabCreator from "../../components/Admin/Create/TabCreator";
import { thisTypeAnnotation } from "@babel/types";

class Create extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);

        console.log(this.props.page);

        this.state = {
            page: this.props.page,
            statsToDelete: [],
            imagesToDelete: [],
            audiosToDelete: [],
            loading: true,
            categories: [],
            redirect: false,
            photos: null,
            audios: null,
            editMode: this.props.page != null, //(this.props.match != null && this.props.match.params != null && this.props.match.params.id != null) || 
            error: false,
            preview: false,
            tabIndex: 0,
            submitting: false,
            error: false,
            photosCurrent: null,
            progressValue: 0,
        }

        this.AuthService = new AuthService();

        this.handleChange = this.handleChange.bind(this);

        this.handleChangeNew = this.handleChangeNew.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.change = this.change.bind(this);

        this.addStat = this.addStat.bind(this);
        this.handleStatNameChange = this.handleStatNameChange.bind(this);
        this.handleStatValueChange = this.handleStatValueChange.bind(this);
        this.handleStatRemove = this.handleStatRemove.bind(this);
        this.handleStatDeleteUndo = this.handleStatDeleteUndo.bind(this);

        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.handleImageDeleteUndo = this.handleImageDeleteUndo.bind(this);

        this.handleAudioDelete = this.handleAudioDelete.bind(this);
        this.handleAudioDeleteUndo = this.handleAudioDeleteUndo.bind(this);

        this.addCopyright = this.addCopyright.bind(this);
        this.addCopyrightNew = this.addCopyrightNew.bind(this);

        this.handleCopyrightChange = this.handleCopyrightChange.bind(this);
        this.handleCopyrightChangeNew = this.handleCopyrightChangeNew.bind(this);

        this.handleTabClick = this.handleTabClick.bind(this);

        this.updateProgressBarValue = this.updateProgressBarValue.bind(this);

        this.photos = React.createRef();
        this.audios = React.createRef();
    }

    change(event) {
        console.log(event.target.files);
    }

    handleBackClick(event) {
        this.setState({ preview: false });
    }

    handlePreviewClick(event) {
        this.setState({ preview: true });
    }

    handleTabClick(i) {
        this.setState({ tabIndex: i });
    }

    handleChangeNew(event) {
        const { name, value, type, files } = event.target;

        if (name == "audios") {

        }
        else if (name == "photos") {
            //this.setState( { page: { ...this.state.page, image: event.target.files } } );

            this.setState({ photosCurrent: this.photos.current.files });

            let temp = [];

            for (var i = 0; i < this.photos.current.files.length; ++i) {
                temp.push({ id: i, text: "" });
            }

            this.setState(
                {
                    page: {
                        ...this.state.page,
                        copyrightNew: temp,
                    }
                }
            );
        }

        this.forceUpdate();

        console.log(this.state);
    }

    addCopyright = idx => event => {
        event.preventDefault();
        this.setState(
            {
                page: { ...this.state.page, copyright: this.state.page.copyright.concat([{ id: idx, text: "" }]) }
            }
        );
    }

    addCopyrightNew = idx => event => {
        event.preventDefault();
        this.setState(
            {
                page: { ...this.state.page, copyrightNew: this.state.page.copyrightNew.concat([{ id: idx, text: "" }]) }
            }
        );
    }

    handleCopyrightChange = idx => event => {
        let newCopyright = this.state.page.copyright.map((copy, sidx) => {

            if (idx !== sidx) return copy;
            return { ...copy, text: event.target.value };

        });

        this.setState({ page: { ...this.state.page, copyright: newCopyright } });

        console.log(this.state);
    }

    handleCopyrightChangeNew = idx => event => {
        console.log("Here " + idx);
        let newCopyright = this.state.page.copyrightNew.map((copy, sidx) => {

            if (idx !== sidx) return copy;
            return { ...copy, text: event.target.value };

        });

        this.setState({ page: { ...this.state.page, copyrightNew: newCopyright } });

        console.log(this.state);
    }

    addStat(event) {
        event.preventDefault();
        this.setState(
            {
                page: { ...this.state.page, stats: this.state.page.stats.concat([{ id: -1, name: "", value: "" }]) }
            }
        );
        console.log(this.state);
    }

    handleStatNameChange = idx => event => {
        let newStats = this.state.page.stats.map((stat, sidx) => {

            if (idx !== sidx) return stat;
            return { ...stat, name: event.target.value };

        });

        this.setState({ page: { ...this.state.page, stats: newStats } });

        console.log(this.state);
    }

    handleStatValueChange = idx => event => {
        let newStats = this.state.page.stats.map((stat, sidx) => {

            if (idx !== sidx) return stat;
            return { ...stat, value: event.target.value };

        });

        this.setState({ page: { ...this.state.page, stats: newStats } });
    }

    handleStatRemove = idx => event => {
        event.preventDefault();

        if (this.state.page.stats[idx].id != -1) {
            this.setState({
                statsToDelete: this.state.statsToDelete.concat(this.state.page.stats[idx].id)
            });
        }
        else {
            this.setState(
                {
                    //statsToDelete: this.state.stats.statsToDelete.concat(  )
                    page: { ...this.state.page, stats: this.state.page.stats.filter((s, sidx) => (idx !== sidx)) }
                });
        }

        //console.log( idx );
        //console.log( this.state.page.stats[ idx ].id );
    }

    handleStatDeleteUndo = idx => event => {
        event.preventDefault();

        this.setState(prevState => {
            return (
                {
                    statsToDelete: prevState.statsToDelete.map(item => {
                        if (item == prevState.page.stats[idx].id) {
                            return null;
                        }
                        return item;
                    })
                }
            )
        });
    }

    handleImageDelete = idx => event => {
        event.preventDefault();

        //console.log( "t" );

        //console.log(this.state.page.image[idx].id);

        this.setState({
            imagesToDelete: this.state.imagesToDelete.concat(this.state.page.images[idx].id)
        });
    }

    handleImageSoftDelete = idx => event => {
        event.preventDefault();

        this.setState(prevState => {
            return (
                {
                    statsToDelete: prevState.imagesToDelete.map(item => {
                        if (item == prevState.page.images[idx].id) {
                            return null;
                        }
                        return item;
                    })
                }
            )
        });
    }

    handleImageDeleteUndo = idx => event => {
        event.preventDefault();

        //console.log( "b" );

        this.setState(prevState => {
            return (
                {
                    imagesToDelete: prevState.imagesToDelete.map(item => {
                        if (item == prevState.page.images[idx].id) {
                            return null;
                        }
                        return item;
                    })
                }
            )
        });
    }

    handleAudioDelete = idx => event => {
        event.preventDefault();

        this.setState({
            audiosToDelete: this.state.audiosToDelete.concat(this.state.page.audios[idx].id)
        });
    }

    handleAudioDeleteUndo = idx => event => {
        event.preventDefault();

        this.setState(prevState => {
            return (
                {
                    audiosToDelete: prevState.audiosToDelete.map(item => {
                        if (item == prevState.page.audios[idx].id) {
                            return null;
                        }
                        return item;
                    })
                }
            )
        });
    }

    handleChange(event) {
        const { name, value, type, files } = event.target;
        if (type == "file") {
            this.setState({ [name]: files[0] });
            console.log(files);
            console.log(files[0]);
        }
        else {
            if (value.length < 16777215) {
                this.setState({ page: { ...this.state.page, [name]: value } });
            }
        }
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.page.heading.length < 3 || this.state.page.shortdesc.length < 3 || this.state.page.category_id == -1 || !this.state.editMode && this.photos != null && this.photos.current != null && this.photos.current.files != null && this.photos.current.files.length < 1) {
            this.setState({ error: true });
            return;
        }

        var copyright = null;

        let formData = new FormData();

        formData.append("token", localStorage.getItem("id_token"));

        if (this.state.editMode) {
            formData.append("_method", "PUT");

            this.state.statsToDelete.map(item => {
                formData.append("statsToDelete[]", item);
            });

            this.state.imagesToDelete.map(item => {
                formData.append("imagesToDelete[]", item);
            });

            this.state.audiosToDelete.map(item => {
                formData.append("audiosToDelete[]", item);
            })

            copyright = this.state.page.copyright;
        }
        formData.append("heading", this.state.page.heading);
        formData.append("shortdesc", this.state.page.shortdesc);
        formData.append("longdesc", this.state.page.longdesc);
        formData.append("category", this.state.page.category_id);

        var files = this.photos.current.files;

        for (var i = 0; i < files.length; ++i) {
            var file = files[i];

            if (!file.type.match("image.*")) {
                continue;
            }

            formData.append("photos[]", file, file.name);
        }

        var stats = this.state.page.stats;

        for (var i = 0; i < stats.length; ++i) {
            var stat = stats[i];

            if (this.state.statsToDelete.includes(stat.id)) continue;

            formData.append("statsIds[]", stat.id);
            formData.append("statsNames[]", stat.name);
            formData.append("statsValues[]", stat.value);

            console.log(stat);
        }

        var audios = Array();

        if (this.audios.current != null) {
            audios = this.audios.current.files;
        }

        for (var i = 0; i < audios.length; ++i) {
            var audio = audios[i];

            console.log(audio);

            if (!audio.type.match("audio.*")) {
                continue;
            }
            if (this.state.audiosToDelete.includes(audio.id)) {
                continue;
            }

            formData.append("audios[]", audio, audio.name);
            console.log("hereeee");
        }

        if (copyright != null) {
            for (var i = 0; i < copyright.length; ++i) {
                formData.append("copyright_ids[]", copyright[i].id);
                formData.append("copyright_texts[]", copyright[i].text);
            }
        }

        let copyrightNew = this.state.page.copyrightNew;
        if (copyrightNew != null) {
            for (var i = 0; i < copyrightNew.length; ++i) {
                formData.append("copyright_new[]", copyrightNew[i].text);
                console.log("appended");
            }
        }
        else {
            console.log("reeeee");
        }

        this.setState({ submitting: true });

        Axios({
            url: "./api/pages" + (this.state.editMode ? "/" + this.props.page.id : ""),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    this.updateProgressBarValue(Math.round((progressEvent.loaded * 100) / totalLength));
                }
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                //this.setState({ redirect: true });
                this.setState({ submitting: false });
                this.props.handleSubmitted(this.state.editMode);
            })
            .catch(err => { console.log(err.response); this.setState({ submitting: false }) });
    }

    updateProgressBarValue(x) {
        this.setState({ progressValue: x });
    }

    componentDidMount() {
        this.setState({ loading: true });

        // Auth.fetch("./api/categories")
        //     .then(response => response.json())
        //     .then(data => this.setState({ categories: data }))
        //     .catch( error => { console.log( error ); })

        if (this.state.editMode) {

            // fetch("./api/pages/" + this.props.page.id)
            //     .then(response => response.json())
            //     .then(data => {
            //         let copyright = [];
            //         for (var i = 0; i < data.images.length; ++i) {
            //             copyright.push({ id: data.images[i].id, text: data.images[i].copyright });
            //         }
            //         this.setState({ page: { ...data, copyright: copyright } });
            //         console.log(data);
            //     });
        }
        else {
            this.setState({ page: { heading: "", shortdesc: "", longdesc: "", images: [], category_id: -1, stats: [], audios: [], copyright: [], copyrightNew: [], }, loading: false });
        }

    }

    handleClick(e) {

    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/Admin" />
            );
        }

        if (this.loading || this.state.page == null) {
            return (
                <div>
                    Loading...
                </div>
            )
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

        let items = this.props.categories.map(item => {
            return (
                <div key={item.id}>
                    <label>{item.name}
                        <input type="radio" name="category_id" value={item.id} checked={this.state.page.category_id == item.id} onChange={this.handleChange} />
                    </label>
                    <br />
                </div>
            )
        });

        let itemsNew = this.props.categories.map(item => {
            return (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            )
        })

        let count = 0;

        let statFields;

        if (this.state.page.stats != null) {
            statFields = this.state.page.stats.map((item, idx) => {

                count++;

                let softDeleted = this.state.statsToDelete.includes(item.id);

                return (
                    <div key={count} style={softDeleted ? { opacity: "0.4" } : null}>
                        {count > 1 ? <hr /> : null}
                        <h4>Stat #{count}</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "auto 100px" }}>
                            <div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="stats" placeholder={`Stat #${idx + 1} name`} value={item.name} onChange={this.handleStatNameChange(idx)} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" name="stats" placeholder={`Stat #${idx + 1} value`} value={item.value} onChange={this.handleStatValueChange(idx)} />
                                </div>
                            </div>
                            <div>
                                <button className={softDeleted ? "btn btn-primary btn-square" : "btn btn-danger btn-square"} onClick={softDeleted ? this.handleStatDeleteUndo(idx) : this.handleStatRemove(idx)}>{softDeleted ? "Undo" : "Delete"}</button>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        else {
            statFields = <div></div>
        }

        let statTableItems = this.state.page.stats.map(item => {
            return (
                <div key={item.id}>
                    <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                    <p style={{ textAlign: "center" }}>{item.value}</p>
                </div>
            );
        });

        let currentImages = Array();

        if (this.photos.current != null) {

            currentImages = Array();

            let x = this.photos.current.files.length;

            for (var y = 0; y < x; ++y) {
                let imgPath = URL.createObjectURL(this.photos.current.files[y]);

                currentImages.push(<div key={y}>
                    <img src={imgPath} style={{ height: "100px" }} />
                    <input type="text" name="copyright" placeholder="Copyright information here" onChange={this.handleCopyrightChangeNew(y)} value={this.state.page.copyrightNew[y].text} />
                </div>);
            }
        }
        else {
            for (var i = 0; i < 3; ++i) {
                currentImages.push(<div key={i} style={{ backgroundColor: "#afafaf", width: "70%", height: "100px" }}>
                </div>
                );
            }
        }

        let oldImages = null;

        if (this.state.page.images != null && this.state.page.images.length > 0) {

            console.log("here");

            oldImages = this.state.page.images.map((item, idx) => {

                //this.addCopyright( idx );

                let imgPath = "./storage/kiosk_images/" + item.image_name;

                let softDeleted = this.state.imagesToDelete.includes(item.id);

                let deletedStyle = { opacity: "0.4" };

                return (
                    <div key={item.id} style={softDeleted ? deletedStyle : null}>
                        <img src={imgPath} style={{ width: "100px" }} />
                        {/* <input type="text" name="copyright" value={this.state.page.copyright[idx].text} onChange={this.handleCopyrightChange(idx)} placeholder="Copyright information here..." /> */}
                        <button className="btn btn-danger btn-square" onClick={!softDeleted ? this.handleImageDelete(idx) : this.handleImageDeleteUndo(idx)}>Delete</button>
                    </div>
                );
            });
        }

        let currentAudios = Array();

        if (this.audios.current != null && this.audios.current.files != null) {

            let x = this.audios.current.files.length;

            for (var y = 0; y < x; ++y) {
                let audioPath = URL.createObjectURL(this.audios.current.files[y]);

                currentAudios.push(<div style={{ display: "inline" }} key={y}>
                    <audio controls>
                        <source src={audioPath} />
                    </audio>
                    {/* <a style={{ display: "inline" }} onClick={ (event) => { var audio = new Audio( audioPath ); audio.play(); } }><img style={{ display: "inline" }} src="images/play.svg" width="40%" /></a> */}
                </div>);
            }
        }
        // else {
        //     for (var i = 0; i < 3; ++i) {
        //         currentAudios.push(<div key={i} style={{ backgroundColor: "#afafaf", width: "70%", height: "100px" }}>
        //         </div>
        //         );
        //     }
        // }

        let oldAudios = null;

        if (this.state.page.audios != null && this.state.page.audios.length > 0) {
            oldAudios = this.state.page.audios.map((item, idx) => {

                let audioPath = "./storage/audio_files/" + item.filepath;

                let softDeleted = this.state.audiosToDelete.includes(item.id);

                let deletedStyle = { opacity: "0.4" };

                return (
                    <div key={item.id} style={softDeleted ? deletedStyle : null}>
                        <audio controls>
                            <source src={audioPath} />
                        </audio>
                        <button className="btn btn-danger btn-square" onClick={softDeleted ? this.handleAudioDeleteUndo(idx) : this.handleAudioDelete(idx)}>Delete</button>
                    </div>
                );
            });
        }

        // return <div style={{ height: "100%" }}>

        // </div>

        // return <TabCreator>
        //     <HeadingTab heading={ this.state.heading } handleChange={ this.handleChange } />
        //     </TabCreator>


        //
        //
        //
        //
        //

        <form className="create-form" onSubmit={this.handleSubmit} encType="multipart/form-data">
            {/* <HeadingTab heading={ this.state.page.heading } handleChange={ this.handleChange } /> */}


            <div>
                <button onClick={this.addStat}>Add Stat</button>
            </div>
            <div>
                Stat fields
                                    {statFields}
            </div>
            <div className="form-group">
                <label><h3 className="big-shadow">Images</h3>
                    <input multiple name="photos" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.photos} onChange={this.handleChangeNew} />
                </label>
                <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
            </div>
            {
                (this.state.page.images != null && this.photos.current != null && this.photos.current.files != null) ?
                    <div>
                        <div>
                            <h3 className="big-shadow">Current Images</h3>
                            <div>
                                {oldImages}
                            </div>
                        </div>
                    </div>
                    : null
            }
            {
                this.photos.current != null ?
                    <div>
                        <h3 className="big-shadow">Currently Selected Images</h3>
                        <div>
                            {currentImages}
                        </div>
                    </div>
                    : null
            }

            <div className="form-group">
                <label><h3 className="big-shadow">Audio Files</h3>
                    <p style={{ textShadow: "1px 1px #121212" }}>Optional field. Add sounds here of the animal.</p>
                    <input multiple name="audios" className="form-control" type="file" accept="audio/*" ref={this.audios} onChange={this.handleChangeNew} />
                </label>
            </div>
            {
                this.state.page.audios != null ?
                    <div>
                        <h3 className="big-shadow">Current audios</h3>
                        <div>
                            {oldAudios}
                        </div>
                    </div>
                    :
                    null
            }
            {
                this.audios.current != null ?
                    <div>
                        <h3 className="big-shadow">Currently selected audio files</h3>
                        <div>
                            {currentAudios}
                        </div>
                    </div>
                    :
                    null
            }
            {this.state.error ?
                <div>Make sure to fulfill all validation rules and try again.</div>
                :
                null
            }
            <button className="btn btn-primary btn-square">Submit</button>
        </form>

        let currentTab = <h1>Loading...</h1>;

        switch (this.state.tabIndex) {
            case 0:
                currentTab = <div>
                    <div className="form-group">
                        <label><h3>Heading</h3>
                            <p style={{ color: "red", display: this.state.page.heading.length > 2 ? "none" : "block" }}>Heading requires at least 3 characters</p>
                        </label>
                        <input type="text" className="form-control" name="heading" value={this.state.page.heading} onChange={this.handleChange} placeholder="Enter heading here..." />
                    </div>
                    <div className="form-group">
                        <label><h3>Short Description</h3>

                            <p style={{ color: "red", display: this.state.page.shortdesc.length > 2 ? "none" : "block" }}>Short description requires at least 3 characters</p>
                        </label>
                        <textarea rows="3" className="form-control" name="shortdesc" value={this.state.page.shortdesc} onChange={this.handleChange} placeholder="Enter short description here..." />
                    </div>
                    <div className="form-group">
                        <label><h3>Long Description</h3>

                            {/* <p style={{ color: "red", display: this.state.page.longdesc.length > 2 ? "none" : "block" }}>Long description requires at least 3 characters</p> */}
                        </label>
                        <textarea rows="6" className="form-control" name="longdesc" value={this.state.page.longdesc} onChange={this.handleChange} placeholder="Enter long description here..." />
                    </div>

                </div>;
                break;
            case 1:
                //stats
                currentTab = <div>
                    <div className="form-group">
                        <h3>Stats</h3>
                        <br />
                        <button className="btn btn-primary btn-square" onClick={this.addStat}>Add Stat</button>
                    </div>
                    <div className="form-group">
                        {statFields}
                    </div>
                </div>;
                break;
            case 2:
                currentTab = <div>
                    <div className="form-group">
                        <h3>Category</h3>
                        <select className="form-control" name="category_id" value={this.state.page.category_id} onChange={this.handleChange}>
                            <option disabled hidden value="-1">--Select a category--</option>
                            {itemsNew}
                        </select>
                        <p style={{ color: "red", display: this.state.page.category_id != -1 ? "none" : "block" }}>Category is required</p>
                    </div>
                </div>
                break;
            case 3:
                currentTab = <div>
                    <div className="form-group">
                        <label><h3>Images</h3></label>
                        <input multiple name="photos" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.photos} onChange={this.handleChangeNew} />
                        <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                    </div>
                    <hr />
                    <div>
                        <h3>Chosen Images</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                            {currentImages}
                        </div>
                    </div>
                </div>
            case 4:
                currentTab = <div>
                    <div className="form-group">
                        <label><h3>Audio</h3></label>
                        <input multiple name="audios" className="form-control" type="file" accept="audio/*" ref={this.audios} onChange={this.handleChangeNew} />
                    </div>
                    <hr />
                    <div>
                        <h3>Chosen Audio</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                            {currentAudios}
                        </div>
                    </div>
                </div>
                break;
        }

        // return <div className="admin-boxshadow">
        //     <div className="admin-top-box">
        //         <h2>Create New Page</h2>
        //     </div>
        //     <br />
        //     <div style={{ padding: "20px" }}>
        //         <div style={{ width: "100%" }}>

        //         </div>
        //     </div>
        // </div>

        return (<div>
            <div style={{ display: this.state.preview ? "block" : "none" }}>

                <div style={{ width: "100%", height: "100%", position: "absolute" }}>
                    <img src={this.photos != null && this.photos.current != null && this.photos.current.files != null && this.photos.current.files.length > 0 ? URL.createObjectURL(this.photos.current.files[0]) : null} style={{ width: "100%", height: "100%" }} />
                </div>

                <div>
                    <button className="btn btn-danger btn-square" onClick={(event) => this.handleBackClick(event)} style={{ float: "right", paddingTop: "10px", paddingRight: "10px" }}>
                        Back
                        </button>
                </div>

                <div className="hideScroll" onclick={() => { null }}
                    style={{
                        //styling for the side panel
                        //filter: "color blur(60px)",
                        height: "80vh",
                        width: "400px",
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "hidden",
                        overflowX: "hidden",
                        opacity: "0.8",
                        backgroundColor: "#01283D",
                        color: "white",
                        // position: "fixed",

                    }}>

                    <h1 style={{ textAlign: "center", fontSize: "4em", display: "block", width: "100%" }}>{this.state.page.heading == "" ? "Sample Heading" : this.state.page.heading}</h1>


                    <div className="hideScroll" style={{
                        overflowY: "scroll",
                        width: "100%",
                        flex: "1",
                        padding: "10px 20px 30px 20px",
                        background: "linear-gradient(0deg, #141414 40px, transparent 100px)",
                    }}>
                        {this.state.page.stats.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>{statTableItems}</div> : null}
                        {this.state.page.audios.length > 0 ? <div><h3>Audios</h3><div>{currentAudios}</div></div> : null}
                        <p style={{
                            fontSize: "28px",
                            textAlign: "left",
                            paddingBottom: "5px",
                        }}>{this.state.page.shortdesc == "" ? "This is a sample short description." : this.state.page.shortdesc}
                        </p>
                        <p style={{
                            fontSize: "18px",
                            textAlign: "justify",
                            paddingBottom: "50px",
                        }}>{this.state.page.longdesc}
                        </p>
                    </div>
                    <p className="returns"
                        style={{
                            //backgroundColor: !palette.loading ? palette.data.darkMuted : "#141414",
                            color: "white",
                            padding: "8px 8px 8px 32px",
                            width: this.state.sideSize + "vw",
                            display: "block",
                            bottom: "0px",
                            position: "absolute",
                            textDecoration: "none",
                            fontSize: "25px",
                            transition: this.state.transitionTime,
                        }} >&#8592; Back to Home</p>
                </div>
            </div>
            <div style={{ display: this.state.preview ? "none" : "block" }} className="admin-boxshadow">
                <div className="admin-top-box">
                    <h2 style={{ display: "inline-block" }}>Create New Page</h2>
                    <button className="btn btn-outline-success btn-square" style={{ float: "right", display: "inline-block" }} onClick={(event) => this.handlePreviewClick(event)}>Preview</button>
                </div>
                <br />
                <div style={{ padding: "20px" }}>
                    {!this.state.editMode ? <div style={{ width: "100%" }}>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 0 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(0) }}>Text</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 1 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(1) }}>Stats</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 2 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(2) }}>Category</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 3 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(3) }}>Images</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 4 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(4) }}>Audio</button>
                    </div>
                        :
                        <div style={{ width: "100%" }}>
                            <button style={{ width: "14.28%" }} className={this.state.tabIndex == 0 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(0) }}>Text</button>
                            <button style={{ width: "14.28%" }} className={this.state.tabIndex == 1 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(1) }}>Stats</button>
                            <button style={{ width: "14.28%" }} className={this.state.tabIndex == 2 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(2) }}>Category</button>
                            <button style={{ width: "14.28%" }} className={this.state.tabIndex == 3 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(3) }}>Images</button>
                            <button style={{ width: "14.28%" }} className={this.state.tabIndex == 4 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(4) }}>Audio</button>
                            <button style={{ width: "14.28%" }} className={this.state.tabIndex == 5 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(5) }}>Current Images</button>
                            <button style={{ width: "14.28%" }} className={this.state.tabIndex == 6 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(6) }}>Current Audio</button>
                        </div>
                    }
                    {/* <div style={{ width: "100%" }}>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 0 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(0) }}>Text</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 1 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(1) }}>Stats</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 2 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(2) }}>Category</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 3 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(3) }}>Images</button>
                        <button style={{ width: "20%" }} className={this.state.tabIndex == 4 ? "btn btn-dark btn-square" : "btn btn-outline-dark btn-square"} onClick={(event) => { this.handleTabClick(4) }}>Audio</button>
                    </div> */}
                    <br />
                    <div>
                        <button disabled={this.state.tabIndex < 1} onClick={(event) => { this.handleTabClick(this.state.tabIndex - 1) }} className="btn btn-outline-dark btn-square">Previous</button>
                        <button disabled={this.state.editMode ? (this.state.tabIndex == 6) : (this.state.tabIndex == 4)} onClick={(event) => { this.handleTabClick(this.state.tabIndex + 1) }} style={{ float: "right" }} className="btn btn-dark btn-square">Next</button>
                    </div>
                    <hr />
                    <div style={{ padding: "10px" }}>
                        <div style={{ display: this.state.tabIndex == 0 ? "block" : "none" }}>
                            <div className="form-group">
                                <label><h3>Heading</h3>
                                    <p style={{ color: "red", display: this.state.page.heading.length > 2 ? "none" : "block" }}>Heading requires at least 3 characters</p>
                                </label>
                                <input type="text" className="form-control" name="heading" value={this.state.page.heading} onChange={this.handleChange} placeholder="Enter heading here..." />
                            </div>
                            <div className="form-group">
                                <label><h3>Short Description</h3>

                                    <p style={{ color: "red", display: this.state.page.shortdesc.length > 2 ? "none" : "block" }}>Short description requires at least 3 characters</p>
                                </label>
                                <textarea rows="3" className="form-control" name="shortdesc" value={this.state.page.shortdesc} onChange={this.handleChange} placeholder="Enter short description here..." />
                            </div>
                            <div className="form-group">
                                <label><h3>Long Description</h3>

                                    {/* <p style={{ color: "red", display: this.state.page.longdesc.length > 2 ? "none" : "block" }}>Long description requires at least 3 characters</p> */}
                                </label>
                                <textarea rows="6" className="form-control" name="longdesc" value={this.state.page.longdesc} onChange={this.handleChange} placeholder="Enter long description here..." />
                            </div>

                        </div>
                        <div style={{ display: this.state.tabIndex == 1 ? "block" : "none" }}>
                            <div className="form-group">
                                <h3>Stats</h3>
                                <br />
                                <button className="btn btn-primary btn-square" onClick={this.addStat}>Add Stat</button>
                            </div>
                            <div className="form-group">
                                {statFields}
                            </div>
                        </div>
                        <div style={{ display: this.state.tabIndex == 2 ? "block" : "none" }}>
                            <div className="form-group">
                                <h3>Category</h3>
                                <select className="form-control" name="category_id" value={this.state.page.category_id} onChange={this.handleChange}>
                                    <option disabled hidden value="-1">--Select a category--</option>
                                    {itemsNew}
                                </select>
                                <p style={{ color: "red", display: this.state.page.category_id != -1 ? "none" : "block" }}>Category is required</p>
                            </div>
                        </div>
                        <div style={{ display: this.state.tabIndex == 3 ? "block" : "none" }}>
                            <div className="form-group">
                                <label><h3>Images</h3></label>
                                <input multiple name="photos" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.photos} onChange={this.handleChangeNew} />
                                <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                            </div>
                            <hr />
                            <div>
                                <h3>Chosen Images</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                                    {currentImages}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: this.state.tabIndex == 4 ? "block" : "none" }}>
                            <div className="form-group">
                                <label><h3>Audio</h3></label>
                                <input multiple name="audios" className="form-control" type="file" accept="audio/*" ref={this.audios} onChange={this.handleChangeNew} />
                            </div>
                            <hr />
                            <div>
                                <h3>Chosen Audio</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                                    {currentAudios}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: this.state.tabIndex == 5 ? "block" : "none" }}>
                            <div className="form-group">
                                <label><h3>Current Images</h3></label>
                                <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                                    {oldImages}
                                </div>
                            </div>
                            <hr />
                            {/* <div>
                                <h3>Chosen Audio</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                                    {currentAudios}
                                </div>
                            </div> */}
                        </div>
                        <div style={{ display: this.state.tabIndex == 6 ? "block" : "none" }}>
                            <div className="form-group">
                                <label><h3>Current Audio</h3></label>
                                <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                                    {oldAudios}
                                </div>
                            </div>
                            <hr />
                            {/* <div>
                                <h3>Chosen Audio</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "33.33% 33.33% 33.33%" }}>
                                    {currentAudios}
                                </div>
                            </div> */}
                        </div>
                        <hr />
                        <div>
                            <button onClick={this.props.handleCancelCreateClick} className="btn btn-outline-danger btn-square">Cancel</button>
                            <button onClick={(event) => { this.handleSubmit(event) }} style={{ float: "right" }} className="btn btn-primary btn-square">Submit</button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <div className="hideScroll" onclick={() => { null }}
                        style={{
                            //styling for the side panel
                            //filter: "color blur(60px)",
                            height: "100vh",
                            width: "400px",
                            display: "flex",
                            flexDirection: "column",
                            overflowY: "hidden",
                            overflowX: "hidden",
                            opacity: "0.8",
                            backgroundColor: "#01283D",
                            color: "white",
                            position: "fixed",
                            top: "100px",
                            right: "20vh"
                        }}>

                        <h1 style={{ textAlign: "center", fontSize: "4em", display: "block", width: "100%" }}>{this.state.page.heading == "" ? "Sample Heading" : this.state.page.heading}</h1>


                        <div className="hideScroll" style={{
                            overflowY: "scroll",
                            width: "100%",
                            flex: "1",
                            padding: "10px 20px 30px 20px",
                            background: "linear-gradient(0deg, #141414 40px, transparent 100px)",
                        }}>
                            {this.state.page.stats.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>{statTableItems}</div> : null}
                            {this.state.page.audios.length > 0 ? <div>Audios<div>{audioItems}</div></div> : null}
                            <p style={{
                                fontSize: "28px",
                                textAlign: "left",
                                paddingBottom: "5px",
                            }}>{this.state.page.text == "" ? "This is a sample short description." : this.state.page.text}
                            </p>
                            <p style={{
                                fontSize: "18px",
                                textAlign: "justify",
                                paddingBottom: "50px",
                            }}>{this.state.page.longdesc}
                            </p>
                        </div>
                        <p className="returns"
                            style={{
                                //backgroundColor: !palette.loading ? palette.data.darkMuted : "#141414",
                                color: "white",
                                padding: "8px 8px 8px 32px",
                                width: this.state.sideSize + "vw",
                                display: "block",
                                bottom: "0px",
                                position: "absolute",
                                textDecoration: "none",
                                fontSize: "25px",
                                transition: this.state.transitionTime,
                            }} >&#8592; Back to Home</p>
                    </div> */}
                </div>
            </div>
        </div>
        );
    }
}

export default Create;