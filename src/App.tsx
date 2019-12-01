import React, { Component } from 'react';
import Header from './components/Header/Header.component';
import { MainPage } from './pages/MainPage/MainPage.component';
import { RegPage } from './pages/RegPage/RegPage.component';
import { Page } from './components/Page/Page.component';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.component';
import ErrorModal from './components/ErrorModal/ErrorModal.component';
import LogoutPage from './pages/LogoutPage/LogoutPage.component';
import GamePage from './pages/GamePage/GamePage.component';
import CartPage from './pages/CartPage/CartPage.component';
import UserCabinet from './pages/CabinetPage/User/UserCabinet.component';
import SellerCabinet from './pages/CabinetPage/Seller/SellerCabinet.component';

export default class App extends Component {
  render(): React.ReactNode {
    return (
      <Router>
        <Header />
        <Page>
          <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/catalog/:article" exact component={GamePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegPage} />
            <Route path="/logout" exact component={LogoutPage} />
            <Route path="/cart" exact component={CartPage} />
            <Route path="/cabinet/" exact component={UserCabinet} />
            <Route path="/cabinet/customer" exact component={SellerCabinet} />
          </Switch>
        </Page>
        <ErrorModal />
      </Router>
    );
  }
}
