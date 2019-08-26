import React from "react";
import Axios from "axios";

import {Redirect} from "react-router-dom";

export default class EditPage extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            loading: true,
            pageData: {},
            heading: "",
            text: "",
            categories: {},
            redirect: false,
            category_id: -1,
            id: -1,
        };

        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );

        this.photos = React.createRef();
    }

    componentDidMount()
    {
        let {id} = this.props.match.params;
        fetch( "./pages/" + id )
        .then( response => response.json() )
        .then( data => {
            let { id, heading, text, category, category_id } = data;
            this.setState( { heading: heading, text: text, category_id: category_id, id: id } )
        });

        fetch("./pages/allCategories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data, loading: false }));
    }

    handleSubmit( event )
    {
        event.preventDefault();

        let formData = new FormData();
        formData.append( "_method", "PUT" );
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

            //console.log( file );


            formData.append( "photos[]", file, file.name );
        }

        // // console.log( this.photos.current.files.map( file => {
        // //     return(
        // //         file
        // //     );
        // // }));

        // console.log( Array.from( this.photos.current.files ) );

        // // let filesNew = Array();

        // // for( var i = 0; i < this.photos.current.files.length; ++i )
        // // {
        // //     console.log( "ree" );
        // //     console.log( this.photos.current.files[ i ] );

        // //     filesNew.push( this.photos.current.files[ i ] );
        // // }

        // // console.log( filesNew );

        // let data = {
        //     heading: this.state.heading,
        //     text: this.state.text,
        //     category_id: this.state.category_id,
        //     photos: Array.from( this.photos.current.files ),
        // }

        // let files1 = Array.from( this.photos.current.files );

        // for( var i = 0; i < files1.length; ++i )
        // {
        //     data.append( "photos[]", files1[ i ], files1[ i ].name );
        // }

        Axios.post( "./pages/" + this.state.id, formData )
        .then( response => console.log( response ) )
        .catch( err => console.log( err.response.data ) );

        // Axios({
        //     url: "./pages/" + this.state.id,
        //     method: "POST",
        //     headers: {
        //     },
        //     formData
        // })
        //     .then(response => {
        //         console.log("from form submit ", response);
        //         this.setState({ redirect: false });
        //     })
        //     .catch(err => console.log(err.response.data));

    }

    handleChange( event )
    {
        let { name, value } = event.target;

        this.setState( { [name]: value } );
    }

    render()
    {
        if( this.state.redirect )
        {
            return
            (
                <Redirect to="/admin" />
            );
        }

        if( this.state.loading )
        {
            return(
                <div>
                    Loading...
                </div>
            );
        }
        else
        {
            let items = this.state.categories.map(item => {
                return (
                    <div>
                        <label>{item.name}
                            <input type="radio" name="category_id" value={item.id} checked={this.state.category_id == item.id} onChange={this.handleChange} />
                        </label>
                        <br />
                    </div>
                )
            });

            return(
                <div>
                    Edit Page {this.props.match.params.id}
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
                                <button>Submit</button>
                            </form>
                        </div>
                </div>
            )
        }
        
    }
}