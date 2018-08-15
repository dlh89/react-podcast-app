import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

/* Display a loading spinner whilst data is being retrieved by PodcastDataContainer component */

const RetrievingData = props => (
  <div>
    {!props.data.title && !props.data.error ? (
      <div className="u-margin-top-medium">
        <LoadingSpinner loadingText="Getting data..." />
      </div>
    ) : (
      <div className="container u-margin-top-medium">
        {props.data.error && (
          <div>
            <p>
              Unfortunately there was an error retrieving the data for this podcast. This web
              application relies on publicly available RSS feeds for its information and in some
              cases the data isn't available in a way that can be processed.
            </p>
            <p className="u-margin-top-small">
              <Link to="/">Return home</Link>
            </p>
          </div>
        )}
      </div>
    )}
  </div>
);

export default RetrievingData;
