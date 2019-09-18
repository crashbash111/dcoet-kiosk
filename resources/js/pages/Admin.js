import React from "react";
import { Link } from "react-router-dom";

import ItemRow from "../components/Admin/ItemRow";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTable from "../components/AdminTable";
import Axios from "axios";
import CategoryTable from "../components/Admin/CategoryTable";
import MyPagination from "../components/MyPagination";

export default class Admin extends React.Component {
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

        this.handleDelete = this.handleDelete.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.paginate = this.paginate.bind(this);
        this.changeActiveCategory = this.changeActiveCategory.bind(this);
        this.changeActivePage = this.changeActivePage.bind(this);
        this.handleTabClick = this.handleTabClick.bind( this );
        this.categoryClick = this.categoryClick.bind( this );
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("./pages/allCategories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));
        fetch("./pages/all")
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

    handleTabClick( id )
    {
        this.setState( { tabIndex: id } );
    }

    paginate = pageNumber => this.setState({ currentPage: pageNumber });

    changeActiveCategory = num => this.setState({ activeCategory: num, currentPage: 1, activePage: -1 });

    changeActivePage = num => this.setState({ activePage: num });

    categoryClick = num => this.setState( { shownCategory: num } );

    render() {
        // const items = this.state.birds.map(
        //     i => <ItemRow key={i.id} id={i.id} heading={i.heading} text={i.text} images={i.imgs} categoryName={i.categoryName} handleDelete={this.handleDelete} />
        // );
        //variables for page sizing (dynamic rendering)
        const { width } = this.state;
        const isMobile = width <= 900;

        //get current post
        const indexOfLastPage = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPage = indexOfLastPage - this.state.postsPerPage;
        const filteredPages = this.state.pages.filter(m => m.category_id == this.state.activeCategory);
        const currentPages = filteredPages.slice(indexOfFirstPage, indexOfLastPage);

        var c1 = (<div><h2>Pages</h2>
            <br />
            <Link to="./admin/create"><button className="btn btn-primary">Create New</button></Link>
            <br />
            <AdminTable pages={currentPages} categories={this.state.categories} loading={this.state.loading} changeActiveCategory={this.changeActiveCategory} activeCategory={this.state.activeCategory}
                changeActivePage={this.changeActivePage} activePage={this.state.activePage} postsPerPage={this.state.postsPerPage} handleDelete={ this.handleDelete } />
            <MyPagination postsPerPage={this.state.postsPerPage} totalPosts={filteredPages.length} paginate={this.paginate} /></div>
        );

        var c2 = (<div><h2>Categories</h2>
            <br />
            <Link to="./admin/createCategory"><button className="btn btn-primary">Create New</button></Link>
            {!this.state.loading ?
            <CategoryTable categories={ this.state.categories } shownCategory={ this.state.shownCategory } categoryClick={ this.categoryClick } />
            : <div>Loading...</div>
            }
        </div>
        );

        var children = [c1, c2];

        var child = children[this.state.tabIndex];

        return (
            <div className="xadmin">
                <AdminSidebar isMobile={isMobile} handleTabClick={ this.handleTabClick } />
                <div className={isMobile ? 'fullarea' : 'rightarea'}>
                    <h2>Admin</h2>
                    <br />
                    {child}
                </div>
            </div>
        );
    }
}