import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDogAttribute, addEditDog } from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import { mapDropdownItems } from '../../shared/utility';

import classes from './DogForm.css';
import { Form } from 'semantic-ui-react';

import Header from '../UI/Header/Header';
import Input from '../UI/FormElements/Input/Input';
import Dropdown from '../UI/FormElements/Dropdown/Dropdown';
import Button from '../UI/Buttons/Button/Button';

class DogForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                name: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false
                },
                description: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false
                },
                age_id: {
                    value: '',
                    validation: {
                        requiredDropdown: true,
                    },
                    valid: false,
                    touched: false
                },
                sex: {
                    value: '',
                    validation: {
                        requiredDropdown: true,
                    },
                    valid: false,
                    touched: false
                },
                breed_id: {
                    value: '',
                    validation: {
                        requiredDropdown: true,
                    },
                    valid: false,
                    touched: false
                }, 
                size_id: {
                    value: '',
                    validation: {
                        requiredDropdown: true,
                    },
                    valid: false,
                    touched: false
                },
                profile_image_url: {
                    value: '',
                    validation: {
                        requiredURL: true,
                    },
                    valid: false,
                    touched: false
                }
            },
            dogId: this.props.dogId,
            userId: this.props.currentUser.id
        };
    };

    componentWillMount = () => {
        if (this.props.attributes.breeds.length === 0) {
            this.props.fetchDogAttribute("ages")
            this.props.fetchDogAttribute("breeds")
            this.props.fetchDogAttribute("sizes")
        };

        if (this.props.type === 'editDog'){
            this.setState({
                formData:{
                    ...this.state.formData,
                    name: {
                        ...this.state.formData.name,
                        value: this.props.dog.name,
                        touched: true,
                        valid: true
                    },
                    description: {
                        ...this.state.formData.description,
                        value: this.props.dog.description,
                        touched: true,
                        valid: true
                    },
                    age_id: {
                        ...this.state.formData.age_id,
                        value: this.props.dog.age.id,
                        touched: true,
                        valid: true
                    },
                    sex: {
                        ...this.state.formData.sex,
                        value: this.props.dog.sex,
                        touched: true,
                        valid: true
                    },
                    breed_id: {
                        ...this.state.formData.breed_id,
                        value: this.props.dog.breed.id,
                        touched: true,
                        valid: true
                    },
                    size_id: {
                        ...this.state.formData.size_id,
                        value: this.props.dog.size.id,
                        touched: true,
                        valid: true
                    },
                    profile_image_url: {
                        ...this.state.formData.profile_image_url,
                        value: this.props.dog.profile_image_url,
                        touched: true,
                        valid: true
                    }
                }
            });
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
    }

    handleFormSubmission() {
        const { name, 
                profile_image_url, 
                description, 
                sex, 
                size_id, 
                age_id, 
                breed_id } = this.state.formData;

        const dogInfo = {
            name: name.value,
            description: description.value,
            profile_image_url: profile_image_url.value,
            sex: sex.value,
            size_id: size_id.value,
            age_id: age_id.value,
            breed_id: breed_id.value,
            id: this.state.dogId,
            user_id: this.state.userId
        };

        const formType = this.props.type;

        this.props.addEditDog(dogInfo, formType);
        this.props.toggleModal('dogForm');
    }

    render() {

        const sexesDropdownItems = [
            { value: 'Male', text: 'Male' },
            { value: 'Female', text: 'Female' } 
        ];
                                
        const submitDisabled = Object.values(this.state.formData).some(inputField => !inputField.valid);

        return (
            <Form className={classes.DogForm} onSubmit={() => this.handleFormSubmission()}>
                <Header as='h1' content={this.props.headerTitle} />
                <Input
                    control='input'
                    id="name"
                    type="text"
                    label='Name:'
                    onChange={this.handleFormInputChange}
                    value={this.state.formData.name.value}
                    placeholder='Enter your dogs name...' />
                <Input
                    control='input'
                    id="profile_image_url"
                    type="text"
                    label='Image URL:'
                    onChange={this.handleFormInputChange}
                    value={this.state.formData.profile_image_url.value}
                    placeholder='Please enter an image url...' />
                <Input
                    control='textArea'
                    onChange={this.handleFormInputChange}
                    label='About your dog:'
                    type='text'
                    id="description"
                    placeholder='Write a description about your dog...'
                    value={this.state.formData.description.value} />
                <Dropdown
                    placeholder='Sex'
                    label="Sex:"
                    onChange={this.handleFormInputChange}
                    fluid
                    search
                    className={classes.InputDropdowns}
                    selection
                    options={sexesDropdownItems}
                    defaultValue={this.state.formData.sex.value}
                    id='sex'
                />
                <Dropdown
                    placeholder='Breed'
                    label="Breed:"
                    onChange={this.handleFormInputChange}
                    fluid
                    search
                    className={classes.InputDropdowns}
                    selection
                    options={mapDropdownItems(this.props.attributes.breeds)}
                    defaultValue={this.state.formData.breed_id.value}
                    id='breed_id'
                />
                <Dropdown
                    placeholder='Age'
                    label="Age:"
                    fluid
                    className={classes.InputDropdowns}
                    selection
                    options={mapDropdownItems(this.props.attributes.ages)}
                    onChange={this.handleFormInputChange}
                    defaultValue={this.state.formData.age_id.value}
                    id="age_id"
                />
                <Dropdown
                    placeholder='Size'
                    label="Size:"
                    fluid
                    className={classes.InputDropdowns}
                    selection
                    options={mapDropdownItems(this.props.attributes.sizes)}
                    onChange={this.handleFormInputChange}
                    defaultValue={this.state.formData.size_id.value}
                    id="size_id"
                />
                <Button
                    type="submit"
                    fluid
                    size='large'
                    color='blue'
                    disabled={submitDisabled}
                    content="Submit"
                />
            </Form>
        );
    };
};

const mapStateToProps = state => {
    const { currentFilter, attributes } = state.dog;
    const { currentUser } = state.auth;
    return {
        currentFilter,
        attributes,
        currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchDogAttribute, addEditDog }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(DogForm);