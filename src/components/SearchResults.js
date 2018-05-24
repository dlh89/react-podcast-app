import React from 'react';
import Search from '../components/Search';

const SearchResults = ({ match }) => (
  <div className="container">
    <h1>Search</h1>
    <Search searchTerm={match.params.searchTerm} />
  </div>
);

export default SearchResults;
