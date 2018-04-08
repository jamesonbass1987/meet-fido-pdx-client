import React from 'react';
import classes from './UserImage.css';
import { Image } from 'semantic-ui-react';

const userImage = props => (
    <Image
        centered
        src={props.src}
        size={props.size ? props.size : null}
        className={classes.UserImage}
    />
);

export default userImage;