import React, { Component } from 'react';
import Header from './components/Header/Header.component';
import { MainPage } from './pages/MainPage/MainPage.component';
import { RegPage } from './pages/RegPage/RegPage.component';
import { Page } from './ui-kit/Page/Page.component';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.component';
import ErrorModal from './components/ErrorModal/ErrorModal.component';
import LogoutPage from './pages/LogoutPage/LogoutPage.component';

export default class App extends Component {
  render(): React.ReactNode {
    return (
      <Router>
        <Header />
        <Page>
          <Switch>
            <Route path="/catalog">lol</Route>
            <Route path="/" exact component={MainPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegPage} />
            <Route path="/logout" exact component={LogoutPage} />
          </Switch>
        </Page>
        <ErrorModal />
      </Router>
    );
  }
}
