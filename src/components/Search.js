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
                console.log(data.results);
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
                {this.props.searchTerm ? (
                    <div>
                        <p>Showing {this.state.podcasts.length} results for <strong>{this.props.searchTerm}</strong></p>
                        <ul className="search__list">
                            {this.state.podcasts.map(function(podcast, index){
                                return (
                                    <li key={ index } className="search__item">
                                        <img src={podcast.artworkUrl100} className="search__image"/>
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