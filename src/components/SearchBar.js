import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    this.props.history.push(`/search/${this.state.searchTerm}`);
  }

  render() {
    return (
      <form action="/search" method="get" onSubmit={this.handleSubmit} className="search__form">
        <input
          type="text"
          placeholder="Enter a podcast"
          name="searchTerm"
          className="search__input"
          onChange={this.handleInput}
        />
        <button className="search__button">Search</button>
      </form>
    );
  }
}

export default withRouter(SearchBar);
