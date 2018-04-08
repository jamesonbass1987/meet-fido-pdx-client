import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDogAttribute, updateDogFilter, resetDogFilter } from '../../store/actions/index';
import { mapDropdownItems } from '../../shared/utility';

import { Form, Button, Icon } from 'semantic-ui-react';
import ResetButton from '../UI/Buttons/Button/Button';
import Dropdown from '../UI/FormElements/Dropdown/Dropdown';

import classes from './DogsFilterForm.css';
class DogFilterForm extends Component {

    componentWillMount = () => {
        if (this.props.attributes.breeds.length === 0){
            this.props.fetchDogAttribute("ages")
            this.props.fetchDogAttribute("breeds")
            this.props.fetchDogAttribute("sizes")
        };
    };

    handleFilterUpdate = (event, { value, id }) => this.props.updateDogFilter(id, value);

    render() {
        return (
            <Form className={classes.InputContainer}>
                <Dropdown
                    placeholder='Breed'
                    onChange={this.handleFilterUpdate}
                    fluid
                    search
                    className={classes.InputDropdowns}
                    selection
                    options={mapDropdownItems(this.props.attributes.breeds)}
                    value={this.props.currentFilter.breed}
                    id='breed'
                />
                <Dropdown
                    placeholder='Age'
                    fluid
                    className={classes.InputDropdowns}
                    selection
                    options={mapDropdownItems(this.props.attributes.ages)}
                    onChange={this.handleFilterUpdate}
                    value={this.props.currentFilter.age}
                    id='age'
                />
                <Dropdown
                    placeholder='Size'
                    fluid
                    className={classes.InputDropdowns}
                    selection
                    options={mapDropdownItems(this.props.attributes.sizes)}
                    onChange={this.handleFilterUpdate}
                    value={this.props.currentFilter.size}
                    id='size'
                />
                <ResetButton
                    animated='vertical'
                    onClick={this.props.resetDogFilter}
                    color="twitter"
                    size="large"
                    floated="right"
                    className={classes.Button}
                    content={(
                        <React.Fragment>
                            <Button.Content hidden>Reset</Button.Content>
                            <Button.Content visible content={<Icon name='repeat' />} />
                        </React.Fragment>
                    )}
                />
            </Form>
        );
    }
}

const mapStateToProps = state => {
    const { currentFilter, attributes } = state.dog;
    return { currentFilter, attributes };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchDogAttribute, 
                         updateDogFilter, 
                         resetDogFilter }, 
                         dispatch )
);


export default connect(mapStateToProps, mapDispatchToProps)(DogFilterForm);