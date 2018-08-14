import React from 'react';
import ProcessFeed from './ProcessFeed';

const Podcast = ({ match }) => (
  <div>
    <ProcessFeed feedUrl={match.params.rssFeed} />
  </div>
);

export default Podcast;
