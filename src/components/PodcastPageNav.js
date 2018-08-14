import React from 'react';
import { NavLink } from 'react-router-dom';

const PodcastPageNav = props => (
  <div className="container u-margin-top-small">
    <ul className="podcast-nav">
      <li>
        <NavLink
          to={`${props.match.url}/overview`}
          className="podcast-nav__item"
          activeClassName="podcast-nav__item--active"
        >
          Overview
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${props.match.url}/charts`}
          className="podcast-nav__item"
          activeClassName="podcast-nav__item--active"
        >
          Charts
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${props.match.url}/episodes`}
          className="podcast-nav__item"
          activeClassName="podcast-nav__item--active"
        >
          Episodes
        </NavLink>
      </li>
    </ul>
  </div>
);

export default PodcastPageNav;
