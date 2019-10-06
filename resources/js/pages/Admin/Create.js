import React from "react";
import Axios from "axios";

import { Redirect } from "react-router-dom";
import { runInThisContext } from "vm";
import withAuth from "../../components/withAuth";

import AuthService from "../../components/AuthService";

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: null,
            statsToDelete: [],
            imagesToDelete: [],
            audiosToDelete: [],
            loading: true,
            categories: [],
            redirect: false,
            photos: null,
            audios: null,
            editMode: (this.props.match != null && this.props.match.params != null && this.props.match.params.id != null),
            error: false,
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

        this.photos = React.createRef();
        this.audios = React.createRef();
    }

    change(event) {
        console.log(event.target.files);
    }

    handleChangeNew(event) {
        const { name, value, type, files } = event.target;

        if (name == "audios") {

        }
        else if (name == "photos") {
            //this.setState( { page: { ...this.state.page, image: event.target.files } } );

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
            imagesToDelete: this.state.imagesToDelete.concat(this.state.page.image[idx].id)
        });
    }

    handleImageSoftDelete = idx => event => {
        event.preventDefault();

        this.setState(prevState => {
            return (
                {
                    statsToDelete: prevState.imagesToDelete.map(item => {
                        if (item == prevState.page.image[idx].id) {
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
                        if (item == prevState.page.image[idx].id) {
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
            this.setState({ page: { ...this.state.page, [name]: value } });
        }
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.page.heading.length < 3 || this.state.page.text.length < 3 || this.state.page.category_id == -1 || !this.state.editMode && this.photos != null && this.photos.current != null && this.photos.current.files != null && this.photos.current.files.length < 1) {
            this.setState({ error: true });
            return;
        }

        var copyright = null;

        let formData = new FormData();

        formData.append( "token", localStorage.getItem( "id_token" ) );

        if (this.state.editMode) {
            formData.append("_method", "PUT");

            this.state.statsToDelete.map(item => {
                formData.append("statsToDelete[]", item);
            });

            this.state.imagesToDelete.map(item => {
                formData.append("imagesToDelete[]", item);
            });

            copyright = this.state.page.copyright;
        }
        formData.append("heading", this.state.page.heading);
        formData.append("shortdesc", this.state.page.text);
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
        }

        if (copyright != null) {
            for (var i = 0; i < copyright.length; ++i) {
                formData.append("copyright_ids[]", copyright[i].id);
                formData.append("copyright_texts[]", copyright[i].text);
            }
        }

        let copyrightNew = this.state.page.copyrightNew;
        if (copyrightNew != null)
        {
            for (var i = 0; i < copyrightNew.length; ++i)
            {
                formData.append("copyright_new[]", copyrightNew[i].text);
            }
        }

        //console.log( formData );
        //return;

        //formData.append( "photos[]", Array.from( this.photos.current.files ) );
        //console.log(this.photos.current.files);
        Axios({
            url: "./api/pages" + (this.state.editMode ? "/" + this.props.match.params.id : ""),
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

    componentDidMount() {
        this.setState({ loading: true });

        fetch("./api/categories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));

        if (this.state.editMode) {

            fetch("./api/pages/" + this.props.match.params.id)
                .then(response => response.json())
                .then(data => {
                    let copyright = [];
                    for (var i = 0; i < data.images.length; ++i) {
                        copyright.push({ id: data.images[i].id, text: data.images[i].copyright });
                    }
                    this.setState({ page: { ...data, copyright: copyright } });
                    console.log(data);
                });
        }
        else {
            this.setState({ page: { heading: "", text: "", images: [], category_id: -1, stats: [], audios: [], copyright: [], copyrightNew: [], }, loading: false });
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

        let items = this.state.categories.map(item => {
            return (
                <div key={item.id}>
                    <label>{item.name}
                        <input type="radio" name="category_id" value={item.id} checked={this.state.page.category_id == item.id} onChange={this.handleChange} />
                    </label>
                    <br />
                </div>
            )
        });

        let itemsNew = this.state.categories.map(item => {
            return (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            )
        })

        let count = 0;

        let statFields = this.state.page.stats.map((item, idx) => {

            count++;

            let softDeleted = this.state.statsToDelete.includes(item.id);

            return (
                <div key={item.id} style={softDeleted ? { opacity: "0.4" } : null}>
                    {count > 1 ? <hr /> : null}
                    <div style={{ display: "grid", gridTemplateColumns: "auto 50px" }}>
                        <div>
                            <div className="form-group">
                                <input className="form-control" type="text" name="stats" placeholder={`Stat #${idx + 1} name`} value={item.name} onChange={this.handleStatNameChange(idx)} />
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" name="stats" placeholder={`Stat #${idx + 1} value`} value={item.value} onChange={this.handleStatValueChange(idx)} />
                            </div>
                        </div>
                        <div>
                            <button style={{ width: "100%", height: "100%" }} className={softDeleted ? "btn btn-primary" : "btn btn-danger"} onClick={softDeleted ? this.handleStatDeleteUndo(idx) : this.handleStatRemove(idx)}>{softDeleted ? "Undo" : "Delete"}</button>
                        </div>
                    </div>
                </div>
            );
        });

        let statTableItems = this.state.page.stats.map(item => {
            return (
                <div key={item.id}>
                    <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                    <p style={{ textAlign: "center" }}>{item.value}</p>
                </div>
            );
        });

        let currentImages = null;

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
                        <input type="text" name="copyright" value={this.state.page.copyright[idx].text} onChange={this.handleCopyrightChange(idx)} placeholder="Copyright information here..." />
                        <button onClick={!softDeleted ? this.handleImageDelete(idx) : this.handleImageDeleteUndo(idx)}>Delete</button>
                    </div>
                );
            });
        }

        let currentAudios = null;

        if (this.audios.current != null) {

            currentAudios = Array();

            let x = this.audios.current.files.length;

            for (var y = 0; y < x; ++y) {
                let audioPath = URL.createObjectURL(this.audios.current.files[y]);

                currentAudios.push(<div key={y}>
                    <embed src={audioPath} />
                </div>);
            }
        }

        let oldAudios = null;

        if (this.state.page.audios != null && this.state.page.audios.length > 0) {
            oldAudios = this.state.page.audios.map((item, idx) => {

                let audioPath = "./storage/audio_files/" + item.filepath;

                let softDeleted = this.state.audiosToDelete.includes(item.id);

                let deletedStyle = { opacity: "0.4" };

                return (
                    <div key={item.id} style={softDeleted ? deletedStyle : null}>
                        <embed src={audioPath} />
                        <button onClick={softDeleted ? this.handleAudioDeleteUndo(idx) : this.handleAudioDelete(idx)}>Delete</button>
                    </div>
                );
            });
        }

        return (
            <div style={{ height: "100%" }}>
                <div style={{ height: "100%", display: "grid", gridTemplateColumns: "75vh auto" }}>
                    <div className="no-scrollbar" style={{ overflowY: "scroll" }}>
                        <h2>Create New Page</h2>
                        <br />
                        <div style={{ alignContent: "center", justifyContent: "center", textAlign: "center" }}>
                            <form className="create-form" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <div className="form-group" id="heading">
                                    <label><h3>Heading</h3>
                                        <input className="form-control" type="text" name="heading" value={this.state.page.heading} onChange={this.handleChange} placeholder="Enter heading here..." />
                                        <p style={{ color: "red", display: this.state.page.heading.length > 2 ? "none" : "block" }}>Heading requires at least 3 characters</p>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label><h3>Text Body</h3>
                                        <textarea rows="10" className="form-control" name="text" value={this.state.page.text} onChange={this.handleChange} placeholder="Enter text here..." />
                                        <p style={{ color: "red", display: this.state.page.text.length > 2 ? "none" : "block" }}>Text requires at least 3 characters</p>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <h3>Category</h3>
                                    <select className="form-control" name="category_id" value={this.state.page.category_id} onChange={this.handleChange}>
                                        <option disabled hidden value="-1">--Select a category--</option>
                                        {itemsNew}
                                    </select>
                                    <p style={{ color: "red", display: this.state.page.category_id != -1 ? "none" : "block" }}>Category is required</p>
                                </div>
                                <div>
                                    <button onClick={this.addStat}>Add Stat</button>
                                </div>
                                <div>
                                    Stat fields
                                    {statFields}
                                </div>
                                <div className="form-group">
                                    <label><h3>Images</h3>
                                        <input multiple name="photos" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.photos} onChange={this.handleChangeNew} />
                                    </label>
                                    <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                                </div>
                                {
                                    this.state.page.images != null ?
                                        <div>
                                            <div>
                                                Current Images
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
                                            Currently Selected Images
                                            <div>
                                                {currentImages}
                                            </div>
                                        </div>
                                        : null
                                }

                                <div className="form-group">
                                    <label><h3>Audio Files</h3>
                                        <p>Optional field. Add sounds here of the animal.</p>
                                        <input multiple name="audios" className="form-control" type="file" accept="audio/*" ref={this.audios} onChange={this.handleChangeNew} />
                                    </label>
                                </div>
                                {
                                    this.state.page.audios != null ?
                                        <div>
                                            Current audios
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
                                            Currently selected audio files
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
                                <button className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div style={{ height: "100%" }}>
                        <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "40vh auto", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: "url('" + (this.state.photos != null ? URL.createObjectURL(this.photos.current.files[0]) : "") + "')" }}>
                            <div className="no-scrollbar" style={{ overflowY: "scroll", height: "100vh", width: "45vh", padding: "10px", overflowX: "hidden", opacity: "0.8", backgroundImage: "linear-gradient( rgb( 49, 0, 84 ), rgb( 71, 0, 122 ) )" }}>
                                <h1>{this.state.page.heading}</h1>
                                <p className="btn btn-primary">Back to home</p>
                                {this.state.page.stats.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>{statTableItems}</div> : null}
                                <p>{this.state.page.text}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withAuth( Create );