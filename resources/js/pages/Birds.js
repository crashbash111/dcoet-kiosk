import React from "react";

export default class Birds extends React.Component
{
    constructor( props )
    {
        super( props );
        console.log( this.props );
        this.state = {
            bird: {},
            loading: true,
            index: 0,
            opacity: 1,
        };

        this.handleClick = this.handleClick.bind( this );
        this.fade = this.fade.bind( this );
    }

    componentDidMount()
    {
        console.log( this.props.match.params.id );
        this.setState( { loading: true } );
        fetch( ( "./pages/" + this.props.match.params.id ) )
        .then( response => response.json() )
        .then( data => this.setState( { bird: data, loading: false } ) );
    }

    fade()
    {
        this.setState( prevState => {
            return(
                { opacity: prevState.opacity - 0.04 }
            );
        });
    }

    handleClick( event )
    {
        var t = setInterval( this.fade, 10 );
        setTimeout( () => {
            clearInterval( t );
            this.setState( { opacity: 1 } );
            this.setState( prevState => {
                return(
                    { index: ( this.state.index + 1 ) % this.state.bird.images.length }
                );
            });
        }, 250 );
        console.log( "e" );
    }

    render()
    {
        const {params} = this.props.match;
        const {id} = params;
        return(
            <div>
                <div className="row" style={{ height: "900px"}}>
                    <div className="col-4" style={{ position: "relative" }}>
                        <div className="kiosk-panel no-scrollbar">
                            <h2>{this.state.loading ? "Loading..." : this.state.bird.heading }</h2>
                            <p>{this.state.loading ? "Loading..." : this.state.bird.text }</p>
                        </div>
                        <div style={{ position: "absolute", left: "0", bottom: "0", height: "200px", width: "100%", backgroundImage: "linear-gradient( rgba( 0, 0, 0, 0 ), rgba( 0, 0, 0, 0.9 ), rgba( 0, 0, 0, 1 ) )"}}></div>
                    </div>
                    <div onClick={ this.handleClick } className="col-8 kiosk-image-div" style={{ opacity: this.state.opacity, backgroundImage: "url('./storage/kiosk_images/" +
                    ( this.state.loading ? "./images/loading.gif" : this.state.bird.images[ this.state.index ].image_name )
                    + "')", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                        <div style={{ width: "700px", height: "900px" }}></div>
                    </div>
                </div>
            </div>
        );
    }
}