import React from 'react';
import { Item } from 'semantic-ui-react';

import Park from '../Park/Park';

import { parkFilter } from '../../shared/filters';

const parks = props => {

    let parksArray = props.currentFilter ? parkFilter(props.parks, props.currentFilter) : props.parks;
    
    let parksList;
    if (parksArray.length !== 0) {
        parksList = parksArray.map(park => (
            <Park key={park.id} park={park} />
        ))
    };

    return (
        <Item.Group divided>
            {parksList}
        </Item.Group>
    );
};

export default parks;