import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../App.css';
import Header from './Header';
import MovieList from './MovieList';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import OrderSeats from './OrderSeats';

class AppInit extends Component { 
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/movielist" component={MovieList}/>
          <Route path="/orderseats" component={OrderSeats}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
        </div>
      </div>
    );
  }
}

export default AppInit;
