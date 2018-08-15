import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultsList = props => (
  <ul className="search__list">
    {props.podcasts.map((podcast, index) => (
      <li key={index} className="search__item">
        <img src={podcast.artworkUrl600} className="search__image" />
        <div className="search__details">
          <Link to={`/podcast/${podcast.feedUrl}`}>{podcast.trackName}</Link>
          <p>Artist: {podcast.artistName}</p>
          <p>Genre: {podcast.primaryGenreName}</p>
        </div>
      </li>
    ))}
  </ul>
);

export default SearchResultsList;
