import React from 'react';
import ProcessFeed from '../components/ProcessFeed';

const Podcast = ({ match }) => (
    <div className="container">
        <h1 className="heading heading--primary">Podcast Page</h1>
        <ProcessFeed feedUrl={match.params.rssFeed}/>
    </div>
)

export default Podcast;