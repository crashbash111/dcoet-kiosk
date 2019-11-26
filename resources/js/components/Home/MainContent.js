import React from "react";
import Loader from "../Loader";
import { Redirect, withRouter } from "react-router-dom";
import { Spring } from 'react-spring/renderprops';
import Tile from './Tile';

class MainContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
            games: [],
            videos: [],
            ppts: [],
            redirectId: -1,
            redirect: false,
            redirectType: -1 //0 for page, 1 for game, 2 for video
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("./api/pages")
            .then(response => response.json())
            .then(data => this.setState({ pages: data }));
        fetch("./api/games")
            .then(response => response.json())
            .then(data => this.setState({ games: data }));
        fetch("./api/videos")
            .then(response => response.json())
            .then(data => this.setState({ videos: data }));
        fetch("./api/powerpoints")
            .then(response => response.json())
            .then(data => this.setState({ ppts: data, loading: false }));
    }

    fetchData() {

    }

    handleClick(i) {
        //this.setState({ redirectType: 0, redirectId: i, redirect: true });
        this.props.history.push(`/kiosk/${i}`);
    }

    handleGameClick(i) {
        if (i == 1) {
            window.location = "./gameGame";
        }
        if (i == 2) {
            window.location = "./findingGame";
        }
    }

    handleVideoClick(i) {
        //this.setState({ redirectType: 2, redirectId: i, redirect: true });
        this.props.history.push(`/videos/${i}`);
    }

    render() {

        if (this.state.redirect) {
            let target;
            if (this.state.redirectType == 2) {
                target = "/videos/" + this.state.redirectId;
            }
            else {
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

                // if (this.props.activeCategory == -2) {
                //     var gamesList = this.state.games.map(item => {
                //         if( item.id == 3 ) return null;
                //         return (
                //             <Tile key={ item.id + 10000 } item={ item } linkOverride={ item.id == 1 ? "/gameGame" : "/findingGame" } handleClick={ this.handleGameClick } imgOverride={ "./storage/game_cover_images/" + item.image_path } flag="game" />

                //             // <div key={item.id} onClick={() => window.open("../Resources/Game/index.html", "_blank")} data-role="tile" data-cover={ item.image_path } data-size="large" style={{ backgroundColor: "black" }}>
                //             //     <h3 style={{ textShadow: "2px 2px #111111" }}>{item.name}</h3>
                //             // </div>
                //         );
                //     });

                //     return (
                //         <div className="no-scrollbar" style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                //             {gamesList}
                //         </div>
                //     );
                // }

                // if( this.props.activeCategory == -3 )
                // {
                //     var videoList = this.state.videos.map( item => {
                //         return (
                //             <Tile key={ item.id + 100000 } linkOverride={`#/videos/${item.id}`} item={ item } handleClick={ this.handleVideoClick } imgOverride={ ( (item.thumbnail_path == null || item.thumbnail_path == "" ) ? "./storage/video_thumbnails/nothumb.png" : `./storage/video_thumbnails/${item.thumbnail_path}` ) } flag="video" />
                //         );
                //     });

                //     return (
                //         <div className="no-scrollbar" style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                //             { videoList }
                //         </div>
                //     );
                // }


                // else if( this.props.activeCategory == -4 )
                // {
                //     var pptList = this.state.ppts.map( item => {
                //         console.log(`./storage/ppt_images/${item.ppt_images[0].filepath}`);
                //         return (
                //             <Tile key={ item.id + 10000000 } linkOverride={`#/powerpoints/${item.id}`} item={ item } handleClick={ null } imgOverride={ `./storage/ppt_images/${item.ppt_images[0].filepath}` } flag="ppt" />
                //         );
                //     });

                //     return (
                //         <div className="no-scrollbar" style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                //             { pptList }
                //         </div>
                //     );
                // }


                var pagesList = Array();

                pagesList.push(...this.state.games.map(item => {
                    if (item.id == 3) return null;
                    return (
                        <Tile key={item.id + 10000} category={-2} item={item} linkOverride={item.id == 1 ? "/gameGame" : "/findingGame"} handleClick={this.handleGameClick} imgOverride={"./storage/game_cover_images/" + item.image_path} flag="game" />

                        // <div key={item.id} onClick={() => window.open("../Resources/Game/index.html", "_blank")} data-role="tile" data-cover={ item.image_path } data-size="large" style={{ backgroundColor: "black" }}>
                        //     <h3 style={{ textShadow: "2px 2px #111111" }}>{item.name}</h3>
                        // </div>
                    );
                }));
                pagesList.push(...this.state.videos.map(item => {
                    return (
                        <Tile key={item.id + 100000} category={-3} linkOverride={`#/videos/${item.id}`} item={item} handleClick={this.handleVideoClick} imgOverride={((item.thumbnail_path == null || item.thumbnail_path == "") ? "/images/play_white.png" : `./storage/video_thumbnails/${item.thumbnail_path}`)} flag="video" />
                    );
                }));
                pagesList.push(...this.state.ppts.map(item => {
                    //console.log(`./storage/ppt_images/${item.ppt_images[0].filepath}`);
                    return (
                        <Tile key={item.id + 10000000} category={-4} linkOverride={`#/powerpoints/${item.id}`} item={item} handleClick={null} imgOverride={`./storage/ppt_images/${item.ppt_images[0].filepath}`} flag="ppt" />
                    );
                }));
                pagesList.push(...this.state.pages.map(item => {
                    //Checks for search in progress
                    // if (this.props.filter != "") {
                    //     if (!item.heading.toLowerCase().includes(this.props.filter.toLowerCase())) {
                    //         return null;
                    //     }
                    // }
                    // //only renders if active category is equal
                    // else if (this.props.activeCategory != item.category_id) {
                    //     return null;
                    // }
                    //renders tile providing above conditions are met
                    return (
                        <Tile key={item.id} category={item.category_id} item={item} handleClick={this.handleClick} />
                    );
                }));

                // if (this.props.activeCategory == -2) {
                //     pagesList = this.state.games.map(item => {
                //         if (item.id == 3) return null;
                //         return (
                //             <Tile key={item.id + 10000} item={item} linkOverride={item.id == 1 ? "/gameGame" : "/findingGame"} handleClick={this.handleGameClick} imgOverride={"./storage/game_cover_images/" + item.image_path} flag="game" />

                //             // <div key={item.id} onClick={() => window.open("../Resources/Game/index.html", "_blank")} data-role="tile" data-cover={ item.image_path } data-size="large" style={{ backgroundColor: "black" }}>
                //             //     <h3 style={{ textShadow: "2px 2px #111111" }}>{item.name}</h3>
                //             // </div>
                //         );
                //     });
                // }
                // else if (this.props.activeCategory == -3) {
                //     pagesList = this.state.videos.map(item => {
                //         return (
                //             <Tile key={item.id + 100000} linkOverride={`#/videos/${item.id}`} item={item} handleClick={this.handleVideoClick} imgOverride={((item.thumbnail_path == null || item.thumbnail_path == "") ? "./storage/video_thumbnails/nothumb.png" : `./storage/video_thumbnails/${item.thumbnail_path}`)} flag="video" />
                //         );
                //     });
                // }
                // else if (this.props.activeCategory == -4) {
                //     pagesList = this.state.ppts.map(item => {
                //         console.log(`./storage/ppt_images/${item.ppt_images[0].filepath}`);
                //         return (
                //             <Tile key={item.id + 10000000} linkOverride={`#/powerpoints/${item.id}`} item={item} handleClick={null} imgOverride={`./storage/ppt_images/${item.ppt_images[0].filepath}`} flag="ppt" />
                //         );
                //     });
                // }
                // else {
                //     pagesList = this.state.pages.map(item => {
                //         //Checks for search in progress
                //         if (this.props.filter != "") {
                //             if (!item.heading.toLowerCase().includes(this.props.filter.toLowerCase())) {
                //                 return null;
                //             }
                //         }
                //         //only renders if active category is equal
                //         else if (this.props.activeCategory != item.category_id) {
                //             return null;
                //         }
                //         //renders tile providing above conditions are met
                //         return (
                //             <Tile key={item.id} item={item} handleClick={this.handleClick} />
                //         );
                //     });
                // }

                console.log( pagesList );

                if (this.props.filter != "") {
                    pagesList = pagesList.map(item => {
                        if (item.props.item.heading != null) {
                            console.log( "found" );
                            if (!item.props.item.heading.toLowerCase().includes(this.props.filter.toLowerCase())) {
                                console.log( "doesn't match")
                                return null;
                            }
                        }
                        else if (item.props.item.title != null) {
                            if (!item.props.item.title.toLowerCase().includes(this.props.filter.toLowerCase())) {
                                return null;
                            }
                        }
                        else if (item.props.item.name != null) {
                            if (!item.props.item.name.toLowerCase().includes(this.props.filter.toLowerCase())) {
                                return null;
                            }
                        }
                        return item;
                    });
                }
                else {
                    console.log( this.props.activeCategory );
                    pagesList = pagesList.filter( m => m.props.category == this.props.activeCategory );
                }

                console.log( pagesList );

                //Making the main content view have a grid of tiles
                return (
                    <div className="no-scrollbar main-content-div">
                        {pagesList}
                    </div>
                );
            }
        }
    }
}

export default withRouter(MainContent);