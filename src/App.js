import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authCheckState } from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Logout from './components/Logout/Logout';
import DogsIndex from './containers/DogsIndex/DogsIndex';
import ParksIndex from './containers/ParksIndex/ParksIndex';
import UsersRouter from './containers/UsersRouter/UsersRouter';

class App extends Component {

  componentWillMount() {
    this.props.authCheckState();
  };

  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.isAuthenticated
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
    );

    return (
        <Layout>
          <Switch>
            <PrivateRoute path='/dogs' component={DogsIndex} />
            <PrivateRoute path='/parks' component={ParksIndex} />
            <PrivateRoute path='/users' component={UsersRouter} />
            <PrivateRoute path='/logout' component={Logout} />
            <Route path="/" exact component={Home} />
            <Redirect to='/' />
          </Switch>
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  const isAuthenticated = !!state.auth.token
  return { isAuthenticated };
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ authCheckState }, dispatch)
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));