import React from 'react';
import { NavLink } from 'react-router-dom';

const PodcastPageNav = props => (
  <div className="container u-margin-top-small">
    <div className="row podcast-nav">
      <div className="col-1-of-3">
        <NavLink
          to={`${props.match.url}/overview`}
          className="podcast-nav__item"
          activeClassName="podcast-nav__item--active"
        >
          Overview
        </NavLink>
      </div>
      <div className="col-1-of-3">
        <NavLink
          to={`${props.match.url}/charts`}
          className="podcast-nav__item"
          activeClassName="podcast-nav__item--active"
        >
          Charts
        </NavLink>
      </div>
      <div className="col-1-of-3">
        <NavLink
          to={`${props.match.url}/episodes`}
          className="podcast-nav__item"
          activeClassName="podcast-nav__item--active"
        >
          Episodes
        </NavLink>
      </div>
    </div>
  </div>
);

export default PodcastPageNav;
