import React from "react";
import { Link } from "react-router-dom";

import ItemRow from "../components/Admin/ItemRow";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTable from "../components/AdminTable";
import Axios from "axios";
import MyPagination from "../components/MyPagination";

export default class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            pages: [],
            loading: true,
            //stores page width
            width: window.innerWidth,
            currentPage: 1,
            postsPerPage: 10,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
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
            this.setState({ birds: updatedList });
            Axios.delete("./pages/" + id);
        }
    }

    paginate = pageNumber => this.setState( { currentPage: pageNumber } );

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
        const currentPages = this.state.pages.slice(indexOfFirstPage, indexOfLastPage);

        return (
            <div className="xadmin">
                <AdminSidebar isMobile={isMobile} />
                <div className={isMobile ? 'fullarea' : 'rightarea'}>
                    <h2>Admin</h2>
                    <br />
                    <h2>Pages</h2>
                    <br />
                    <Link to="/admin/create"><button className="btn btn-primary">Create New</button></Link>
                    <br />
                    <AdminTable pages={currentPages} loading={this.state.loading} />
                    <MyPagination postsPerPage={ this.state.postsPerPage } totalPosts={ this.state.pages.length } paginate={ this.paginate } />
                </div>
            </div>
        );
    }
}