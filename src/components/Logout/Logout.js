import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleLogout, removeCurrentUser } from '../../store/actions/index';

class Logout extends Component {
    componentDidMount = () => {
        this.props.handleLogout();
        this.props.removeCurrentUser();
    };

    render() {
        return <Redirect to="/" />;
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ handleLogout, removeCurrentUser }, dispatch)
);

export default connect(null, mapDispatchToProps)(Logout);