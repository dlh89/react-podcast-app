import React from 'react';
import { Link } from 'react-router-dom';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            podcasts: []
        }
        this.handleSearch();
    }
    

    handleSearch = () => {
        if (this.props.searchTerm) {
            this.apiSearch(this.props.searchTerm);            
        }
    }

    apiSearch = (searchTerm) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = (e) => {
            if (e.target.readyState == 4 && e.target.status == 200) {
                const data = JSON.parse(e.target.responseText);
                this.handlePodcasts(data.results);
            }
        }
        const url = `https://itunes.apple.com/search?term=${searchTerm}&entity=podcast&attribute=descriptionTerm&limit=10`
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    handlePodcasts = (results) => {
        // add s to http in feed urls if it doesn't exist
        results.forEach(result => {
            if (result.feedUrl.substr(0,7) === 'http://') {
                const secureUrl = `https://${result.feedUrl.substr(7)}`;
                result.feedUrl = secureUrl;
            }
        })
        this.setState({
            podcasts: results
        })
    }

    render() {
        return (
            <div>
                {this.props.searchTerm ? (
                    <ul className="search__list">
                        {this.state.podcasts.map(function(podcast, index){
                            return (
                                <li key={ index } className="search__item">
                                    <p>Podcast: {podcast.trackName}</p>
                                    <p>Artist: {podcast.artistName}</p>
                                    <img src={podcast.artworkUrl30} />
                                    <Link to={`/podcast/${podcast.feedUrl}`}>{podcast.feedUrl}</Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>You must enter a search term.</p>
                )}
                
            </div>
        )
    }
}