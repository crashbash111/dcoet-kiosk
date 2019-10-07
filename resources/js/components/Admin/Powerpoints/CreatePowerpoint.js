import React from "react";
import Axios from "axios";
import {Redirect} from "react-router-dom";

export default class CreatePowerpoint extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind( this );

        this.pptImages = React.createRef();
    }

    handleChange(event) {
        let { name, value } = event.target;

        this.setState({
            [name]: value,
        })
    }

    handleSubmit( event )
    {
        event.preventDefault();

        let formData = new FormData();

        formData.append( "token", localStorage.getItem( "id_token" ) );

        formData.append( "title", this.state.title );

        var files = this.pptImages.current.files;

        for( var i = 0; i < files.length; ++i )
        {
            var file = files[ i ];

            if( !file.type.match( "image.*" ) )
            {
                continue;
            }

            formData.append( "photos[]", file, file.name );
        }

        Axios( {
            url: "./api/powerpoints",
            method: "POST",
            headers: {
            },
            data: formData,
        })
        .then( response => {
            console.log( response );
            this.setState( { redirect: true } );
        })
        .catch( error => console.log( error.response.data ) );
    }

    render() {
        if( this.state.redirect )
        {
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
                    <button className="btn btn-primary">Submit</button>
                </form>

                <div style={{ width: "200vh" }}>
                    {imgList}
                </div>
            </div>
        );
    }
}