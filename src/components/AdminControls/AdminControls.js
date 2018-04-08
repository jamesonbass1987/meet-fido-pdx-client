import React from 'react';

import { Segment, Button} from 'semantic-ui-react';
import ConfirmableButton from '../UI/Buttons/ConfirmableButton/ConfirmableButton';

import classes from './AdminControls.css';

const adminControls = props => (
    <Segment>
        <Button
            onClick={() => props.toggleModal('userForm')}
            color="yellow"
            fluid={props.fluid}
            content="Edit Profile"
            className={classes.Button}
        />

        <ConfirmableButton
            open={props.open}
            handleShow={props.show}
            cancelButton='Never mind'
            confirmButton="Let's do it"
            handleCancel={props.handleCancel}
            handleConfirm={props.handleConfirm}
            color="red"
            fluid={props.fluid}
            message="Delete My Profile"
        />
    </Segment>
);

export default adminControls;