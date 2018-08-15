import React from 'react';

const LoadingSpinner = props => (
  <div className="container">
    <p>{props.loadingText}</p>
    <div className="u-spinner u-absolute-center" />
  </div>
);

export default LoadingSpinner;
