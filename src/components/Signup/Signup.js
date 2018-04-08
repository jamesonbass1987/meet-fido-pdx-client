import React, { Component } from 'react';
import { handleUserSignUp, fetchNeighborhoods } from '../../store/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateObject, checkValidity } from '../../shared/utility';

import { Form, Image } from 'semantic-ui-react';

import Icon from '../../assets/images/paw-print.png';
import FormErrors from '../FormErrors/FormErrors';
import Header from '../UI/Header/Header';
import Button from '../UI/Buttons/Button/Button';
import Input from '../UI/FormElements/Input/Input';
import Dropdown from '../UI/FormElements/Dropdown/Dropdown';

import classes from './Signup.css';

class SignUpForm extends Component {

    state = {
        formData: {
            username: {
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            neighborhood_id: {
                value: '',
                validation: {
                    requiredDropdown: true,
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            password_confirmation: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    };

    componentWillMount = () => this.props.fetchNeighborhoods();

    handleFormInputChange = (e, { value, id }) => {
        const updatedFormData = updateObject(this.state.formData, {
            [id]: updateObject(this.state.formData[id], {
                value,
                valid: checkValidity(value, this.state.formData[id].validation),
                touched: true
            })
        });
        this.setState({ formData: updatedFormData });
    };

    handleFormSubmission = () => {
        const userInfo = {
            username: this.state.formData.username.value,
            password: this.state.formData.password.value,
            password_confirmation: this.state.formData.password_confirmation.value,
            email: this.state.formData.email.value,
            neighborhood_id: this.state.formData.neighborhood_id.value
        };

        this.props.handleUserSignUp(userInfo);
    };

    render() {

        let errorMessage;
        if (this.props.error) {
            errorMessage = <FormErrors error={this.props.error} />
        };

        const submitDisabled = Object.values(this.state.formData).some(inputField => !inputField.valid);

        const dropdownItems = this.props.neighborhoods.map(neighborhood => ({
                text: neighborhood.name,
                value: neighborhood.id,
                key: neighborhood.name + neighborhood.id
            })
        );
        
        return (
            <Form onSubmit={this.handleFormSubmission} className={classes.Form} size='large'>
                    <Image 
                        centered 
                        src={Icon} 
                        className={classes.HeaderIcon} 
                    />
                    <Header
                        as='h2'
                        className={classes.SignUpHeading}
                        textAlign='center'
                        content="Sign Up For A New Account" />
                    {errorMessage}
                    <Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        placeholder='Username'
                        id='username'
                        value={this.state.username}
                        onChange={this.handleFormInputChange}
                    />
                    <Input
                        fluid
                        icon='mail'
                        id='email'
                        iconPosition='left'
                        placeholder='E-mail address'
                        value={this.state.email}
                        onChange={this.handleFormInputChange}
                    />
                    <Input
                        fluid
                        icon='lock'
                        id='password'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        value={this.state.password}
                        onChange={this.handleFormInputChange}
                    />
                    <Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        id='password_confirmation'
                        placeholder='Password Confirmation'
                        type='password'
                        value={this.state.password_confirmation}
                        onChange={this.handleFormInputChange}
                    />
                    <Dropdown 
                        placeholder='Select your neighborhood...'
                        fluid
                        selection
                        id='neighborhood_id'
                        options={dropdownItems}
                        value={this.state.formData.neighborhood_id.value}
                        onChange={this.handleFormInputChange}
                    />
                    <Button 
                        disabled={submitDisabled} 
                        type="submit" 
                        className={classes.SignUpButton} 
                        fluid 
                        color="blue"
                        size='large'
                        content="Sign Up"
                    />
            </Form>
        );
    };
};

const mapStateToProps = state => {
    const { neighborhoods } = state.neighborhood;
    const { error } = state.auth;
    return { neighborhoods, error };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ handleUserSignUp, fetchNeighborhoods }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);