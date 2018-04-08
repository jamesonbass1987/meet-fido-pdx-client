import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUser } from '../../store/actions/index';



import { Container, Segment, Divider } from 'semantic-ui-react';
import Spinner from '../../components/UI/Spinner/Spinner';
import PageHeading from '../../components/PageHeading/PageHeading';
import UsersForm from '../../components/UsersForm/UsersForm';
import Users from '../../components/Users/Users';

import classes from './UsersIndex.css';

class UsersIndex extends Component {

    componentWillMount = () => this.props.fetchUsers();
    
    render(){

        let users = <Spinner />;
        if (!this.props.loading && this.props.currentUser) {
            users = <Segment>
                        <UsersForm />
                        <Divider />
                        <Users 
                            users={this.props.users.filter(user => user.id !== this.props.currentUser.id)} 
                            currentFilter={this.props.userFilter} 
                            parkFilter={this.props.parkFilter} 
                            loading={this.props.loading} 
                        />
                    </Segment>;
        };

        return (
            <Container className={classes.Container}>
                <PageHeading
                    as="h1"
                    textAlignment="center"
                    iconName="users"
                    iconColor="blue"
                    headingText="Search Users"
                    type="icon"
                    subheadingText="Find others looking to meet up for a puppy playdate in PDX." />
                {users}
            </Container>
        );
    };
};

const mapStateToProps = state => {
    const { users, loading, userFilter } = state.user;
    const { parkFilter } = state.park;
    const { currentUser } = state.auth;

    return { users, 
             loading, 
             userFilter,
             parkFilter,
             currentUser };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchUsers, fetchUser }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
