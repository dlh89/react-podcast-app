import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container">
    <h1>404 - Page not found!</h1>
    <p>
      <Link to="/">Go home</Link>
    </p>
  </div>
);

export default NotFoundPage;
