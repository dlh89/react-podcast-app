import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <div className="container">
                <form action="/search" method="get">
                    <input type="text" placeholder="Enter a podcast" name="searchTerm" className="search__input" onChange={this.handleInput} />
                    <Link to={`/search/${this.state.searchTerm}`}>Search</Link>
                </form>
            </div>
        )
    }
}