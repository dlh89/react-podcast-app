import React from 'react';
import parsePodcast from 'node-podcast-parser';
import moment from 'moment';
import Overview from './Overview';

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
      error: '',
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

  static sortByDuration(episodes) {
    const sortedByDuration = episodes
      .map(episode => episode)
      .sort((a, b) => (a.duration > b.duration ? 1 : -1));
    return sortedByDuration;
  }

  static addTimeBetweenEpisodes(episodes) {
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
    const longestBreak = ProcessFeed.getEpisodeAndNextEpisode(
      episodes,
      sortedByBreaks[sortedByBreaks.length - 1],
    );
    const shortestBreak = ProcessFeed.getEpisodeAndNextEpisode(episodes, sortedByBreaks[0]);
    this.setState({
      longestBreak,
      shortestBreak,
    });
  }

  static getEpisodeAndNextEpisode(episodes, episode) {
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
    parsePodcast(data, (err, jsonData) => {
      if (err) {
        console.error(err);
        this.setState({
          error: true,
        });
        return;
      }
      console.log(jsonData);

      if (!jsonData.episodes[0].duration) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          title: jsonData.title,
          description: jsonData.description.long,
          image: jsonData.image,
          sortedByDuration: ProcessFeed.sortByDuration(jsonData.episodes),
          episodes: ProcessFeed.addTimeBetweenEpisodes(jsonData.episodes),
        });

        this.getSignificantBreaks(this.state.episodes);
        this.getAverageDuration(this.state.episodes);
        this.getAverageTimeBetweenReleases(this.state.episodes);
      }
    });
  }

  render() {
    return (
      <div>
        {!this.state.title && !this.state.error ? (
          <div className="container u-margin-top-medium">
            <p>Getting data...</p>
            <div className="u-spinner u-absolute-center" />
          </div>
        ) : (
          <div>
            <Overview data={{ ...this.state }} />
          </div>
        )}
      </div>
    );
  }
}
