import React from 'react';
import { Menu, MenuItem, Button } from 'semantic-ui-react';
import classes from './NavigationItems.css';

import NavigationItem from '../NavigationItem/NavigationItem';
import Logo from '../UI/Logo/Logo';

const navigationItems = props => {

    const navLinks = props.navLinks.map(navItem => (
        <NavigationItem 
            activeItem={props.activeItem}
            name={navItem.name}
            clicked={props.clicked}
            link={navItem.link}
            key={navItem.name}
        />
    ));

    const navButtons = props.navButtons.map((navButton, i) => (
        <Button
            onClick={navButton.clicked ? navButton.clicked : null}
            color={navButton.color}
            className={classes.NavButton}
            key={i + navButton.content}
            as={navButton.as ? navButton.as : null}
            href={navButton.href ? navButton.href : null}
            to={navButton.to ? navButton.to : null}
        >{navButton.content}</Button>
    ));

    return (
        <Menu
            stackable
            size="large" 
            position="right"
            className={classes.Menu}
            >
                <Logo height="50px" />
                { navLinks }
            <MenuItem position='right'>
                { navButtons }
            </MenuItem>
        </Menu>
    );
};

export default navigationItems;
