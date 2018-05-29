import React from 'react';
import PopularGrid from './PopularGrid';

const HomePage = () => (
  <div>
    <div className="section-banner">
      <div className="container">
        <h1 className="heading heading--main u-margin-top-large">Podsend</h1>
        <h2 className="heading heading--sub u-padding-bottom-large">
          Find out everything you wanted to know about your favourite podcasts
        </h2>
      </div>
    </div>
    <div className="section-info u-margin-top-large">
      <div className="container">
        <PopularGrid />
      </div>
    </div>
  </div>
);

export default HomePage;
