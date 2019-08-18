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
                    return (
                        <div data-role="tile" data-effect="animate-slide-up" data-size="large" style={{ backgroundColor: "green" }}>
                            <div className="slide" data-cover="http://1.bp.blogspot.com/-YHRtmqsa8QA/Tw9yZAEqycI/AAAAAAAAACw/VGkBwvpWOEg/s1600/Animals_Birds_Kiwi_bird_026192_.jpg"><h3>Kiwi</h3></div>
                            <div className="slide" data-cover="http://nzbirdsonline.org.nz/sites/all/files/1200468kpo10.jpg"><h3>Kakapo</h3></div>
                            <div className="slide" data-cover="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg"><h3>Kea</h3></div>
                            <span className="branding-bar">Birds</span>
                        </div>
                    );
                });

                //Making the main content view have a grid of tiles

                return (
                    <div style={{ display: "grid" }}>
                        {pagesList}
                    </div>
                );
            }
        }
    }
}