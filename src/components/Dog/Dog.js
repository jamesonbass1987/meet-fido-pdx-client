import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteDog } from '../../store/actions/index';

import { Card, Icon, Image, Button } from 'semantic-ui-react';
import Modal from '../UI/Modal/Modal';
import DogForm from '../DogForm/DogForm';
import ConfirmableButton from '../UI/Buttons/ConfirmableButton/ConfirmableButton';

import classes from './Dog.css';

class Dog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            showEditBtn: this.props.dog.user_id === this.props.currentUser.id && this.props.isEditable,
            showDelete: false,
            isHidden: false
        };
    };

    toggleModal = () => this.setState({ showModal: !this.state.showModal });

    show = () => this.setState({ showDelete: true });

    handleCancel = () => this.setState({ showDelete: false });

    handleConfirm = () => {
        this.setState({ showDelete: false, isHidden: true });
        this.props.deleteDog(this.props.dog.id);
    };

    render(){

        const ownerInfo = this.props.dog.user ? (
            <Card.Content extra>
                <Link
                    to={`/users/${this.props.dog.user.id}`}
                >
                    <Icon name='user' /> Owner: {this.props.dog.user.username}
                </Link>
            </Card.Content>) :
            null;

        let ownerControls;

        if (this.state.showEditBtn){
            ownerControls = <React.Fragment>
                                <Button onClick={this.toggleModal} color="blue" >Edit</Button>
                                <ConfirmableButton
                                    open={this.state.showDelete}
                                    handleShow={this.show}
                                    cancelButton='Never mind'
                                    confirmButton="Let's do it"
                                    handleCancel={this.handleCancel}
                                    handleConfirm={this.handleConfirm}
                                    color="red"
                                    fluid
                                    message="Delete"
                                />
                            </React.Fragment>;
        };

        let dogModal = <Modal
                            handleClose={this.toggleModal}
                            show={this.state.showModal}
                            header="Edit Profile"
                            size="fullscreen"
                            type="dogForm"  
                        >
                            <DogForm
                                type="editDog"
                                headerTitle="Edit Dog"
                                dog={this.props.dog}
                                dogId={this.props.dog.id}
                                toggleModal={this.toggleModal}
                            />
                        </Modal>;

        let dog = <Card id={this.props.id} className={classes.Dog}>
                    <Image centered src={this.props.dog.profile_image_url} />
                    <Card.Content>
                        <Card.Header>{this.props.dog.name}</Card.Header>
                        <Card.Meta>{this.props.dog.breed.name} | {this.props.dog.age.name} | {this.props.dog.sex} | {this.props.dog.size.name} </Card.Meta>
                        <Card.Description>
                            <p>{this.props.dog.description}</p>
                        </Card.Description>
                    </Card.Content>
                    {ownerInfo}
                    {ownerControls}
                    {dogModal}
                </Card>

        dog = this.state.isHidden ? <div></div> : dog;

        return dog;
    };    
};

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return { currentUser };
};

const mapDispatchToProps = dispatch => ( bindActionCreators({ deleteDog }, dispatch) );

export default connect(mapStateToProps, mapDispatchToProps)(Dog);
