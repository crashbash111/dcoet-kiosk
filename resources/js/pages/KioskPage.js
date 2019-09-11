import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Spring } from 'react-spring/renderprops';
import { Palette } from 'react-palette';

export default class KioskPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            page: {},
            index: 0,
        };

        this.fade = this.fade.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });

        let { id } = this.props.match.params;

        fetch("./pages/" + id)
            .then(response => response.json())
            .then(data => this.setState({ page: data, loading: false }));
    }

    handleClick(event) {
        var t = setInterval(this.fade, 10);
        setTimeout(() => {
            clearInterval(t);
            this.setState({ opacity: 1 });
            this.setState(prevState => {
                return (
                    { index: (this.state.index + 1) % this.state.page.image.length }
                );
            });
        }, 250);
    }

    fade() {
        this.setState(prevState => {
            return (
                { opacity: prevState.opacity - 0.04 }
            );
        });
    }

    render() {

        if (this.state.loading) {
            return (
                <Loader />
            );
        }
        else {
            let imgPath;
            try //try
            {
                imgPath = "./storage/kiosk_images/" + this.state.page.images[this.state.index].image_name;
            }
            catch( e ) //catch
            {
                console.error( e.message ); //console log error
            }

            let statTableItems = this.state.page.stats.map(item => {
                return (
                    <div>
                        <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                        <p style={{ textAlign: "center" }}>{item.value}</p>
                    </div>
                );
            });

            let audioItems = this.state.page.audios.map(item => {
                let filePath = "./storage/audio_files/" + item.filepath;
                return (
                    <div>
                        <embed src={filePath} />
                    </div>
                )
            });

            


            return (
                <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                    {props => (
                        <div className="hideScroll" style={props}>
                            <Palette image={imgPath}>
                                {(palette) => (
                                    <div onClick={() => console.log(palette)} style={{ backgroundImage: "url(' " + imgPath + " ')", opacity: this.state.opacity, backgroundPosition: "center", backgroundSize: "cover" }}>
                                        <div className="hideScroll" style={{ height: "100vh", width: "45vh", padding: "10px", overflowY: "scroll", overflowX: "hidden", opacity: "0.8", backgroundColor: palette.lightVibrant }}>
                                            <h1 style={{ textAlign: "center", fontSize: "4em" }}>{this.state.page.heading}</h1>
                                            <div style={{ textAlign: "center" }}>
                                                <Link to="/" className="btn btn-lg btn-light" role="button">Back to Home</Link>
                                            </div>
                                            {this.state.page.stats.length > 0 ? <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>{statTableItems}</div> : null}
                                            {this.state.page.audios.length > 0 ? <div>Audios<div>{audioItems}</div></div> : null}
                                            <p style={{ fontSize: "25px" }}>{this.state.page.text}</p>
                                        </div>
                                    </div>
                                )}
                            </Palette>

                        </div>
                    )}
                </Spring>
            );
        }
    }
}