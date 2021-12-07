import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Calendar } from './components/Calendar';
import { DetailsRepas } from './components/DetailsRepas';
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
        <AuthorizeRoute path='/calendar' component={Calendar} />
        <AuthorizeRoute path='/repas/:id' component={DetailsRepas} />
        <AuthorizeRoute path='/ListeEpicerie' component={ListeEpicerie} />
        <AuthorizeRoute path='/DetailsFamille' component={DetailsFamille} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
