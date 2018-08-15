import React from 'react';

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.apiSearch();
  }

  componentWillReceiveProps() {
    this.apiSearch(this.props.searchTerm);
  }

  apiSearch = (searchTerm) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText);
        if (data.results.length > 0) {
          this.props.resultsCallback(data.results);
        } else {
          this.props.resultsCallback({ error: 'No results for that search term. Try again.' });
        }
      }
    };
    const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=podcast&limit=12`;
    xhttp.open('GET', url, true);
    xhttp.send();
  };

  render() {
    return <div />;
  }
}
