import React from 'react';
import { List } from 'semantic-ui-react';


const formErrors = props => {
    const formErrors = props.error.map(error => <List.Item key={error} content={error} />);

    return (
        <List 
            style={{ color: "red", textTransform: 'capitalize' }}
            content={formErrors}
        />
    );
};

export default formErrors;