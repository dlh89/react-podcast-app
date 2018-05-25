import React from 'react';
import moment from 'moment';
import readableSeconds from 'readable-seconds';

export default class EpisodeDetails extends React.Component {
  constructor(props) {
    super(props);
    const releaseDate = this.props.episode.published;
    this.state = {
      releasedString: `${moment(releaseDate).format('MMMM Do YYYY')}`,
    };
  }
  render() {
    return (
      <div>
        <h4 className="card__heading--sub">Title</h4>
        <p className="card__text">
          <a href={this.props.episode.enclosure.url} target="_none">
            {this.props.episode.title}
          </a>
        </p>
        <hr className="card__hr" />
        <h4 className="card__heading--sub">Duration</h4>
        <p className="card__text">{readableSeconds(this.props.episode.duration)}</p>
        <hr className="card__hr" />
        <h4 className="card__heading--sub">Release Date</h4>
        <p className="card__text">{this.state.releasedString}</p>
      </div>
    );
  }
}
