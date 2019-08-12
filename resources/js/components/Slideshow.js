import React from "react";

export default class Slideshow extends React.Component
{
    constructor( props )
    {
        super( props );

        console.log( this.props );

        this.state = {
            images: this.props.images,
            index: 0,
        }

        setInterval( () => {
            this.setState( prevState => {
                return (
                    {
                        index: ( prevState.index + 1 ) % this.state.images.length
                    }
                )
            });
            console.log( " " + this.state.images[ this.state.index ] );
        }, 3000 );
    }

    render()
    {
        return(
            <div className="slideshow" style={{ height: "700px", backgroundImage: "url('"+ this.state.images[ this.state.index ] +"')"}}>
                
            </div>
        );
    }
}