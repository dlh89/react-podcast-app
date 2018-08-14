import React from 'react';

const Episodes = props => (
  <div>
    <h1>Episodes</h1>
    <ul>{props.data.episodes.map(episode => <li key={episode.guid}>{episode.title}</li>)}</ul>
  </div>
);

export default Episodes;
