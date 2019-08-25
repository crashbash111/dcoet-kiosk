import React from "react";
import { Link } from "react-router-dom";

import Logo from "../components/Home/Logo";
import MainContent from "../components/Home/MainContent";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCategory: -1,
            categories: [],
            searchTerm: "",
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    componentDidMount() {
        fetch("./pages/allCategories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));
    }

    handleCategoryChange(i) {
        console.log("clicked category " + i);
        this.setState({
            activeCategory: i
        });
    }

    handleFormChange(event) {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        let categoryList = this.state.categories.map(item => {
            return (
                <div data-role="tile" data-size="medium" style={{ backgroundColor: "lightblue" }}>
                    <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            );
        });

        //

        return (
            <div style={{ height: "100%", backgroundImage: "url( './images/background_main.jpg' )", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <div style={{ backgroundColor: "rgba( 25, 25, 25, 0.8 )", paddingTop: "15px" }}>
                    <div className="grid-container">
                        <div className="grid-item item1">
                            <Logo />
                        </div>
                        <div className="grid-item item2">
                            <SearchBar searchTerm={this.state.searchTerm} handleChange={this.handleFormChange} />
                        </div>
                        <div className="grid-item item3">
                            <SideBar activeCategory={this.state.activeCategory} categories={this.state.categories} handleChange={this.handleCategoryChange} />
                        </div>
                        <div className="grid-item item4">
                            <MainContent filter={this.state.searchTerm} activeCategory={this.state.activeCategory} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}