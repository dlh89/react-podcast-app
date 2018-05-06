import React from 'react';
import ProcessFeed from '../components/ProcessFeed';
import Search from '../components/Search';

const HomePage = ({ match }) => (
    <div className="container">
        <h1>Search</h1>
        <Search searchTerm={match.params.searchTerm}/>
    </div>
)

export default HomePage;