import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Card from './Card';
import EpisodeDetails from './EpisodeDetails';
import Chart from './Chart';

const Overview = props =>
  (props.data.error ? (
    <div className="container u-margin-top-large">
      <p>
        Unfortunately the RSS feed for this podcast did not provide us with the data we require to
        generate our analysis. Please try searching for another podcast.
      </p>
      <Link to={'/'}>Return home</Link>
    </div>
  ) : (
    <div>
      <div className="section-heading">
        <div className="container">
          <h1 className="heading heading--primary">{props.data.title}</h1>
          <h2 className="heading heading--secondary">{props.data.description}</h2>
        </div>
      </div>
      <div className="section-stats u-margin-top-large">
        <div className="container">
          <h2 className="heading heading--secondary">Lifespan</h2>
          <p>Episodes: {props.data.episodes.length}</p>
          <p className="stats__headline">
            This podcast released its first episode{' '}
            <strong>{moment(props.data.episodes[0].published, 'YYYYMMDD').fromNow()}</strong>. The
            first episode is entitled <strong>"{props.data.episodes[0].title}"</strong> and was
            published on{' '}
            <strong>{moment(props.data.episodes[0].published).format('MMMM Do YYYY')}</strong>.
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
                        .seconds(props.data.averageDuration)
                        .format('H:mm:ss')}
                    </strong>.
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-1-of-3">
              <Card title="Longest Episode">
                <EpisodeDetails
                  episode={props.data.sortedByDuration[props.data.sortedByDuration.length - 1]}
                />
              </Card>
            </div>
            <div className="col-1-of-3">
              <Card title="Shortest Episode">
                <EpisodeDetails episode={props.data.sortedByDuration[0]} />
              </Card>
            </div>
          </div>
          <Chart
            title="Episode Length Over Time"
            label="Duration"
            labels={props.data.episodes.map(episode => episode.title)}
            data={props.data.episodes.map(episode => episode.duration)}
          />
          <h2 className="heading heading--secondary">Releases</h2>
          <div className="row">
            <div className="col-1-of-3">
              <Card title="Average time between releases">
                <div className="card__section">
                  <p className="card__text">
                    The average time between releases is{' '}
                    <strong>{Math.round(props.data.averageTimeBetweenReleases)} days</strong>.
                  </p>
                </div>
              </Card>
            </div>
            <div className="col-1-of-3">
              <Card title="Longest time between releases">
                {props.data.longestBreak && (
                  <p>
                    The longest time between releases was{' '}
                    <strong>{props.data.longestBreak.episode.daysBeforeNextEp} days</strong>. It
                    occurred between{' '}
                    <strong>
                      {moment(props.data.longestBreak.episode.published).format('MMMM Do YYYY')}
                    </strong>{' '}
                    and{' '}
                    <strong>
                      {moment(props.data.longestBreak.nextEpisode.published).format('MMMM Do YYYY')}
                    </strong>.
                  </p>
                )}
              </Card>
            </div>
            <div className="col-1-of-3">
              <Card title="Shortest time between releases">
                {props.data.longestBreak && (
                  <p>
                    The shortest time between releases was{' '}
                    <strong>{props.data.shortestBreak.episode.daysBeforeNextEp} days</strong>. It
                    occurred between{' '}
                    <strong>
                      {moment(props.data.shortestBreak.episode.published).format('MMMM Do YYYY')}
                    </strong>{' '}
                    and{' '}
                    <strong>
                      {moment(props.data.shortestBreak.nextEpisode.published).format('MMMM Do YYYY')}
                    </strong>.
                  </p>
                )}
              </Card>
            </div>
          </div>
          <Chart
            title="Days Between Releases Over Time"
            label="Days Before Next Episode"
            labels={props.data.episodes.map(episode => episode.title)}
            data={props.data.episodes.map(episode => episode.daysBeforeNextEp)}
          />
          <img src={props.data.image} className="stats__image" />
        </div>
      </div>
    </div>
  ));

export default Overview;
