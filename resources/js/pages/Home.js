import React from "react";
import { Link } from "react-router-dom";

import Keyboard from "react-simple-keyboard";
import Logo from "../components/Home/Logo";
import MainContent from "../components/Home/MainContent";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCategory: ( this.props.match != null && this.props.match.params != null && this.props.match.params.category != null ) ? this.props.match.params.category : -1,
            categories: [],
            searchTerm: "",
            oldCategory: -1,
            swtiched: false,
            showKeyboard: false,
            keyboardLayout: "default",
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value, },
            () => {
                this.keyboard.setInput(value);
            });
    }

    onFocus(event) {
        this.setState({ showKeyboard: true });
    }

    onBlur(event) {
        this.setState({ showKeyboard: false });
    }

    onChange = input => {
        this.setState({ searchTerm: input });
    }

    onKeyPress = button => {
        //console.log(button);
    }

    componentDidMount() {
        fetch( "./api/categories" )
            .then(response => response.json())
            .then(data => this.setState({ categories: data }));
    }

    handleCategoryChange(i) {
        //console.log("clicked category " + i);
        this.setState({
            activeCategory: i
        });
    }

    handleFormChange(event) {
        let { name, value } = event.target;

        this.setState({
            [name]: value
        },
            () => {
                this.keyboard.setInput(value);
            });

        if (name == "searchTerm") {
            if (value == "") {
                this.setState(prevState => {
                    return (
                        {
                            switched: false,
                            activeCategory: prevState.oldCategory
                        }
                    );
                });
            }

            if (value != "") {
                //console.log(this.state.oldCategory);
                if (!this.state.switched) {
                    this.setState({ oldCategory: this.state.activeCategory });
                }
                this.setState({ activeCategory: -1, switched: true });
            }
        }
    }

    render() {
        let categoryList = this.state.categories.map(item => {
            return (
                <div key={ item.id } data-role="tile" data-size="medium" style={{ backgroundColor: "lightblue" }}>
                    <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            );
        });

        //

        return (
            <div style={{ height: "100%", backgroundImage: "url( './images/background_main.jpg' )", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <div style={{ backgroundColor: "rgba( 25, 25, 25, 0.8 )" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "300px auto" }}>
                        <div style={{ display: "grid", gridTemplateRows: "15vh 85vh" }}>
                            <div className="grid-item logospace">
                                <Logo />
                            </div>
                            <div className="grid-item leftcategories">
                                <SideBar activeCategory={this.state.activeCategory} categories={this.state.categories} handleChange={this.handleCategoryChange} />
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateRows: this.state.showKeyboard ? "30vh 70vh" : "15vh 85vh", transition: "grid-template-rows 2s" }}>
                            <div className="grid-item searchspace">
                                <SearchBar searchTerm={this.state.searchTerm} handleChange={this.handleFormChange} onFocus={this.onFocus} />
                                {this.state.showKeyboard ? <div style={{ color: "black", zIndex: "10" }}><Keyboard
                                    keyboardRef={r => this.keyboard = r}
                                    layoutName={this.state.layoutName}
                                    onChange={input => this.onChange(input)}
                                    onKeyPress={button => this.onKeyPress(button)}
                                /></div>
                                    :
                                    null}
                            </div>
                            <div className="grid-item rightcontent">
                                <MainContent filter={this.state.searchTerm} activeCategory={this.state.activeCategory} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}