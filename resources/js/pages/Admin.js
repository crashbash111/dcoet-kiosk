import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../components/AuthService";
import withAuth from "../components/withAuth";
const Auth = new AuthService();

import ItemRow from "../components/Admin/ItemRow";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTable from "../components/AdminTable";
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

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            pages: [],
            categories: [],
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

    }

    handleLogout() {
        Auth.logout();
        this.props.history.replace("/login");
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("./api/categories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));
        fetch("./api/pages")
            .then(response => response.json())
            .then(data => this.setState({ pages: data, loading: false }));
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

        // var c1 = (<div><h2>Pages</h2>
        //     <br />
        //     <Link to="./admin/create"><button className="btn btn-primary">Create New</button></Link>
        //     <br />
        //     <AdminTable pages={currentPages} categories={this.state.categories} loading={this.state.loading} changeActiveCategory={this.changeActiveCategory} activeCategory={this.state.activeCategory}
        //         changeActivePage={this.changeActivePage} activePage={this.state.activePage} postsPerPage={this.state.postsPerPage} handleDelete={this.handleDelete} />
        //     <MyPagination postsPerPage={this.state.postsPerPage} totalPosts={filteredPages.length} paginate={this.paginate} /></div>
        // );

        // var c2 = (<div><h2>Categories</h2>
        //     <br />
        //     <Link to="./admin/createCategory"><button className="btn btn-primary">Create New</button></Link>
        //     {!this.state.loading ?
        //         <CategoryTable categories={this.state.categories} shownCategory={this.state.shownCategory} categoryClick={this.categoryClick} />
        //         : <div>Loading...</div>
        //     }
        // </div>
        // );

        // var c3, c4;
        // c3 = c4 = null;

        // var c5 = (<BannedWordsIndex />);

        // var children = [c1, c2, c3, c4, c5];

        //var child = children[this.state.tabIndex];


        //object array to define the entries on the sidebar and what components they map to
        let items = [
            {
                id: 0,
                text: "Dashboard",
                component: <Dashboard />
            },
            {
                id: 1,
                text: "Kiosk Pages",
                component: <KioskPages key={1} />
            },
            {
                id: 2,
                text: "Kiosk Categories",
                component: <KioskCategories key={2} />
            },
            {
                id: 3,
                text: "Powerpoints",
                component: <Powerpoints key={3} />
            },
            {
                id: 4,
                text: "Games",
                component: <Games key={4} />
            },
            {
                id: 5,
                text: "Banned Words",
                component: <BannedWords key={5} />
            },
            {
                id: 6,
                text: "Videos",
                component: <Videos key={6} />
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

        console.log(this.props.user);

        let verticalCenter = {
            margin: "0",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            msTransform: "translateY(-50%)"
        };

        return (
            <ErrorCatch>
                <div className="xadmin" style={{  }}>
                    {/* <div style={{ backgroundColor: "rgba( 0,0,0,0.8)", width: "100%", height: "100%" }}> */}
                    
                    <AdminSidebar isMobile={isMobile} handleTabClick={this.handleTabClick} items={items} activeTab={this.state.tabIndex} ref={this._sidebarRef} />
                    <div style={{ minHeight: "105vh", backgroundImage: `url( "./images/background_main_dark.jpg" )`, backgroundSize: "cover", backgroundAttachment: "fixed", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className={isMobile ? 'fullarea enshadow' : 'rightarea enshadow' }>
                        <div style={{ height: "50px", width: "100%" }}>
                            {isMobile ? <span className="sidebartoggle" style={{ float: "left" }} onClick={this.toggleSidebar}>&#9776; Open</span> : null}
                            <div style={{ float: "right" }}>
                                <div style={{ display: "inline-block" }}>
                                    <h2 style={{ textShadow: "3px 3px #0c0c0c" }}>Welcome Admin</h2>
                                </div>
                                <div style={{ width: "20px", display: "inline-block" }}></div>
                                <div style={{ display: "inline-block" }}>
                                    <button type="button" className="btn btn-dark btn-square" onClick={this.handleLogout.bind(this)}>
                                        Logout
                                    </button>
                                </div>
                            </div>


                        </div>

                        {child}
                    </div>
                    {/* </div> */}
                </div>
            </ErrorCatch>
        );
    }
}

export default withAuth(Admin); //hides admin page behind authentication