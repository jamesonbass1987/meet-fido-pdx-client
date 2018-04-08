import React from 'react';
import { Modal } from 'semantic-ui-react';

const modal = props => (
    <Modal
        open={props.show}
        closeIcon
        onClose={() => props.handleClose(props.type)}
        basic={props.basic}
    > {props.children}
    </Modal> 
);
 
export default modal;