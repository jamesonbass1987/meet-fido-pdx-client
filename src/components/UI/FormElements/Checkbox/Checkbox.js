import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

const checkbox = props => (
    <Form.Checkbox
        toggle={props.toggle}
        control={ Checkbox }
        id={props.id}
        defaultChecked={props.defaultChecked}
        label={props.label}
        onChange={props.onChange}
        value={props.value}
    />
);

export default checkbox;