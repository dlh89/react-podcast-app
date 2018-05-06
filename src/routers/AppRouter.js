import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import PodcastPage from '../components/PodcastPage';
import SearchPage from '../components/SearchPage';

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/podcast/:rssFeed(.*)" component={PodcastPage} />
          <Route path="/search/:searchTerm" component={SearchPage} />          
        </Switch>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;