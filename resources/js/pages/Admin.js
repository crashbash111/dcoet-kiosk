import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../components/AuthService";
import withAuth from "../components/withAuth";
const Auth = new AuthService();

import ItemRow from "../components/Admin/ItemRow";
import AdminSidebar from "../components/Admin/AdminSidebar";
// import AdminTable from "../components/AdminTable";
import Axios from "axios";
import BannedWordsIndex from "./Admin/BannedWords/BannedWordsIndex";
import CategoryTable from "../components/Admin/CategoryTable";
import MyPagination from "../components/MyPagination";

import BannedWords from "../components/Admin/BannedWords";
import Dashboard from "../components/Admin/Dashboard";
import Games from "../components/Admin/Games";
import KioskCategories from "../components/Admin/KioskCategories";
import KioskPages from "../components/Admin/KioskPages";
import Powerpoints from "../components/Admin/Powerpoints";
import Videos from "../components/Admin/Videos";
import ErrorCatch from "../components/ErrorCatch";
import { thisExpression } from "@babel/types";

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            mostViewed: [],
            mostViewedLoading: false,
            leastViewed: [],
            leastViewedLoading: false,
            pages: [],
            pagesLoading: false,
            categories: [],
            categoriesLoading: false,
            powerpoints: [],
            powerpointsLoading: false,
            games: [],
            gamesLoading: false,
            bannedWords: [],
            bannedWordsLoading: false,
            videos: [],
            videosLoading: false,
            loading: true,
            //stores page width
            width: window.innerWidth,
            currentPage: 1,
            postsPerPage: 10,
            activeCategory: -1,
            activePage: -1,
            tabIndex: 0,
            shownCategory: -1,
        };

        this._sidebarRef = React.createRef();

        this.handleDelete = this.handleDelete.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.paginate = this.paginate.bind(this);
        this.changeActiveCategory = this.changeActiveCategory.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.categoryClick = this.categoryClick.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);

        this.fetchMostViewed = this.fetchMostViewed.bind(this);
        this.fetchLeastViewed = this.fetchLeastViewed.bind(this);
        this.fetchPages = this.fetchPages.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchPowerpoints = this.fetchPowerpoints.bind(this);
        this.fetchGames = this.fetchGames.bind(this);
        this.fetchBannedWords = this.fetchBannedWords.bind(this);
        this.fetchVideos = this.fetchVideos.bind(this);
    }

    handleLogout() {
        Auth.logout();
        this.props.history.replace("/login");
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.fetchMostViewed();
        this.fetchLeastViewed();
        this.fetchPages();
        this.fetchCategories();
        this.fetchPowerpoints();
        this.fetchGames();
        this.fetchBannedWords();
        this.fetchVideos();
    }

    fetchMostViewed() {
        this.setState({ mostViewedLoading: true });
        Auth.fetch("./api/pages/mostviewed")
            .then(response => response.json())
            .then(data => this.setState({ mostViewed: data, mostViewedLoading: false }))
            .catch(error => console.log(error));
    }

    fetchLeastViewed() {
        this.setState({ leastViewedLoading: true });
        Auth.fetch("./api/pages/leastviewed")
            .then(response => response.json())
            .then(data => this.setState({ leastViewed: data, leastViewedLoading: false }))
            .catch(error => console.log(error));
    }

    fetchPages() {
        this.setState({ pagesLoading: true });
        Auth.fetch("./api/pages")
            .then(response => response.json())
            .then(data => this.setState({ pages: data, pagesLoading: false }))
            .catch(error => console.log(error));
        // fetch( "./api/pages" )
        //     .then(response => response.json())
        //     .then(data => this.setState({ pages: data, pagesLoading: false }))
        //     .catch(error => console.log(error));
    }

    fetchCategories() {
        this.setState({ categoriesLoading: true });
        fetch("./api/categories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data, categoriesLoading: false }))
            .catch(error => console.log(error));
    }

    fetchPowerpoints() {
        this.setState({ powerpointsLoading: true });
        fetch("./api/powerpoints")
            .then(response => response.json())
            .then(data => this.setState({ powerpoints: data, powerpointsLoading: false }))
            .catch(error => console.log(error));
    }

    fetchGames() {
        this.setState({ gamesLoading: true });
        Auth.fetch("./api/games")
            .then(response => response.json())
            .then(data => this.setState({ games: data, gamesLoading: false }))
            .catch(error => console.log(error));
    }

    fetchBannedWords() {
        this.setState({ bannedWordsLoading: true });
        fetch("./api/bannedwords")
            .then(response => response.json())
            .then(data => this.setState({ bannedWords: data, bannedWordsLoading: false }))
            .catch(error => console.log(error));
    }

    fetchVideos() {
        this.setState({ videosLoading: true });
        fetch("./api/videos")
            .then(response => response.json())
            .then(data => this.setState({ videos: data, videosLoading: false }))
            .catch(error => console.log(error));
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    //handles page resizing for dynamic layouts
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    handleWindowResize() {
        this.setState(state => ({
            width: window.innerWidth
        }));
    }

    handleDelete(id) {
        let result = confirm("Are you sure you want to delete this item?");
        if (result) {
            let notId = t => t.id !== id;
            let updatedList = this.state.pages.filter(notId);
            this.setState({ pages: updatedList });
            Axios.delete("./pages/" + id);
        }
    }

    handleTabClick(id) {
        this.setState({ tabIndex: id });
        console.log("Ree");
        if (this.state.width <= 900) {
            console.log("Toggle");
            this.toggleSidebar();
        }
    }

    paginate = pageNumber => this.setState({ currentPage: pageNumber });

    changeActiveCategory = num => this.setState({ activeCategory: num, currentPage: 1, activePage: -1 });

    changeActivePage = num => this.setState({ activePage: num });

    categoryClick = num => this.setState({ shownCategory: num });

    toggleSidebar() {
        this._sidebarRef.current.toggleSidebar();
    }

    render() {

        //variables for page sizing (dynamic rendering)
        const { width } = this.state;
        const isMobile = width <= 900;

        //get current post
        const indexOfLastPage = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPage = indexOfLastPage - this.state.postsPerPage;
        const filteredPages = this.state.pages.filter(m => m.category_id == this.state.activeCategory);
        const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);

        //object array to define the entries on the sidebar and what components they map to
        let items = [
            {
                id: 0,
                text: "Dashboard",
                component: <Dashboard key={0} mostViewed={this.state.mostViewed} mostViewedLoading={this.state.mostViewedLoading}
                    leastViewed={this.state.leastViewed} leastViewedLoading={this.state.leastViewedLoading} />
            },
            {
                id: 1,
                text: "Kiosk Pages",
                component: <KioskPages key={1} pages={this.state.pages} loading={this.state.pagesLoading} />
            },
            {
                id: 2,
                text: "Kiosk Categories",
                component: <KioskCategories key={2} categories={this.state.categories} loading={this.state.categoriesLoading} refresh={this.fetchCategories} />
            },
            {
                id: 3,
                text: "Presentations",
                component: <Powerpoints key={3} powerpoints={this.state.powerpoints} loading={this.state.powerpointsLoading} />
            },
            {
                id: 4,
                text: "Games",
                component: <Games key={4} games={this.state.games} loading={this.state.gamesLoading} />
            },
            {
                id: 5,
                text: "Banned Words",
                component: <BannedWords key={5} bannedWords={this.state.bannedWords} loading={this.state.bannedWordsLoading} />
            },
            {
                id: 6,
                text: "Videos",
                component: <Videos key={6} videos={this.state.videos} loading={this.state.videosLoading} />
            }
        ];

        //default component should go here when nothing selected
        var child = <div>Please select a category</div>

        //find the right component to render
        child = items.map(item => {
            if (item.id == this.state.tabIndex) {
                return item.component;
            }
        });

        let verticalCenter = {
            margin: "0",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            msTransform: "translateY(-50%)"
        };

        return (
            <ErrorCatch>
                <div className="xadmin" style={{ padding: "0" }}>
                    {/* <div style={{ backgroundColor: "rgba( 0,0,0,0.8)", width: "100%", height: "100%" }}> */}

                    <AdminSidebar isMobile={isMobile} handleTabClick={this.handleTabClick} items={items} activeTab={this.state.tabIndex} ref={this._sidebarRef} />
                    <div style={{ padding: "0", backgroundColor: "whitesmoke" }} className={isMobile ? 'fullarea' : 'rightarea'}>

                        {isMobile ? <span className="sidebartoggle" onClick={this.toggleSidebar}>&#9776; Open</span> : null}
                        <div style={{ width: "100%", backgroundColor: "grey" }}>
                            <div>
                                <button><h2>Welcome Admin</h2></button>
                                <button type="button" className="btn btn-dark btn-square" onClick={this.handleLogout.bind(this)}>
                                    Logout
                                </button>
                            </div>
                            <div style={{ display: "inline-block" }}>
                                
                            </div>
                        </div>

                        <div style={{ border: "1px solid black", width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "40px", color: "black" }}>


                            <ErrorCatch>
                                {child}
                            </ErrorCatch>
                        </div>


                    </div>
                    {/* </div> */}
                </div>
            </ErrorCatch>
        );
    }
}

export default withAuth(Admin); //hides admin page behind authentication