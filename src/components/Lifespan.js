import React from 'react';
import moment from 'moment';

const Lifespan = props => (
  <div>
    <h2 className="heading heading--secondary">Lifespan</h2>
    <p>Episodes: {props.episodes.length}</p>
    <p className="stats__headline">
      This podcast released its first episode{' '}
      <strong>{moment(props.episodes[0].published, 'YYYYMMDD').fromNow()}</strong>. The first
      episode is entitled <strong>"{props.episodes[0].title}"</strong> and was published on{' '}
      <strong>{moment(props.episodes[0].published).format('MMMM Do YYYY')}</strong>.
    </p>
  </div>
);

export default Lifespan;
