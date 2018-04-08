import React from 'react';
import { Button } from 'semantic-ui-react';

const button = props => (
    <Button 
        as={props.as}
        href={props.href}
        type={props.type}
        fluid={props.fluid}
        content={props.content}
        size={props.size}
        icon={props.icon}
        color={props.color}
        animated={props.animated}
        floated={props.floated}
        onClick={props.onClick}
        disabled={props.disabled}
    >{props.children}</Button>
);

export default button;