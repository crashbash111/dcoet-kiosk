import React from "react";
import { Link, withRouter } from "react-router-dom";

import ReactDOM from "react-dom";

//import Keyboard from "react-simple-keyboard";
import Logo from "../components/Home/Logo";
import MainContent from "../components/Home/MainContent";
import SearchBar from "../components/Home/SearchBar";
import SideBar from "../components/Home/SideBar";

import KeyboardedInput from 'react-touch-screen-keyboard';
//import 'react-touch-screen-keyboard/lib/Keyboard.css'; // if you just want css
import 'react-touch-screen-keyboard/lib/Keyboard.scss';
import ErrorCatch from "../components/ErrorCatch";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCategory: (this.props.match != null && this.props.match.params != null && this.props.match.params.category != null) ? this.props.match.params.category : -1,
            categories: [],
            searchTerm: "",
            oldCategory: -1,
            swtiched: false,
            showKeyboard: false,
            keyboardLayout: "default",
            value: "",
            top: -1,
            error: false,
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.handleValueChange = this.handleValueChange.bind(this);

        this.currentItem = React.createRef();
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
        fetch("./api/categories")
            .then(response => response.json())
            .then(data => this.setState({ categories: data }))
            .catch( error => this.setState( {error: true}));
    }

    handleCategoryChange(i) {
        //console.log("clicked category " + i);
        this.setState({
            activeCategory: i
        });
        console.log( i );
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

    handleValueChange(val) {
        this.setState({ searchTerm: val });
    }

    componentDidUpdate()
    {
        if( this.currentItem.current != null )
        {
            if( ReactDOM.findDOMNode( this. currentItem.current ).getBoundingClientRect().top + 50 != this.state.top )
            {
                console.log( ReactDOM.findDOMNode( this. currentItem.current ).getBoundingClientRect().top );
                this.setState( { top: ReactDOM.findDOMNode( this. currentItem.current ).getBoundingClientRect().top + 50 }, () => {} );
            }
        }
    }

    render() {

        if( this.state.error )
        {
            return <ErrorCatch error={ true } newUrl="/"></ErrorCatch>
        }

        let categoryList = this.state.categories.map(item => {
            return (
                <div key={item.id} data-role="tile" data-size="medium" style={{ backgroundColor: "lightblue" }}>
                    <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                    <p>{item.description}</p>
                </div>
            );
        });

        return (
            <div style={{ height: "100%", backgroundImage: "url( './images/background_main.jpg' )", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <img onClick={ (event) => { window.location = "/" } } style={{ cursor: "pointer", position: "absolute", right: "10px", "bottom": "10px", zIndex: 10, height: "3%" }} src={ this.state.activeCategory == -1 && this.state.searchTerm == "" ? "/images/refresh-white.png" : "/images/refresh-white.png" } />
                <div style={{ backgroundColor: `rgba( 25, 25, 25, ${ (this.state.activeCategory == -1 && this.state.searchTerm == "" ) ? "0" : "0.8" } )` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "300px auto" }}>
                        <div className="fade-gradient" style={{ display: "grid", gridTemplateRows: "15vh 85vh", backgroundImage: `radial-gradient(farthest-corner at 0% ${this.state.top}px, rgba(0,0,0,1), rgba(0,0,0,0))` }}>
                            <div className="grid-item logospace">
                                <Logo />
                            </div>
                            <div className="grid-item leftcategories">
                                <SideBar r={ this.currentItem } activeCategory={this.state.activeCategory} categories={this.state.categories} handleChange={this.handleCategoryChange} />
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateRows: this.state.showKeyboard ? "30vh 70vh" : "15vh 85vh", transition: "grid-template-rows 2s" }}>
                            <div className="grid-item searchspace" style={{ paddingTop: "20px" }}>
                                {/* <SearchBar searchTerm={this.state.searchTerm} handleChange={this.handleFormChange} onFocus={this.onFocus} /> */}
                                <KeyboardedInput
                                    enabled
                                    onChange={this.handleValueChange}
                                    value={this.state.searchTerm}
                                    placeholder={"Search..."}
                                    defaultKeyboard="us"
                                    isDraggable={false} // optional, default is `true`
                                />
                                {this.state.showKeyboard ? <div style={{ color: "black", zIndex: "10" }}>
                                </div>
                                    :
                                    null}
                            </div>
                            <div className="rightcontent">
                                <MainContent filter={this.state.searchTerm} activeCategory={this.state.activeCategory} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            /* <Keyboard
            keyboardRef={r => this.keyboard = r}
            layoutName={this.state.layoutName}
            onChange={input => this.onChange(input)}
            onKeyPress={button => this.onKeyPress(button)}
            /> */
        );
    }
}

export default withRouter( Home );