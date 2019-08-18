import React from "react";
import { Link } from "react-router-dom";
import Slideshow from "../components/Slideshow";

export default class Layout extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            time: 30000,
        };

        this.click = this.click.bind( this );
        document.addEventListener( "click", () => {
            this.setState( { time: 30000 } )
        } );

        setInterval( () => { this.setState( prevState => {
            if( prevState.time > 10 )
                {
                    return(
                
                        {
                            time: prevState.time - 10
                        }
                    );
                }
                else
                {
                    return( {
                        time: 0
                    })
                }
            
        })}, 10 );
    }

    click( e )
    {
        console.log( "clicked" );
    }

    render()
    {
        return(
            <div>
                {this.props.children}
            </div>
        );

        if( this.state.time > 0 )
        {
            return(
                <div>
                    <h1>Deep Cove</h1>
                    {this.props.children}
                    <div style={{ marginRight: "0px" }}>
                        <Link to="/" className="btn btn-light" role="button">Home</Link>
                        <Link to="birds" className="btn btn-light" role="button">Birds</Link>
                        <Link to="admin" className="btn btn-light" role="button">Admin</Link>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <Slideshow images={ [
                    "https://thumbs-prod.si-cdn.com/83DQIwgykGY8VssIEYr8ft4SsPE=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/4a/9c/4a9c541a-4ee3-4844-b2c7-490530868a63/m1gr8h.jpg",
            "https://thebukitbrownexperience.files.wordpress.com/2012/06/birds-of-paradise.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/3/3b/Deep_Cove_in_Doubtful_Sound_in_front_of_Wilmot_Pass.jpg"
            ] } />
            )
        }
        
    }
}