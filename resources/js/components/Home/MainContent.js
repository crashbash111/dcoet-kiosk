import React from "react";
import { Redirect } from "react-router-dom";

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
        fetch( "./pages/all" )
        .then(response => response.json())
        .then(data => this.setState({ pages: data }));

        fetch( "./allGames" )
        .then( response => response.json() )
        .then( data => this.setState( { games: data, loading: false } ) );

        console.log( this.state.games );
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

        if (this.props.activeCategory == -1) {
            return (
                <div>
                    Select a category to get started
                </div>
            );
        }

        if (this.state.pages == null) {
            return (
                <div>Main Content</div>
            );
        }
        else {
            if (this.state.loading) {
                return (
                    <h1>Loading...</h1>
                )
            }
            else {

                if( this.props.activeCategory == 999 )
                {
                    var gamesList = this.state.games.map( item => {
                        console.log( item.img );
                        return(
                            <div onClick={() => this.handleClick(item.id)} data-role="tile" data-effect="animate-slide-up" data-size="large" style={{ backgroundColor: "black" }}>
                                <div className="slide" data-cover="https://thekaleidoscope.org/wp-content/uploads/2018/12/Calculus.jpeg"><h3 style={{ textShadow: "2px 2px #111111" }}>{ item.Name }</h3></div>
                                <div className="slide" data-cover="https://thekaleidoscope.org/wp-content/uploads/2018/12/Calculus.jpeg"><h3 style={{ textShadow: "2px 2px #111111" }}>{ item.Name }</h3></div>
                            </div>
                        );
                    });

                    return(
                        <div style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                            
                            {gamesList}
                            
                        </div>
                        
                    );
                }

                var pagesList = this.state.pages.map(item => {

                    if( this.props.activeCategory != item.category_id )
                    {
                        return null;
                    }

                    if (this.props.filter != "") {
                        if (!item.heading.toLowerCase().includes(this.props.filter.toLowerCase())) {
                            return null;
                        }
                    }

                    let images = item.images.map(img => {

                        let imgName = "./storage/kiosk_images/" + img.image_name;

                        return (
                            <div className="slide" data-cover={imgName}><h3 style={{ textShadow: "2px 2px #111111" }}>{item.heading}</h3></div>
                        );
                    });

                    return (
                        <div onClick={() => this.handleClick(item.id)} data-role="tile" data-effect="animate-slide-up" data-size="large" style={{ backgroundColor: "green" }}>
                            {images}
                        </div>
                    );
                });

                //Making the main content view have a grid of tiles

                return (
                    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                        {pagesList}
                    </div>
                );
            }
        }
    }
}