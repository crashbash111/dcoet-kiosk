import React from "react";

export default class MainContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("./category/" + "1" + "/pages")
            .then(response => response.json())
            .then(data => this.setState({ pages: data, loading: false }));
    }

    fetchData() {

    }

    render() {
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
                var pagesList = this.state.pages.map(item => {

                    if( this.props.filter != "" )
                    {
                        if( !item.heading.toLowerCase().includes( this.props.filter.toLowerCase() ) )
                        {
                            return null;
                        }
                    }

                    let images = item.images.map( img => {

                        let imgName = "./storage/kiosk_images/" + img.image_name;

                        return(
                            <div className="slide" data-cover={ imgName }><h3 style={{ textShadow: "2px 2px #111111" }}>{ item.heading }</h3></div>
                        );
                    });

                    return (
                        <div data-role="tile" data-effect="animate-slide-up"  data-size="large" style={{ backgroundColor: "green" }}>
                            {images}
                        </div>
                    );
                });

                //Making the main content view have a grid of tiles

                return (
                    <div style={{ height: "100%", display: "grid", gridTemplateColumns: "auto auto auto", gridRowGap: "15px", overflowY: "scroll" }}>
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                        {pagesList}
                    </div>
                );
            }
        }
    }
}