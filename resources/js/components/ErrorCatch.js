import React from "react";

class ErrorCatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
      info: "",
    };
  }

  componentDidCatch(error, info) {
    this.setState( { hasError: true } );
    console.log( error );
    console.log( info );
  }

  render() {
    if (this.props.error || this.state.hasError) {
      return <div className="error-box">
        <h1>Something went wrong.</h1>
        <button onClick={ () => { location.reload() } } className="btn btn-primary btn-square">Reload</button>
        <br />
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorCatch;