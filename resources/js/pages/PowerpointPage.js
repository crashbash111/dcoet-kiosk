import React from "react";
import {withRouter} from "react-router-dom";

import Loader from "../components/Loader";
import ErrorCatch from "../components/ErrorCatch";

class PowerpointPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            title: "",
            photos: [],
            slideIndex: -1,
            maxIndex: -1,
        };

        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });

        fetch("./api/powerpoints/" + this.props.match.params.id)
            .then(response => response.json())
            .then(data => this.setState({
                title: data.title,
                photos: data.ppt_images,
                slideIndex: 0,
            }))
            .then(() => {
                this.setState({ maxIndex: this.state.photos.length, loading: false })
            })
            .catch( error => { console.log( error ); this.setState( { error: true } ) } );
    }

    handleLeftClick(event) {
        this.setState(prevState => {

            if (prevState.slideIndex > 0) {
                return ({
                    slideIndex: prevState.slideIndex - 1
                });
            }
        });
    }

    handleRightClick(event) {
        this.setState(prevState => {

            if (prevState.slideIndex < this.state.maxIndex - 1) {
                return ({
                    slideIndex: prevState.slideIndex + 1
                });
            }
        });
    }

    render() {
        if( this.state.error )
        {
            return <ErrorCatch error={ true } newUrl={ "/" } />
        }

        if (this.state.loading)
        {
            return (
                <Loader />
            );
        }

        return (
            <div style={{ display: "grid", gridTemplateColumns: "20% auto 20%", width: "100%", height: "100%", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center", backgroundImage: "url( './storage/ppt_images/" + this.state.photos[ this.state.slideIndex ].filepath + "' )" }}>
                <button style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }} onClick={ (event) =>{ this.props.history.push( "/-4" ) }} className="btn btn-outline-dark btn-square">Back to Kiosk</button>
                <div style={{ backgroundColor: "blue", opacity: "0", height: "100%" }} onClick={this.handleLeftClick}></div>
                <div style={{ backgroundColor: "white", opacity: "0", height: "100%" }}></div>
                <div style={{ backgroundColor: "red", opacity: "0", height: "100%" }} onClick={this.handleRightClick} ></div>
            </div>
        );
    }
}

export default withRouter( PowerpointPage );