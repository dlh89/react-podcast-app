import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import PodcastPage from '../components/PodcastPage';
import SearchPage from '../components/SearchPage';
import Navbar from '../components/Navbar';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Navbar />        
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/podcast/:rssFeed(.*)" component={PodcastPage} />
          <Route path="/search/:searchTerm" component={SearchPage} />          
        </Switch>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;