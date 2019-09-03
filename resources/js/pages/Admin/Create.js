import React from "react";
import Axios from "axios";

import { Redirect } from "react-router-dom";
import { Url } from "url";

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: null,
            loading: true,
            categories: [],
            redirect: false,
            photos: null,
            audios: null,
            statsToRemove: [],
            editMode: (this.props.match != null && this.props.match.params != null && this.props.match.params.id != null),
        }

        this.handleChange = this.handleChange.bind(this);

        this.handleChangeNew = this.handleChangeNew.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.change = this.change.bind(this);

        this.addStat = this.addStat.bind(this);
        this.handleStatNameChange = this.handleStatNameChange.bind(this);
        this.handleStatValueChange = this.handleStatValueChange.bind(this);
        this.handleStatRemove = this.handleStatRemove.bind(this);

        this.photos = React.createRef();
        this.audios = React.createRef();
    }

    change(event) {
        console.log(event.target.files);
    }

    handleChangeNew(event) {
        const { name, value, type, files } = event.target;

        this.setState({ page: { ...this.state.page, [name]: files } });

        console.log(this.state);
    }

    addStat(event) {
        event.preventDefault();
        this.setState(
            {
                stats: this.state.stats.concat([{ id: -1, name: "", value: "" }])
            }
        );
        console.log(this.state);
    }

    handleStatNameChange = idx => event => {
        let newStats = this.state.page.stats.map((stat, sidx) => {

            if (idx !== sidx) return stat;
            return { ...stat, name: event.target.value };

        });

        this.setState( { page: { ...this.state.page, stats: newStats } } );

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
        this.setState(
            { page: { ...this.state.page, stats: this.state.page.stats.filter((s, sidx) => idx !== sidx) }
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
        let formData = new FormData();
        if (this.state.editMode) {
            formData.append("_method", "PUT");
        }
        formData.append("heading", this.state.page.heading);
        formData.append("text", this.state.page.text);
        formData.append("category", this.state.page.category_id);

        var files = this.photos.current.files;

        for (var i = 0; i < files.length; ++i) {
            var file = files[i];

            if (!file.type.match("image.*")) {
                continue;
            }

            console.log(file);

            formData.append("photos[]", file, file.name);
        }

        var stats = this.state.page.stats;

        for (var i = 0; i < stats.length; ++i) {
            var stat = stats[i];

            formData.append( "statsIds[]", stat.id );
            formData.append("statsNames[]", stat.name);
            formData.append("statsValues[]", stat.value);

            console.log(stat);
        }

        //formData.append( "photos[]", Array.from( this.photos.current.files ) );
        //console.log(this.photos.current.files);
        Axios({
            url: "./pages" + ( this.state.editMode ? "/" + this.props.match.params.id : "" ),
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: formData
        })
            .then(response => {
                console.log("from form submit ", response);
                this.setState({ redirect: false });
            })
            .catch(err => console.log(err.response.data));
    }

    componentDidMount() {
        this.setState({ loading: true });

        fetch("./pages/allCategories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));

        if (this.state.editMode) {

            fetch("./pages/" + this.props.match.params.id)
                .then(response => response.json())
                .then(data => { this.setState({ page: data }); console.log(data); });
        }
        else {
            this.setState({ page: { heading: "", text: "", image: [], category_id: -1, stats: [] }, loading: false });
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
                <div>
                    <label>{item.name}
                        <input type="radio" name="category_id" value={item.id} checked={this.state.page.category_id == item.id} onChange={this.handleChange} />
                    </label>
                    <br />
                </div>
            )
        });

        let count = 0;

        let statFields = this.state.page.stats.map((item, idx) => {

            count++;

            return (
                <div>
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
                            <button style={{ width: "100%", height: "100%" }} className="btn btn-danger" onClick={this.handleStatRemove(idx)}>Delete</button>
                        </div>
                    </div>
                </div>
            );
        });

        let statTableItems = this.state.page.stats.map(item => {
            return (
                <div>
                    <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                    <p style={{ textAlign: "center" }}>{item.value}</p>
                </div>
            );
        });

        let currentImages = null;

        if (this.photos.current != null) {

            currentImages = Array();

            let x = this.photos.current.files.length;

            for( var y = 0; y < x; ++y )
            {
                let imgPath = URL.createObjectURL( this.photos.current.files[ y ] );
                currentImages.push( <div>
                    <img src={imgPath} style={{ height: "100px" }} />
                </div> );
            }
        }

        let oldImages = null;

        if( this.state.page.image != null && this.state.page.image.length > 0 )
        {
            oldImages = Array();

            oldImages = this.state.page.image.map( item => {

                let imgPath = "./storage/kiosk_images/" + item.image_name;

                return(
                    <div>
                        <img src={ imgPath } style={{ width: "100px" }} />
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
                                <div className="form-group">
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
                                    {items}
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
                                    this.state.page.image != null ?
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
                                <button>Submit</button>
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

        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <h2>Create New Page</h2>
                        <br />
                        <div style={{ alignContent: "center", justifyContent: "center", textAlign: "center" }}>
                            <form className="create-form" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <div className="form-group">
                                    <label><h3>Heading</h3>
                                        <input className="form-control" type="text" name="heading" value={this.state.heading} onChange={this.handleChange} placeholder="Enter heading here..." />
                                        <p style={{ color: "red", display: this.state.heading.length > 2 ? "none" : "block" }}>Heading requires at least 3 characters</p>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label><h3>Text Body</h3>
                                        <textarea rows="10" className="form-control" name="text" value={this.state.text} onChange={this.handleChange} placeholder="Enter text here..." />
                                        <p style={{ color: "red", display: this.state.text.length > 2 ? "none" : "block" }}>Text requires at least 3 characters</p>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <h3>Category</h3>
                                    {items}
                                    <p style={{ color: "red", display: this.state.category_id != -1 ? "none" : "block" }}>Category is required</p>
                                </div>
                                <div className="form-group">
                                    <label><h3>Images</h3>
                                        <input multiple name="photos" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.photos} onChange={this.handleChangeNew} />
                                    </label>
                                    <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                                </div>
                                <div className="form-group">
                                    <label><h3>Audio Files</h3>
                                        <p>Optional field. Add sounds here of the animal.</p>
                                        <input multiple name="audios" className="form-control" type="file" accept="audio/*" ref={this.audios} onChange={this.handleChangeNew} />
                                    </label>
                                </div>
                                {/*<br />
                                <br />
                                <hr />
                                <br />
                                <br />
                                <div className="form-group">
                                    <label><h3>Image #1</h3>
                                        <input name="file1" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.image_1} onChange={this.handleChange} />
                                    </label>
                                    <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                                </div>
                                <div className="form-group">
                                    <label><h3>Image #2</h3>
                                        <input name="file2" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.image_2} onChange={this.handleChange} />
                                    </label>
                                    <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                                </div>
                                <div className="form-group">
                                    <label><h3>Image #3</h3>
                                        <input name="file3" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.image_3} onChange={this.handleChange} />
                                    </label>
                                    <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                                </div>
                                <div className="form-group">
                                    <label><h3>Image #4</h3>
                                        <input name="file4" className="form-control" type="file" accept="image/png, image/jpeg" ref={this.image_4} onChange={this.handleChange} />
                                    </label>
                                    <p style={{ color: "orange", display: this.state.file == null ? "none" : "block" }}><i>Note that the best image size is above 512x512</i></p>
                                </div>*/}
                                <button>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-4">
                        <h1>Preview</h1>
                        <div style={{ border: "3px solid #ffffff", width: "100%", height: "700px", padding: "0" }}>
                            <div className="row" style={{ height: "660px" }}>
                                <div className="col-4" style={{ padding: "20px" }}>
                                    <div className="no-scrollbar" style={{ overflowY: "scroll", maxHeight: "500px" }}>
                                        <h4 style={{ textAlign: "center" }}>{this.state.heading != "" ? this.state.heading : <i>Heading</i>}</h4>
                                        <p>{this.state.text != "" ? this.state.text : <i>Text body goes here</i>}</p>
                                    </div>
                                </div>
                                <div className="col-8 kiosk-image-div" style={{ backgroundImage: "url('" + this.state.img + "')" }}>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}