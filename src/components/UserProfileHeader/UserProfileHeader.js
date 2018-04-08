import React from 'react';

import { Segment, Divider, Header } from 'semantic-ui-react';
import UserImage from '../UserImage/UserImage';
import classes from './UserProfileHeader.css';

const userProfileHeader = props => (
    <Segment className={classes.ProfileHeaderSection}>
        <UserImage src={props.user.profile_image_url} />
        <Divider />
        <Header 
            className={classes.ProfileHeader} 
            as='h1' 
            size="huge" 
            textAlign="center" 
        >
            {props.user.username}
            <Header.Subheader
                content={props.user.neighborhood.name}
            />
            <Header.Subheader
                className={classes.ProfileSubHeader}
                content={props.user.bio}
            />
        </Header>
        {props.button}
    </Segment>
);

export default userProfileHeader;