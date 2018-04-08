import React from 'react';
import { Header, Image } from 'semantic-ui-react';

import classes from './MainHeading.css';
import Logo from '../../assets/images/paw-print.png';

const mainHeading = props => (
    <div className={classes.HeadingContent}>
        <Image src={Logo} className={classes.LogoImage} centered size="small"/>
        <Header
            as='h1'
            content='MeetFidoPDX'
            size='large'
            className={classes.HeaderContent}
            inverted
            textAlign="center"
        />
        <Header
            as='h2'
            content='Find your best friend a place to play and meet other furry pals.'
            inverted
            textAlign="center"
            className={classes.HeaderSubContent}
        />
    </div>
);

export default mainHeading;
