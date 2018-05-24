import React from 'react';
import PopularGrid from './PopularGrid';

const HomePage = () => (
  <div>
    <div className="section-banner">
      <div className="container">
        <h1 className="heading heading--main">Podsend</h1>
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
