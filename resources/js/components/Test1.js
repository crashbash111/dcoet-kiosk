import React, {Component} from "react";
import ReactDOM from "react-dom";

export default class Test1 extends Component
{
    constructor()
    {
        super();
        this.state = {
            bird: {},
            loading: false,
            colourOne: { r: 0, g: 91, b: 237 },
            colourTwo: { r: 0, g: 39, b: 102 },
            targetColour1: { r: 209, g: 24, b: 0 },
            targetColour2: { r: 105, g: 18, b: 6 },
            colourIndex: 0
        };
        this.updateColour = this.updateColour.bind( this );
        this.updateTargetColour = this.updateTargetColour.bind( this );
    }

    componentDidMount()
    {
        this.setState( { loading: true } );
        fetch( "/data1" )
            .then( response => response.json() )
            .then( data => this.setState( { bird: data, loading: false } ) );
        
        setInterval( this.updateColour, 200 );
        setInterval( this.updateTargetColour, 10000 );
    }

    updateTargetColour()
    {
        const targetColours = [ [ { r: 0, g: 91, b: 237 }, { r: 0, g: 39, b: 102 } ], [ { r: 209, g: 24, b: 0 }, { r: 105, g: 18, b: 6 } ] ];

        this.setState( {
            colourIndex: ( this.state.colourIndex >= targetColours.length - 1 ? 0 : this.state.colourIndex + 1 ),
            targetColour1: {
                r: targetColours[ this.state.colourIndex ][ 0 ].r,
                g: targetColours[ this.state.colourIndex ][ 0 ].g,
                b: targetColours[ this.state.colourIndex ][ 0 ].b },
            targetColour2: {
                r: targetColours[ this.state.colourIndex ][ 1 ].r,
                g: targetColours[ this.state.colourIndex ][ 1 ].g,
                b: targetColours[ this.state.colourIndex ][ 1 ].b }
        });
        console.log( this.state.targetColour1 );
    }

    updateColour()
    {
        const speed = 1;

        let r1 = this.state.colourOne.r > this.state.targetColour1.r ? -speed : speed;
        let g1 = this.state.colourOne.g > this.state.targetColour1.g ? -speed : speed;
        let b1 = this.state.colourOne.b > this.state.targetColour1.b ? -speed : speed;

        let r2 = this.state.colourTwo.r > this.state.targetColour2.r ? -speed : speed;
        let g2 = this.state.colourTwo.g > this.state.targetColour2.g ? -speed : speed;
        let b2 = this.state.colourTwo.b > this.state.targetColour2.b ? -speed : speed;

        this.setState( prevState => {
            return (
                {
                    colourOne:
                    {
                        r: prevState.colourOne.r + r1,
                        g: prevState.colourOne.g + g1,
                        b: prevState.colourOne.b + b1
                    },
                    colourTwo:
                    {
                        r: prevState.colourTwo.r + r2,
                        g: prevState.colourTwo.g + g2,
                        b: prevState.colourTwo.b + b2
                    }
                }
            )
        })
    }

    render()
    {
        if( this.state.loading )
        {
            return (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX( -50% ) translateY( -50% )" }}>
                    <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" />
                </div>
            )
        }
        else
        {
        return (
            <div>
                <div>
                    <div className={"row"} style={{ height: "100%", width: "100%", padding: "0px" }}>
                        <div className="col-4" style={{ color: "white", backgroundColor: "red", backgroundImage: "linear-gradient( rgb( " +
                            this.state.colourOne.r + ", " +
                            this.state.colourOne.g + ", " +
                            this.state.colourOne.b + " ), rgb( " +
                            this.state.colourTwo.r + ", " +
                            this.state.colourTwo.g + ", " +
                            this.state.colourTwo.b + " ) )", padding: "100px" }}>
                            <h2 style={{ fontSize: "75px", textAlign: "center" }}>{ this.state.bird.heading }</h2>
                            <p style={{ fontSize: "20px", textAlign: "left" }}>{ this.state.bird.text }</p>
                            <div style={{ marginTop: "50%", textAlign: "center" }}>
                                <h3 style={{ fontSize: "55px" }}>Bird Call</h3>
                                <img style={{ width: "100px", height: "100px" }} src="./images/play_white.png" />
                            </div>
                        </div>
                        <div className="col-8" style={{ padding: "0px" }}>
                            <div style={{ backgroundImage: "url(" + this.state.bird.imgUrl + ")", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%" }}>

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    { this.state.loading ? <h2>Loading...</h2> : <h2>{this.state.bird.name}</h2> }
                </div>
            </div>
        )
        }
    }
}

if( document.getElementById( 'test1' ) )
{
    ReactDOM.render( <Test1 />, document.getElementById( 'test1' ) );
}