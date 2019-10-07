import React from "react";

import CreateCategory from "./KioskCategories/CreateCategory";
import Loader from "../Loader";
import ViewCategories from "./KioskCategories/ViewCategories";

export default class KioskCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 0,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        this.setState({ mode: i });
        console.log(this.state.mode);
    }

    render() {
        if (this.state.loading) {
            return <Loader />
        }

        let child = <div>Videos</div>;

        switch (this.state.mode) {
            case 0:
                child = <CreateCategory />
                break;
            case 1:
                child = <ViewCategories />
                break;
        }

        return <div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 0 ? "btn btn-primary" : "btn btn-dark"} onClick={(event) => this.handleClick(0)}>Create New</button>
            </div>
            <div style={{ display: "inline-block" }}>
                <button className={this.state.mode == 1 ? "btn btn-primary" : "btn btn-dark"} onClick={(event) => this.handleClick(1)}>View</button>
            </div>
            {child}
        </div>
    }
}