import React from 'react';
import SearchContainer from './SearchContainer';
import SearchResultsList from './SearchResultsList';
import LoadingSpinner from './LoadingSpinner';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: [],
      searchTerm: this.props.searchTerm,
      error: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    // Search again when props change
    if (nextProps.searchTerm !== this.state.searchTerm) {
      this.setState({ searchTerm: nextProps.searchTerm });
    }
  }

  handleSearchResults = (results) => {
    this.setState({
      podcasts: results,
    });
  };

  render() {
    return (
      <div>
        <SearchContainer
          searchTerm={this.state.searchTerm}
          resultsCallback={this.handleSearchResults}
        />
        <div>
          {this.state.error ? (
            <p>{this.state.error}</p>
          ) : this.state.searchTerm ? (
            !this.state.podcasts.length ? (
              <LoadingSpinner loadingText="Getting results..." />
            ) : (
              <div>
                <p>
                  Showing {this.state.podcasts.length} results for{' '}
                  <strong>{this.state.searchTerm}</strong>
                </p>
                <SearchResultsList podcasts={this.state.podcasts} />
              </div>
            )
          ) : (
            <p>You must enter a search term.</p>
          )}
        </div>
      </div>
    );
  }
}
