import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    handleInput(e) {
        this.setState({searchTerm: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        e.target.reset();
        this.props.history.push(`/search/${this.state.searchTerm}`)
    }

    render() {
        return (
            <div className="container">
                <form action="/search" method="get" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Enter a podcast" name="searchTerm" className="search__input" onChange={this.handleInput} />
                    <button className="btn__search">Search</button>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchBar)