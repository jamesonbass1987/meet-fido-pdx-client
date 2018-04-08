import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateParkFilter, resetParkFilter } from '../../store/actions/index';

import { Form, Icon, Button } from 'semantic-ui-react';
import Checkbox from '../UI/FormElements/Checkbox/Checkbox';
import Input from '../UI/FormElements/Input/Input';
import ResetButton from '../UI/Buttons/Button/Button';

import classes from './ParkFilterForm.css';

class ParkFilterForm extends Component{

    handleFilterUpdate = (event, { id, value }) => {
        const formVal = id !== 'searchQuery' ? !this.props.parkFilter[id] : value;
        this.props.updateParkFilter(id, formVal);
    };

    handleFormReset = () => this.props.resetParkFilter();

    render(){
        return (
            <Form size="large" className={classes.Form}>
                <Input
                    className={classes.FormInput}
                    id="searchQuery"
                    type="text"
                    fluid
                    icon='search'
                    placeholder='Search for parks by name...'
                    value={this.props.parkFilter.searchQuery}
                    onChange={this.handleFilterUpdate}
                />
                <Form.Group width="16" inline className={classes.Inputs}>
                    <Checkbox
                        toggle
                        floated
                        id="fencedPark"
                        defaultChecked={this.props.parkFilter.fencedPark}
                        label="Fenced"
                        onChange={this.handleFilterUpdate}
                    />
                    <Checkbox
                        toggle
                        id="unfencedPark"
                        defaultChecked={this.props.parkFilter.unfencedPark}
                        label="Open Off Leash Areas"
                        onChange={this.handleFilterUpdate}
                    />
                    <ResetButton
                        animated='vertical'
                        onClick={this.handleFormReset}
                        color="twitter"
                        size="large"
                        className={classes.Button}
                        content={(
                            <React.Fragment>
                                <Button.Content hidden>Reset</Button.Content>
                                <Button.Content visible content={<Icon name='repeat' />} />
                            </React.Fragment>
                        )}
                    />
                </Form.Group>
            </Form>
        );
    };
};

const mapStateToProps = state => {
    const { parkFilter } = state.park;
    return { parkFilter };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators( { updateParkFilter, resetParkFilter }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ParkFilterForm);
