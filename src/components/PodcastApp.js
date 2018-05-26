import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../routers/AppRouter';

const IndecisionApp = () => (
  <Router>
    <div>
      <AppRouter />
    </div>
  </Router>
);

export default IndecisionApp;
