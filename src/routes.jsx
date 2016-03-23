var React = require('react');
var ReactRouter = require('react-router');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = require('react-router').browserHistory;

var BasePage = require('./components/BasePage.jsx');
var Glossary = require('./components/Glossary.jsx');

var Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={BasePage}>
      <IndexRoute component={Glossary}></IndexRoute>
    </Route>
  </Router>
);

module.exports = Routes;

// <Route path="/product/:productId" component={ProductPage}></Route>