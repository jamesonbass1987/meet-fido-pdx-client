import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAuthenticatingState, updateSignUpState } from '../../store/actions/index';

import { Container } from 'semantic-ui-react';

import classes from './Home.css';

import LoginForm from '../../components/Login/Login';
import SignupForm from '../../components/Signup/Signup';
import Modal from '../../components/UI/Modal/Modal';
import MainHeading from '../../components/MainHeading/MainHeading';

import DogParkVideo from '../../assets/videos/dog-park-homepage.mp4';

class Home extends Component {

    render(){

        let headingContent = <MainHeading />; 

        if (this.props.isSigningUp) {

            headingContent = <Modal
                show={this.props.isSigningUp}
                handleClose={this.props.updateSignUpState}
                basic
            >
                <SignupForm />
            </Modal>;
        };

        if (this.props.isAuthenticating){
            headingContent =  <Modal 
                                show={this.props.isAuthenticating}
                                handleClose={this.props.updateAuthenticatingState}
                                basic
                              >   
                                <LoginForm />
                              </Modal>;
        };

        return (
            <Container text className={classes.Heading}>
                <video className={classes.BackgroundVideo} id="background-video" loop autoPlay>
                    <source src={DogParkVideo}
                        type="video/mp4" />
                </video>
                <div className={classes.BackgroundOverlay} />
                {headingContent}
            </Container>
        );
    };
};

const mapStateToProps = state => {
    const { isAuthenticating, isSigningUp } = state.auth;
    return {
        isAuthenticating,
        isSigningUp
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ updateAuthenticatingState, updateSignUpState }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);



