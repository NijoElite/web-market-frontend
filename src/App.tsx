import React, {Component} from 'react';
import {Header} from './components/Header/Header.component';
import {MainPage} from './pages/MainPage/MainPage.component';
import {Page} from './pages/Page.component';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LoginPage } from './pages/LoginPage/LoginPage.component';


export default class App extends Component {

  render() {
    return (
      <Router>
        <Header/>
        <Page>
          <Switch>
            <Route path='/catalog'>
              lol
            </Route>
            <Route path='/login' exact component={LoginPage}/>
            <Route path='/' exact component={MainPage}/>
          </Switch>
        </Page>
      </Router>
    );
  }
}
