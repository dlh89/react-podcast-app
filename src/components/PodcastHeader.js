import React from 'react';

const PodcastHeader = props => (
  <div className="container">
    <div className="podcast-header">
      <img
        className="podcast-header__image"
        src={props.data.image}
        alt={`${props.data.title} podcast logo`}
      />
      <h1 className="podcast-header__title">{props.data.title}</h1>
    </div>
  </div>
);

export default PodcastHeader;
