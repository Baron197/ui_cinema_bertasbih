import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';
import logo from './logo.svg';
import AppInit from './components/AppInit';
import { keepLogin, cookieChecked } from './actions';

const cookies = new Cookies();

class App extends Component {
  componentWillMount() {
    const cookieNya = cookies.get('CinemaBertasbih');
    if(cookieNya !== undefined) {
        this.props.keepLogin(cookieNya);
    }
    else {
        this.props.cookieChecked();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.username === "" && (this.props.auth.username !== newProps.auth.username)) {
        cookies.remove('CinemaBertasbih');
    }
    else if(newProps.auth.username !== "" && (this.props.auth.username !== newProps.auth.username)) {
      cookies.set('CinemaBertasbih', newProps.auth.email, { path: '/' });
    }
  }

  render() {
    if(this.props.auth.cookieCheck) {
      return (
        <AppInit />
      );
    }
    
    return (
      <div>
        <img 
          src="https://archive-media-0.nyafuu.org/wg/image/1504/06/1504066431783.gif"
          className="img-responsive"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));
