import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { handleLogout, updateSignUpState, updateAuthenticatingState, fetchCurrentUser } from '../../store/actions/index';

import { Menu } from 'semantic-ui-react'
import NavigationItems from '../../components/NavigationItems/NavigationItems'

class Navbar extends Component {

    shouldComponentUpdate = nextProps => this.props.currentUser !== nextProps.currentUser;

    render() {
        let navLinks = [];
        
        let navButtons = [
            {
                color: 'red',
                content: 'Log In',
                clicked: this.props.updateAuthenticatingState
            },
            {
                color: 'twitter',
                content: 'Sign Up',
                clicked: this.props.updateSignUpState
            }
        ];


        if (this.props.isAuthenticated && !this.props.loading) {
            navButtons = [
                    {
                        color: 'red',
                        content: 'Log Out',
                        as: Link,
                        to: '/logout'
                    }
                ];
            navLinks = [
                     {
                        name: 'home',
                        link: '/',
                        content: 'Home',
                    },
                    {
                        name: 'dogSearch',
                        content: 'Find Dogs',
                        link: '/dogs',
                    },
                    {
                        name: 'parkSearch',
                        content: 'Search Parks',
                        link: '/parks',
                    },
                    {
                        name: 'userSearch',
                        content: 'View Users',
                        link: "/users",
                    },
                    {
                        name: 'myProfile',
                        content: 'My Profile',
                        link: `/users/${this.props.currentUser.id}`,
                    }
                ]
        };

        let navItems;
        
        if (!this.props.loading) {
            navItems = <NavigationItems
                navLinks={navLinks}
                navButtons={navButtons}
                clicked={this.handleItemClick}
            />
        }

        return (
            <Menu stackable>
                {navItems}
            </Menu>
        );
    };
};

const mapStateToProps = state => {
    const { currentUser, loading } = state.auth;
    const isAuthenticated = state.auth.token;
    return { isAuthenticated, currentUser, loading };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ handleLogout, updateSignUpState, updateAuthenticatingState, fetchCurrentUser }, dispatch)
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));