import React from 'react';
import { Link } from 'react-router-dom';

const UnableToRetrieveData = () => (
  <div className="container u-margin-top-large">
    <p>
      Unfortunately the RSS feed for this podcast did not provide us with the data we require to
      generate our analysis. Please try searching for another podcast.
    </p>
    <Link to={'/'}>Return home</Link>
  </div>
);

export default UnableToRetrieveData;
