import React from 'react';
import { dogFilter } from '../../shared/filters';
import Dog from '../Dog/Dog';
import { Card } from 'semantic-ui-react';

const dogs = props => {
    const dogsList = dogFilter(props.dogs, props.currentFilter);
    const dogNodeList = dogsList.map(dog => (
        <Dog isEditable={props.isEditable} key={dog.name + dog.id} dog={dog} />
    ));
    
    const dogs = <Card.Group 
                    itemsPerRow={4}
                    doubling
                    content={dogNodeList}
                />;

    return dogs;
}

export default dogs;
