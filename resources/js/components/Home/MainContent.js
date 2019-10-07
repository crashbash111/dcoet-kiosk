import React from "react";
import Loader from "../Loader";
import { Redirect } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';
import Tile from './Tile';

export default class MainContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
            games: [],
            videos: [],
            redirectId: -1,
            redirect: false,
            redirectType: -1 //0 for page, 1 for game, 2 for video
        };

        this.handleClick = this.handleClick.bind( this );
        this.handleVideoClick = this.handleVideoClick.bind( this );
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch( "./api/pages" )
            .then(response => response.json())
            .then(data => this.setState({ pages: data }));
        fetch("./api/games")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
        fetch( "./api/videos" )
        .then( response => response.json() )
        .then( data => this.setState( { videos: data, loading: false } ) );
    }

    fetchData() {

    }

    handleClick(i) {
        this.setState({ redirectType: 0, redirectId: i, redirect: true });
    }

    handleGameClick( i ) {
        if( i == 1 )
        {
            window.location = "./gameGame";
        }
        if( i == 2 )
        {
            window.location = "./findingGame";
        }
    }

    handleVideoClick( i ) {
        this.setState({ redirectType: 2, redirectId: i, redirect: true });
    }

    render() {

        if (this.state.redirect) {
            let target;
            if( this.state.redirectType == 2 )
            {
                target = "/videos/" + this.state.redirectId;
            }
            else
            {
                target = "/kiosk/" + this.state.redirectId;
            }
            
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

                if (this.props.activeCategory == -2) {
                    var gamesList = this.state.games.map(item => {
                        return (
                            <Tile key={ item.id + 10000 } item={ item } handleClick={ this.handleGameClick } imgOverride={ "./storage/game_cover_images/" + item.image_path } flag="game" />

                            // <div key={item.id} onClick={() => window.open("../Resources/Game/index.html", "_blank")} data-role="tile" data-cover={ item.image_path } data-size="large" style={{ backgroundColor: "black" }}>
                            //     <h3 style={{ textShadow: "2px 2px #111111" }}>{item.name}</h3>
                            // </div>
                        );
                    });

                    return (
                        <div style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                            {gamesList}
                        </div>
                    );
                }

                if( this.props.activeCategory == -3 )
                {
                    var videoList = this.state.videos.map( item => {
                        return (
                            <Tile key={ item.id + 100000 } item={ item } handleClick={ this.handleVideoClick } imgOverride={ "./storage/video_thumbnails/nothumb.png" } flag="video" />
                        );
                    });

                    return (
                        <div style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                            { videoList }
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