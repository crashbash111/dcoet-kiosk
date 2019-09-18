import React from "react";
import Loader from "../Loader";
import { Redirect } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';
import Tile from "./Tile";
import ItemRow from "../Admin/ItemRow";

export default class MainContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
            games: [],
            redirectId: -1,
            redirect: false,
        };



        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("./pages/all")
            .then(response => response.json())
            .then(data => this.setState({ pages: data }));

        fetch("./allGames")
            .then(response => response.json())
            .then(data => this.setState({ games: data, loading: false }));

        //console.log(this.state.games);
    }

    fetchData() {

    }

    handleClick(i) {
        this.setState({ redirectId: i, redirect: true });
    }



    render() {

        if (this.state.redirect) {
            let target = "/kiosk/1/" + this.state.redirectId;
            return <Redirect to={target} />
        }

        // if (this.props.activeCategory == -1) {
        //     return (
        //         <div className="homeslideshow">
        //             <video loop={true} autoPlay={true}>
        //                 <source type="video/mp4" data-reactid=".0.1.0.0.0" src="./storage/kiosk_images/181129_DC_Banner_Video_Cropped.mp4"/>
        //             </video>
        //         </div>
        //     );
        // }

        if (this.state.pages == null) {
            return (
                <div>Main Content</div>
            );
        }
        else {
            if (this.state.loading) {
                return (
                    <Loader />
                )
            }
            else {

                if (this.props.activeCategory == 999) {
                    var gamesList = this.state.games.map(item => {
                        //console.log(item.img);
                        return (
                            <div key={item.id} onClick={() => window.open("../Resources/Game/index.html", "_blank")} data-role="tile" data-cover="./Game/assets/images/background.png" data-size="large" style={{ backgroundColor: "black" }}>
                                <h3 style={{ textShadow: "2px 2px #111111" }}>{item.Name}</h3>
                            </div>
                        );
                    });

                    return (
                        <div style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>

                            {gamesList}

                        </div>

                    );
                }

                //renders each individual tile
                var pagesList = this.state.pages.map(item => {
                    //Checks for search in progress
                    if (this.props.filter != "") {
                        if (!item.heading.toLowerCase().includes(this.props.filter.toLowerCase())) {
                            return null;
                        }
                    }
                    //only renders if active category is equal
                    else if (this.props.activeCategory != item.category_id) {
                        return null;
                    }

                    //renders tile providing above conditions are met
                    return (
                        <Tile key={item.id} item={item} handleClick={this.handleClick} />
                    );
                });

                //Making the main content view have a grid of tiles
                return (
                    <div className="no-scrollbar" style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                        {pagesList}
                    </div>
                );
            }
        }
    }
}