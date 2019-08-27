import React from "react";
import Axios from "axios";

import { Redirect } from "react-router-dom";

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heading: "",
            text: "",
            img: "",
            category_id: -1,
            categories: [],
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            redirect: false,
            photos: [],
        }

        this.handleChange = this.handleChange.bind(this);

        this.handleChangeNew = this.handleChangeNew.bind( this );

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.change = this.change.bind(this);
        this.image_1 = React.createRef();
        this.image_2 = React.createRef();
        this.image_3 = React.createRef();
        this.image_4 = React.createRef();

        this.photos = React.createRef();
    }

    change(event) {
        console.log(event.target.files);
    }

    handleChangeNew(event) {
        const { name, value, type, files } = event.target;

        console.log( "ree" );
        console.log( event.target.files );
        console.log( "tub" );

        this.setState({ [name]: files });
        console.log(files);

        console.log( "sam" );
        console.log( this.photos.current.files );
        console.log( "wheeze" );
    }

    handleChange(event) {
        const { name, value, type, files } = event.target;
        if (type == "file")
        {
            this.setState({ [name]: files[0] });
            console.log(files);
            console.log(files[0]);
        }
        else {
            this.setState({ [name]: value });
        }
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append("heading", this.state.heading);
        formData.append("text", this.state.text);
        formData.append("category", this.state.category_id);

        var files = this.photos.current.files;

        for( var i = 0; i < files.length; ++i )
        {
            var file = files[ i ];

            if( !file.type.match( "image.*" ) )
            {
                continue;
            }

            console.log( file );


            formData.append( "photos[]", file, file.name );
        }

        //formData.append( "photos[]", Array.from( this.photos.current.files ) );
        //console.log(this.photos.current.files);
        Axios({
            url: "./pages",
            method: "POST",
            headers: {
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
        fetch("./pages/allCategories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));
    }

    handleClick(e) {

    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/Admin" />
            );
        }

        let items = this.state.categories.map(item => {
            return (
                <div>
                    <label>{item.name}
                        <input type="radio" name="category_id" value={item.id} checked={this.state.category_id == item.id} onChange={this.handleChange} />
                    </label>
                    <br />
                </div>
            )
        })

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