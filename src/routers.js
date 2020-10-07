import React from 'react';
import ReactDOM from 'react-dom';
import  Component from 'react';
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Home = require('./pages/home.js');
var About = require('./pages/about.js');
var Routes = (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </Router>
);

export default Routes;
