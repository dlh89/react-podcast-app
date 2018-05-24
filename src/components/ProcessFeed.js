import React from 'react';
import parsePodcast from 'node-podcast-parser';
import moment from 'moment';
import Card from './Card';
import EpisodeDetails from './EpisodeDetails';
import Chart from './Chart';

export default class ProcessFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      averageDuration: '',
      image: '',
      sortedByDuration: [],
      episodes: [],
      longestBreak: '',
      shortestBreak: '',
      averageTimeBetweenReleases: '',
    };
    this.getFeed();
  }

  getFeed() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (e) => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = e.target.responseText;
        this.convertXmlToJson(data);
      }
    };
    const url = `/api/feed?feedUrl=${this.props.feedUrl}`;
    xhttp.open('GET', url, true);
    xhttp.send();
  }

  sortByDuration(episodes) {
    const sortedByDuration = episodes
      .map(episode => episode)
      .sort((a, b) => (a.duration > b.duration ? 1 : -1));
    return sortedByDuration;
  }

  addTimeBetweenEpisodes(episodes) {
    const sortedEpisodes = episodes.sort((a, b) => (a.published > b.published ? 1 : -1));
    const updatedEpisodes = sortedEpisodes.map((episode, i) => {
      let daysBeforeNextEp;
      if (episodes[i + 1]) {
        daysBeforeNextEp = moment(episodes[i + 1].published).diff(
          moment(episode.published),
          'days',
        );
      }

      const updatedEpisode = {
        ...episode,
        episodeNumber: i + 1,
        daysBeforeNextEp,
      };
      return updatedEpisode;
    });
    return updatedEpisodes;
  }

  getSignificantBreaks(episodes) {
    const sortedByBreaks = episodes
      .reduce((result, episode, i) => {
        if (episode.daysBeforeNextEp >= 0) {
          result.push(episode);
        }
        return result;
      }, [])
      .sort((a, b) => (a.daysBeforeNextEp > b.daysBeforeNextEp ? 1 : -1));
    const longestBreak = this.getEpisodeAndNextEpisode(
      episodes,
      sortedByBreaks[sortedByBreaks.length - 1],
    );
    const shortestBreak = this.getEpisodeAndNextEpisode(episodes, sortedByBreaks[0]);
    console.log('longest break', longestBreak);
    console.log('shortest break', shortestBreak);
    this.setState({
      longestBreak,
      shortestBreak,
    });
    console.log(this.state.longestBreak);
  }

  getEpisodeAndNextEpisode(episodes, episode) {
    const nextEpisode = episodes[episode.episodeNumber];
    return { episode, nextEpisode };
  }

  getAverageDuration(episodes) {
    // reduce episodes array to only include episodes with durations
    const episodesDurations = episodes.reduce((result, episode) => {
      if (episode.duration) {
        result.push(episode.duration);
      }
      return result;
    }, []);
    // get the mean duration
    const averageDuration =
      episodesDurations.reduce((accumulator, currentValue) => accumulator + currentValue) /
      episodesDurations.length;
    this.setState({
      averageDuration,
    });
  }

  getAverageTimeBetweenReleases(episodes) {
    // reduce episodes array to only include episodes with daysBeforeNextEpisode
    const episodeReleaseDates = episodes.reduce((result, episode) => {
      if (episode.daysBeforeNextEp >= 0) {
        result.push(episode.daysBeforeNextEp);
      }
      return result;
    }, []);
    // get the mean time between releases
    const averageTimeBetweenReleases =
      episodeReleaseDates.reduce((accumulator, currentValue) => accumulator + currentValue) /
      episodeReleaseDates.length;
    this.setState({
      averageTimeBetweenReleases,
    });
  }

  convertXmlToJson(data) {
    parsePodcast(data, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);

      this.setState({
        title: data.title,
        description: data.description.long,
        image: data.image,
        sortedByDuration: this.sortByDuration(data.episodes),
        episodes: this.addTimeBetweenEpisodes(data.episodes),
      });
      this.getSignificantBreaks(this.state.episodes);
      this.getAverageDuration(this.state.episodes);
      this.getAverageTimeBetweenReleases(this.state.episodes);
    });
  }

  render() {
    return (
      <div>
        {!this.state.title ? (
          <div className="container u-margin-top-medium">
            <p>Getting data...</p>
            <div className="u-spinner u-absolute-center" />
          </div>
        ) : (
          <div>
            <div className="section-heading">
              <div className="container">
                <h1 className="heading heading--primary">{this.state.title}</h1>
                <h2 className="heading heading--secondary">{this.state.description}</h2>
              </div>
            </div>
            <div className="section-stats u-margin-top-large">
              <div className="container">
                <h2 className="heading heading--secondary">Lifespan</h2>
                <p>Episodes: {this.state.episodes.length}</p>
                <p className="stats__headline">
                  This podcast released its first episode{' '}
                  <strong>{moment(this.state.episodes[0].published, 'YYYYMMDD').fromNow()}</strong>.
                  The first episode is entitled <strong>"{this.state.episodes[0].title}"</strong>{' '}
                  and was published on{' '}
                  <strong>{moment(this.state.episodes[0].published).format('MMMM Do YYYY')}</strong>.
                </p>
                <h2 className="heading heading--secondary">Durations</h2>
                <div className="row">
                  <div className="col-1-of-3">
                    <Card title="Average Length">
                      <div className="card__section">
                        <p className="card__text">
                          The average episode length is{' '}
                          <strong>
                            {moment()
                              .startOf('day')
                              .seconds(this.state.averageDuration)
                              .format('H:mm:ss')}
                          </strong>.
                        </p>
                      </div>
                    </Card>
                  </div>
                  <div className="col-1-of-3">
                    <Card title="Longest Episode">
                      <EpisodeDetails
                        episode={
                          this.state.sortedByDuration[this.state.sortedByDuration.length - 1]
                        }
                      />
                    </Card>
                  </div>
                  <div className="col-1-of-3">
                    <Card title="Shortest Episode">
                      <EpisodeDetails episode={this.state.sortedByDuration[0]} />
                    </Card>
                  </div>
                </div>
                <Chart
                  title="Episode Length Over Time"
                  label="Duration"
                  labels={this.state.episodes.map(episode => episode.title)}
                  data={this.state.episodes.map(episode => episode.duration)}
                />
                <h2 className="heading heading--secondary">Releases</h2>
                <div className="row">
                  <div className="col-1-of-3">
                    <Card title="Average time between releases">
                      <div className="card__section">
                        <p className="card__text">
                          The average time between releases is{' '}
                          <strong>{Math.round(this.state.averageTimeBetweenReleases)} days</strong>.
                        </p>
                      </div>
                    </Card>
                  </div>
                  <div className="col-1-of-3">
                    <Card title="Longest time between releases">
                      {this.state.longestBreak && (
                        <p>
                          The longest time between releases was{' '}
                          <strong>{this.state.longestBreak.episode.daysBeforeNextEp} days</strong>.
                          It occurred between{' '}
                          <strong>
                            {moment(this.state.longestBreak.episode.published).format('MMMM Do YYYY')}
                          </strong>{' '}
                          and{' '}
                          <strong>
                            {moment(this.state.longestBreak.nextEpisode.published).format('MMMM Do YYYY')}
                          </strong>.
                        </p>
                      )}
                    </Card>
                  </div>
                  <div className="col-1-of-3">
                    <Card title="Shortest time between releases">
                      {this.state.longestBreak && (
                        <p>
                          The shortest time between releases was{' '}
                          <strong>{this.state.shortestBreak.episode.daysBeforeNextEp} days</strong>.
                          It occurred between{' '}
                          <strong>
                            {moment(this.state.shortestBreak.episode.published).format('MMMM Do YYYY')}
                          </strong>{' '}
                          and{' '}
                          <strong>
                            {moment(this.state.shortestBreak.nextEpisode.published).format('MMMM Do YYYY')}
                          </strong>.
                        </p>
                      )}
                    </Card>
                  </div>
                </div>
                <Chart
                  title="Days Between Releases Over Time"
                  label="Days Before Next Episode"
                  labels={this.state.episodes.map(episode => episode.title)}
                  data={this.state.episodes.map(episode => episode.daysBeforeNextEp)}
                />
                <img src={this.state.image} className="stats__image" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
