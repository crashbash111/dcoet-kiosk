import React from "react";
import { Spring } from 'react-spring/renderprops';

export default class Loader extends React.Component{
    constructor( props ){
        super( props );
        
    }

    render(){
        return(
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                { props => (
                    <div className="loader" style={this.props.style}> 
                    </div>
                )}
            </Spring>
        );
    }


}