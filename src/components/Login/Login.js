import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleUserLogin } from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

import { Form, Image } from 'semantic-ui-react';

import FormErrors from '../FormErrors/FormErrors';
import Header from '../UI/Header/Header';
import Input from '../UI/FormElements/Input/Input';
import Button from '../UI/Buttons/Button/Button';
import Icon from '../../assets/images/paw-print.png';

import classes from './Login.css';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
        formData: {
            username: {
                value: '',
                validation: {
                    required: true,
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
                }
            }
        };
    };

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

    handleFormSubmit = () => {
        const username = this.state.formData.username.value;
        const password = this.state.formData.password.value;

        this.props.handleUserLogin({username, password});
    };

    render() {

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <FormErrors error={this.props.error} />
        };

        let submitDisabled = Object.values(this.state.formData).some(inputField => !inputField.valid );

        return (
                <Form size='large' className={classes.Form} onSubmit={this.handleFormSubmit}>
                    <Image
                        centered
                        src={Icon}
                        className={classes.HeaderIcon}
                    />
                    <Header
                        as='h2'
                        className={classes.SignUpHeading}
                        textAlign='center'
                        content="Log In To Your Account" />
                    {errorMessage}
                    <Input
                        fluid
                        icon='user'
                        iconPosition='left'
                        control='input'
                        placeholder='Username'
                        id='username'
                        type="text"
                        value={this.state.formData.username.value}
                        onChange={this.handleFormInputChange}
                    />
                    <Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        control="input"
                        id='password'
                        type='password'
                        value={this.state.formData.password.value}
                        onChange={this.handleFormInputChange}
                    />
                    <Button 
                        disabled={submitDisabled} 
                        className={classes.LoginButton} 
                        fluid 
                        size='large'
                        content="Log In" 
                        color="blue"
                    />
                </Form>
            );
        };
};

const mapStateToProps = (state) => {
    const { error } = state.auth;
    return { error };
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({ handleUserLogin }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);