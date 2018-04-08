import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchDogs } from '../../store/actions/index';

import PageHeading from '../../components/PageHeading/PageHeading';
import Dogs from '../../components/Dogs/Dogs';
import DogForm from '../../components/DogsFilterForm/DogsFilterForm'

import { Container, Segment, Divider } from 'semantic-ui-react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Header from '../../components/UI/Header/Header';

import classes from './DogsIndex.css';

class DogsIndex extends Component {

    componentDidMount = () => this.props.fetchDogs();

    render() {

        let dogs = <Spinner />;
        if (!this.props.loading) {
            dogs = <Segment>
                        <Header
                            as='h3'
                            textAlign='center'
                            content='Use the menu to search for the perfect furry friend!'
                        />
                        <DogForm />
                        <Divider />
                        <Dogs 
                            dogs={this.props.dogs} 
                            currentFilter={this.props.currentFilter} 
                            loading={this.props.loading} 
                        />
                    </Segment>
        };


        return (
            <Container className={classes.Container}>
                <PageHeading
                    as="h1"
                    textAlignment="center"
                    iconName="search"
                    iconColor="blue"
                    type="icon"
                    headingText="Search For Dogs"
                    subheadingText="Find the perfect playtime pal for you best friend." />
                {dogs}
            </Container>
        );
    };
};

const mapStateToProps = state => {
    const { dogs, loading, selectedDog, currentFilter } = state.dog
    return {
        dogs,
        loading,
        selectedDog,
        currentFilter
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchDogs }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DogsIndex);