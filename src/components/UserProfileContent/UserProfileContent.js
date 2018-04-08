import React from 'react';

import { Segment, Divider } from 'semantic-ui-react';

import Dogs from '../Dogs/Dogs';
import Parks from '../Parks/Parks';

import Header from '../UI/Header/Header';

const userProfileContent = props => (
    <Segment>
        <Header as='h2' size="huge" content='My Dogs:' />
        {props.addBtn}
        <Dogs isEditable dogs={props.user.dogs} />
        <Divider />
        <Header as='h2' size="huge" content="Parks I Like:" />
        <Parks parks={props.user.parks} />
    </Segment>  
);

export default userProfileContent;