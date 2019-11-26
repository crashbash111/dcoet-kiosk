import React from "react";

export default class TabCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    previous(event) {
        if (this.state.index > 0) {
            this.setState(prevState => {
                return {
                    index: prevState.index - 1
                };
            });
        }
    }

    next(event) {
        if (this.state.index < this.props.children.length - 1) {
            this.setState(prevState => {
                return {
                    index: prevState.index + 1
                };
            });
        }
    }

    render() {
        return (
            <div>
                <form>
                    {this.props.children}
                </form>
                <button onClick={this.previous()}>Previous</button>
                <button onClick={this.next()}>Next</button>
            </div>
        );
    }
}