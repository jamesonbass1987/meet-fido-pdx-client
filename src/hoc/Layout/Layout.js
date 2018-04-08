import React from 'react';
import Navbar from '../../containers/Navbar/Navbar'
import classes from './Layout.css';

const layout = props => (
            <React.Fragment>
                <Navbar />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </React.Fragment>
);

export default layout;