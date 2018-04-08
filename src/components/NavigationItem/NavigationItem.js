import React from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import classes from './NavigationItem.css';

const navigationItem = props => (
        <Menu.Item
            as={ Link } 
            to={props.link}
            content={props.content}
            name={props.name} 
            className={classes.NavigationItem}
            children={props.children}
            key={props.link}
            >
        </Menu.Item>
);

export default navigationItem;