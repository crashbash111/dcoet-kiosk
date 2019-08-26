import React from "react";

export default class SideBarEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.isActive ? 'sideentryselected' : 'sideentry'} onClick={() => this.props.handleChange(this.props.id)}>
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}