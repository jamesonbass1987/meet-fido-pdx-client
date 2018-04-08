import React from 'react';
import pawPrintLogo from '../../../assets/images/paw-print.png';
import classes from './Logo.css';


const logo = props => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={pawPrintLogo} alt="MeetFidoPDX Logo" />
        {props.children}
    </div>
);

export default logo;