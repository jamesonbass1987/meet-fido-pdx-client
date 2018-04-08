import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParks, updateUserFilter, resetUserFilter }  from '../../store/actions/index';
import { mapDropdownItems } from '../../shared/utility';

import { Form, Button, Icon } from 'semantic-ui-react';
import InputField from '../UI/FormElements/Input/Input';
import Dropdown from '../UI/FormElements/Dropdown/Dropdown';
import ResetButton from '../UI/Buttons/Button/Button';

import classes from './UsersForm.css';

class UsersForm extends Component {

    componentWillMount = () => {
        if (this.props.parks.length === 0){
            this.props.fetchParks();
        }
    }

    handleFilterUpdate = (event, { value, id }) => this.props.updateUserFilter(id, value);

    render() {

        const parksDropdownItems = mapDropdownItems(this.props.parks);

        return (
            <Form className={classes.UsersForm} size="large">
                <InputField
                    fluid
                    type="text"
                    control="input"
                    icon='search'
                    placeholder='Search for users by name...'
                    value={this.props.searchQuery}
                    onChange={this.handleFilterUpdate}
                    className={classes.InputDropdowns}
                    id='searchQuery'
                />
                <Dropdown
                    placeholder='Filter by the park a user visits...'
                    fluid
                    search
                    selection
                    options={parksDropdownItems}
                    onChange={this.handleFilterUpdate}
                    className={classes.InputDropdowns}
                    value={this.props.selectedPark}
                    id='selectedPark'
                />
                <ResetButton
                    animated='vertical'
                    onClick={() => this.props.resetUserFilter()}
                    color="twitter"
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
    const { parks } = state.park;
    const { searchQuery, selectedPark } = state.user.userFilter;
    return { parks, searchQuery, selectedPark };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators( { fetchParks, updateUserFilter, resetUserFilter }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersForm);
