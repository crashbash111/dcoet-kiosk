import React from "react";
import { Spring } from 'react-spring/renderprops';

export default class Loader extends React.Component{
    constructor(){
        super();
        
    }

    render(){
        return(
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                { props => (
                    <div style={props}>
                        <h1>Loading</h1>
                    </div>
                )}
                
            </Spring>

        );
    }


}