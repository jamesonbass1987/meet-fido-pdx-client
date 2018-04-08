import React from 'react';
import { Form, Input, TextArea  } from 'semantic-ui-react';

const input = props => {

    let controlType;

    switch (props.control) {
        case 'textArea':
            controlType = TextArea 
            break
        case 'input':
            controlType = Input
            break
        default: 
            controlType = Input
    };

    return (
        <Form.Field
            control={controlType}
            id={props.id}
            icon={props.icon}
            type={props.type}
            label={props.label}
            onChange={props.onChange}
            value={props.value}
            placeholder={props.placeholder}
        />
    );
};

export default input;