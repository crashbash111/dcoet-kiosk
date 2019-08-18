import React from "react";

export default class SearchBar extends React.Component
{
    constructor( props )
    {
        super( props );
        this.state = {searchTerm: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render()
    {
        return(
            <div>
                <form>
                    <input type="text" name="searchTerm" placeholder="Search" value={this.state.searchTerm} onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}