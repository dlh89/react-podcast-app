import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Overview from '../components/Overview';
import Episodes from '../components/Episodes';
import PodcastPageNav from '../components/PodcastPageNav';
import PodcastDataContainer from '../components/PodcastDataContainer';
import RetrievingData from '../components/RetrievingData';
import PodcastHeader from '../components/PodcastHeader';

export default class PodcastPageRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
    this.dataCallback = this.dataCallback.bind(this);
  }
  dataCallback(data) {
    this.setState({ data });
  }
  render() {
    return (
      <div>
        <PodcastDataContainer
          feedUrl={this.props.match.params.rssFeed}
          dataCallback={this.dataCallback}
        />
        <RetrievingData data={this.state.data} />
        {this.state.data.title && (
          <div>
            <PodcastHeader data={this.state.data} />
            <PodcastPageNav match={this.props.match} />
          </div>
        )}
        <Switch>
          <Route path={`${this.props.match.path}/overview`} component={Overview} />
          <Route
            path={`${this.props.match.path}/episodes`}
            render={() => <Episodes data={this.state.data} />}
          />
        </Switch>
      </div>
    );
  }
}
