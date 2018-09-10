import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onLogout, keepLogin, cookieChecked } from '../actions';

const cookies = new Cookies();

class Header extends Component {

    // componentWillMount() {
    //     const cookieNya = cookies.get('CinemaBertasbih');
    //     if(cookieNya !== undefined) {
    //         this.props.keepLogin(cookieNya);
    //     }
    //     else {
    //         this.props.cookieChecked();
    //     }
    // }

    // componentWillReceiveProps(newProps) {
    //     if(newProps.auth.username === "") {
    //         cookies.remove('CinemaBertasbih');
    //     }
    // }

    onLogOutClick = () => {
        this.props.onLogout();
    }

    renderNavbar = () => {
        if(this.props.auth.username !== "") {
            return (<Navbar fixedTop={true} inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Cinema Bertasbih</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}>
                            <Link to="/movielist">Movie List</Link>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        {/* <NavItem eventKey={1} href="#">
                            Hello, {this.props.auth.username}
                        </NavItem> */}
                        <NavDropdown eventKey={2} title={"Hello, " + this.props.auth.username} id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1}>Profile</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.2} onSelect={this.onLogOutClick}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>);
        }

        return (<Navbar fixedTop={true} inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Cinema Bertasbih</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1}>
                        <Link to="/movielist">Movie List</Link>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={2}>
                        <Link to="/login">Login</Link>
                    </NavItem>
                    <NavItem eventKey={3}>
                        <Link to="/register">Register</Link>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>);
    }
    render() {
        return( 
            this.renderNavbar()
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(Header);

//Penjelasan function connect dari react redux
// connect = (fnMap, objActionCreator) => {
//     var globalState = getGlobalState();
//     var objProps = fnMap(globalState);

//     return (className) => {
//         var obj = new className();
//         for props in objProps {
//             obj.props[props] = objProps[props];
//         }
//         for props in objActionCreator {
//             obj.props[props] = objActionCreator[props];
//         }
//     };
// }