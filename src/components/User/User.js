import React from 'react';
import { Image, Popup, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import classes from './User.css';
import UserImage from '../UserImage/UserImage';


const user = props => {

    const dogsPopup = props.user.dogs.map(dog => {
        
        const popupHeader = <Popup.Header>
                                <Image src={dog.profile_image_url} verticalAlign='middle' circular /> <br />
                                {dog.name}
                            </Popup.Header>;
        
        return <Popup
            key={dog.name + dog.id}
            trigger={<Image src={dog.profile_image_url} avatar />}
            header={popupHeader}
            className={classes.Popup}
            content={dog.description}
        />;
    });

    const parksList = props.user.parks.map((park, i) => (
        <Label key={park.id + i} size="small" content={park.name} />
    ));
    
    const userProfileLink = `/users/${props.user.id}`;

    return (
        <Item className={classes.User}>
            <UserImage src={props.user.profile_image_url} />
            <Item.Content verticalAlign='middle'>
                <Item.Header as={ Link } to={userProfileLink}>{props.user.username}</Item.Header>
                <Item.Meta>
                    <span>{props.user.neighborhood.name}</span>
                </Item.Meta>
                <Item.Description>{props.user.bio}</Item.Description>
                <Item.Extra>
                    <strong>My favorite parks:</strong>{parksList}<br />
                    <strong>My dogs:</strong>{dogsPopup}
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default user;