import React from 'react';
import { Header } from 'semantic-ui-react';

const header = props => (
    <Header 
        as={props.as} 
        textAlign={props.textAlign}
        content={props.content || props.children}
    />
);

export default header;