import React from 'react';
import User from '../User/User';
import Spinner from '../UI/Spinner/Spinner';

import { Item } from 'semantic-ui-react';

import { userFilter } from '../../shared/filters';

const users = props => {

    let usersList = <Spinner />;

    if (!props.loading) {
        const usersArray = userFilter(props.users, props.currentFilter);
        usersList = usersArray.map(user => (
            <User key={user.username} user={user} />
        ));
    };

    return (
        <Item.Group divided>
            {usersList}
        </Item.Group>
    );
};

export default users;