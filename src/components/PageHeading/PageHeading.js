import React from 'react';
import classes from './PageHeading.css';

import { Header, Icon } from 'semantic-ui-react';

import UserImage from '../UserImage/UserImage';

const pageHeading = props => {

    const headingMedia = props.type === 'icon' ? 
        (<Icon name={props.iconName} color={props.iconColor} />) : 
        (<UserImage src={props.imageSrc} /> );


    return (
        <Header as={props.as} textAlign={props.textAlignment} className={classes.Header} icon>
            {headingMedia}
            {props.headingText}
            <Header.Subheader>
                {props.subheadingText}
            </Header.Subheader>
        </Header>
    );
};

export default pageHeading;