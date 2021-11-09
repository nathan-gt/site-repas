import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Calendar } from './components/Calendar';
import { DetailPlat } from './components/DetailPlat';
import { ListeEpicerie } from './components/ListeEpicerie';
import { DetailsFamille } from './components/DetailsFamille';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import test from './components/test';

import './custom.css'


export default class App extends Component {
  static displayName = App.name;
  
  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/calendar' component={Calendar} />
        <Route path='/plat/:id' component={DetailPlat} />
        <Route path='/epicerie' component={ListeEpicerie} />
        <AuthorizeRoute path='/DetailsFamille' component={DetailsFamille} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
