import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onLogin } from '../actions';
import '../supports/css/components/loginpage.css';

const cookies = new Cookies();

class LoginPage extends Component {
    // obj1 = (fn, c) => {
    //     var d = fn(c);
    //     return (a,b = d) => [a,b];
    // }

    // test = (num) => {
    //     return num;
    // }
    // componentWillReceiveProps(newProps) {
    //     if(newProps.auth.username !== "") {
    //         cookies.set('CinemaBertasbih', newProps.auth.email, { path: '/' });
    //     }
    // }

    onLoginClick = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        this.props.onLogin({ email, password });
    }
    
    render() {
        // console.log(this.obj1(this.test(7), 8)(5)[1]);
        if(this.props.auth.username === ""){
            return (
                <div className="login-background">
                    <div className="container">
                        <h1 className="form-heading">Login Form</h1>
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Its nice to have you back!</h2>
                                    <p>Please enter your email and password</p>
                                </div>
                                <form id="Login">
    
                                    <div className="form-group">
    
    
                                        <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email Address" />
    
                                    </div>
    
                                    <div className="form-group">
    
                                        <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" />
    
                                    </div>
                                    <div className="forgot">
                                        <a href="reset.html">Forgot password?</a>
                                    </div>
                                    <input type="button" className="btn btn-primary" value="Login" onClick={this.onLoginClick}/>
                                    <h2 className="label-danger">{this.props.auth.error}</h2>
                                </form>
                            </div>
                            <p className="botto-text"> Designed by Sunil Rajput</p>
                        </div>
                    </div>
                </div>
            );
        }

        return <Redirect to="/" />;
        
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogin })(LoginPage);

// connect = (map) => {
//     var globalState = getGlobalState();
//     map(globalState);
//     return (classComp) => { };
// }