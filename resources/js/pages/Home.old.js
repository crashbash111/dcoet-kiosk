import React from "react";
import {Link} from "react-router-dom";

export default class Home extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            categories: [],
        }
    }

    componentDidMount()
    {
        fetch( "./pages/allCategories" )
        .then( response => response.json() )
        .then( data => this.setState( { categories: data } ) );
    }

    render()
    {
        let categoryList = this.state.categories.map( item => {
            return(
                <div data-role="tile" data-size="medium" style={{ backgroundColor: "lightblue" }}>
                    <h3 style={{ textAlign: "center" }}>{ item.name }</h3>
                    <p>{ item.description }</p>
                </div>
            );
        });

        return(
            <div>
                <h2>Home</h2>
                <br />
                <br />
                <div className="container">
                    <h1 style={{ fontSize: "50px", textAlign: "center" }}>Come Explore Deep Cove!</h1>
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <h2>Featured</h2>
                            <br />
                            <div className="tiles-grid size-3">
                                    <div data-role="tile" data-effect="animate-slide-up" data-size="large" style={{ backgroundColor: "green" }}>
                                        <div className="slide" data-cover="http://1.bp.blogspot.com/-YHRtmqsa8QA/Tw9yZAEqycI/AAAAAAAAACw/VGkBwvpWOEg/s1600/Animals_Birds_Kiwi_bird_026192_.jpg"><h3>Kiwi</h3></div>
                                        <div className="slide" data-cover="http://nzbirdsonline.org.nz/sites/all/files/1200468kpo10.jpg"><h3>Kakapo</h3></div>
                                        <div className="slide" data-cover="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg"><h3>Kea</h3></div>
                                        <span className="branding-bar">Birds</span>
                                    </div>
                                <div data-role="tile" data-effect="animate-slide-down" data-size="medium" style={{ backgroundColor: "orange" }}>
                                    <div className="slide" data-cover="http://www.nowuc.com.au/wp-content/uploads/2014/05/possum.jpg"><h3>Possum</h3></div>
                                    <div className="slide" data-cover="http://4.bp.blogspot.com/-mls0SKe7NJA/TrJ-vjw5PxI/AAAAAAAAAPA/fh5uLGWZr84/s1600/Stoat_NaturalWildLife_3.jpg"><h3>Stoat</h3></div>
                                    <span className="branding-bar">Pests</span>
                                </div>
                                <div data-role="tile" data-effect="animate-slide-down" data-size="medium" style={{ backgroundColor: "purple" }}>
                                    <div className="slide" data-cover="http://www.multilingualliving.com/wordpress/wp-content/uploads/2011/12/Coca_cola_Santa.jpg"><h3>Litter Rush!</h3></div>
                                    <div className="slide" data-cover="http://www.multilingualliving.com/wordpress/wp-content/uploads/2011/12/Coca_cola_Santa.jpg"><h3>Litter Rush!</h3></div>
                                    <span className="branding-bar">Games</span>
                                </div>
                                <div data-role="tile" data-effect="animate-slide-left" data-size="medium" style={{ backgroundColor: "yellow" }}>
                                    <div className="slide" data-cover="https://cdn.britannica.com/s:300x500/26/65326-050-53232216.jpg"><h3>Rat</h3></div>
                                    <div className="slide" data-cover="https://cdn.britannica.com/s:300x500/26/65326-050-53232216.jpg"><h3>Rat</h3></div>
                                    <span className="branding-bar"></span>
                                </div>
                                <div data-role="tile" data-effect="animate-slide-left" data-size="wide" style={{ backgroundColor: "red" }}>
                                    <div className="slide" data-cover="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Odocoileus_hemionus_sitkensis.jpg/1200px-Odocoileus_hemionus_sitkensis.jpg"><h3>Deer</h3></div>
                                    <div className="slide" data-cover="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Odocoileus_hemionus_sitkensis.jpg/1200px-Odocoileus_hemionus_sitkensis.jpg"><h3>Deer</h3></div>
                                    <span className="branding-bar"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div>
                                <h2>Categories</h2>
                                <p>Browse the categories in the learning section.</p>
                                <br />
                                <div className="tiles-grid size-6">
                                    <div data-role="tile" data-effect="animate-slide-right" data-size="medium" style={{ backgroundColor: "lightblue" }}>
                                        <div className="slide" data-cover="https://www.doc.govt.nz/globalassets/images/nature/native-animals/birds/kea/kea-milford-sbernert-1200-4.jpg"><h3></h3></div>
                                        <div className="slide" data-cover="http://1.bp.blogspot.com/-YHRtmqsa8QA/Tw9yZAEqycI/AAAAAAAAACw/VGkBwvpWOEg/s1600/Animals_Birds_Kiwi_bird_026192_.jpg"><h3></h3></div>
                                        <div className="slide" data-cover="http://nzbirdsonline.org.nz/sites/all/files/1200468kpo10.jpg"><h3></h3></div>
                                        <span className="branding-bar"><h3>Birds</h3></span>
                                    </div>
                                    <div data-role="tile" data-effect="animate-slide-right" data-size="medium" style={{ backgroundColor: "lightblue" }}>
                                        <div className="slide" data-cover="http://4.bp.blogspot.com/-mls0SKe7NJA/TrJ-vjw5PxI/AAAAAAAAAPA/fh5uLGWZr84/s1600/Stoat_NaturalWildLife_3.jpg"><h3></h3></div>
                                        <div className="slide" data-cover="http://www.nowuc.com.au/wp-content/uploads/2014/05/possum.jpg"><h3></h3></div>
                                        <span className="branding-bar"><h3>Pests</h3></span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div>
                                <h2>Activities</h2>
                                <p>Check out some cool but still educational activities.</p>
                                <div data-role="tile" data-size="medium">
                                    <span className="branding-bar"><h3>Litter Rush!</h3></span>
                                    <img src="http://cdn.onlinewebfonts.com/svg/img_249551.png" className="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}