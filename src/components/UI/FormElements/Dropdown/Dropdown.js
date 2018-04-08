import React from 'react';
import { Form } from 'semantic-ui-react';

const dropdown = props => (
    <Form.Dropdown
        fluid={props.fluid}
        placeholder={props.placeholder}
        search={props.search}
        selection={props.selection}
        label={props.label}
        value={props.value}
        id={props.id}
        options={props.options}
        onChange={props.onChange}
        defaultValue={props.defaultValue} />
);

export default dropdown;