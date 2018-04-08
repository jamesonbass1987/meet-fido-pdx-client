import React from 'react';
import { Button, Confirm } from 'semantic-ui-react';

const confirmableButton = props => (
    <React.Fragment>
        <Button
            onClick={props.handleShow}
            color={props.color}
            fluid={props.fluid}
        >{props.message}</Button>
        <Confirm
            open={props.open}
            cancelButton='Never mind'
            confirmButton="Let's do it"
            onCancel={props.handleCancel}
            onConfirm={props.handleConfirm}
        />
    </React.Fragment>
);

export default confirmableButton;