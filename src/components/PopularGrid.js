import React from 'react';
import { Link } from 'react-router-dom';

export default class PopularGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popularPodcasts: '',
    };
  }
  componentWillMount() {
    this.apiSearch();
  }
  apiSearch = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.responseText);
        if (data.results.length > 0) {
          this.setState({ error: '' }); // clear any errors
          this.setState({ popularPodcasts: data.results });
          console.log(data.results);
        } else {
          this.setState({ error: 'No results for that search term. Try again.' });
        }
      }
    };
    const url = 'https://itunes.apple.com/search?term=podcast&entity=podcast&limit=12';
    xhttp.open('GET', url, true);
    xhttp.send();
  };
  render() {
    return (
      <div className="row">
        <div className="col-1-of-2">
          <h1 className="heading heading--background-image heading--primary">Popular Podcasts</h1>
          <p className="large-text">
            These podcasts are popular at the moment on itunes. Click on any of them to see their
            podsend page.
          </p>
        </div>
        <div className="col-1-of-2">
          <div className="popular-grid">
            {this.state.popularPodcasts &&
              this.state.popularPodcasts.map((podcast, index) => (
                <div className="popular-grid__item" key={index}>
                  <Link to={`/podcast/${podcast.feedUrl}`}>
                    <div className="popular-grid__side">
                      <img
                        src={podcast.artworkUrl600}
                        className="popular-grid__side popular-grid__side--front"
                      />
                      <div className="popular-grid__side popular-grid__side--back">
                        <p className="popular-grid__title">{podcast.collectionName}</p>
                        <p className="popular-grid__info">Genre: {podcast.primaryGenreName}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
