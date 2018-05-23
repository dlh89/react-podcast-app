import React from 'react';
import ProcessFeed from '../components/ProcessFeed';

const Podcast = ({ match }) => (
  <div>
    <ProcessFeed feedUrl={match.params.rssFeed} />
  </div>
);

export default Podcast;
