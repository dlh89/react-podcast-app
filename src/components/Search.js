import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            podcasts: [],
            searchTerm: this.props.searchTerm,
            error: ''
        }
        this.handleSearch(this.state.searchTerm);
    }

    componentWillReceiveProps(nextProps) {
        // Search again when props change
        if (nextProps.searchTerm !== this.state.searchTerm) {
          this.setState({ searchTerm: nextProps.searchTerm });
          this.handleSearch(nextProps.searchTerm);
        }
      }
    

    handleSearch = (searchTerm) => {
        if (searchTerm) {
            this.apiSearch(searchTerm);            
        }
    }

    apiSearch = (searchTerm) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = (e) => {
            if (e.target.readyState == 4 && e.target.status == 200) {
                const data = JSON.parse(e.target.responseText);
                if (data.results.length > 0) {
                    this.setState({ error: ''}) // clear any errors
                    this.handlePodcasts(data.results);
                    console.log(data.results);
                } else {
                    this.setState({ error: 'No results for that search term. Try again.'})
                }
            }
        }
        const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=podcast&limit=12`
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    handlePodcasts = (results) => {
        this.setState({
            podcasts: results
        })
    }

    render() {
        return (
            <div>
                {this.state.error ? 
                    <p>{this.state.error}</p>
                :
                this.state.searchTerm ? (
                    !this.state.podcasts.length ? 
                    <div className="container">
                        <p>Getting results...</p>
                        <div className="u-spinner u-absolute-center" />
                    </div>
                    :
                    <div>
                        <p>Showing {this.state.podcasts.length} results for <strong>{this.state.searchTerm}</strong></p>
                        <ul className="search__list">
                            {this.state.podcasts.map(function(podcast, index){
                                return (
                                    <li key={ index } className="search__item">
                                        <img src={podcast.artworkUrl600} className="search__image"/>
                                        <div className="search__details">
                                            <Link to={`/podcast/${podcast.feedUrl}`}>{podcast.trackName}</Link>                                
                                            <p>Artist: {podcast.artistName}</p>
                                            <p>Genre: {podcast.primaryGenreName}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <p>You must enter a search term.</p>
                )}
                
            </div>
        )
    }
}