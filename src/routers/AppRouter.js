import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import HomePage from '../components/HomePage';
import PodcastPageRouter from '../routers/PodcastPageRouter';
import SearchPage from '../components/SearchPage';
import SearchResults from '../components/SearchResults';
import Navbar from '../components/Navbar';
import NotFoundPage from '../components/NotFoundPage';

export const history = createHistory();

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/podcast/:rssFeed(.*)" component={PodcastPageRouter} />
        <Route path="/search/" component={SearchPage} exact={true} />
        <Route path="/search/:searchTerm" component={SearchResults} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
