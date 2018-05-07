import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import AppRouter from '../routers/AppRouter';

export default class IndecisionApp extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <AppRouter />
                </div>
            </Router>
        )
    }
}