import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchParks, updateParkFilter, fetchCurrentUser } from '../../store/actions/index';

import { Container, Segment, Divider } from 'semantic-ui-react';
import PageHeading from '../../components/PageHeading/PageHeading';
import MapComponent from '../../components/Map/Map';
import Spinner from '../../components/UI/Spinner/Spinner';

import ParkFilterForm from '../../components/ParkFilterForm/ParkFilterForm';
import Parks from '../../components/Parks/Parks';

import classes from './ParksIndex.css';

class ParksIndex extends Component {
 
  componentWillMount = () => {
    this.props.fetchCurrentUser();
    this.props.fetchParks();
  }

  handleMarkerClick = parkName => this.props.updateParkFilter('searchQuery', parkName);

  render() {

    let parks = <Spinner />;

    if (!this.props.loading){
      parks = <Segment className={classes.ParksContent}>
                <ParkFilterForm onSearchQueryUpdate={this.props.updateParkFilter} />
                <Divider />
                <Parks
                  parks={this.props.parks}
                  currentFilter={this.props.parkFilter}
                />
              </Segment>;
    }; 

    return (
      <Container className={classes.Container}>
        <PageHeading
          as="h1"
          textAlignment="center"
          iconName="tree"
          iconColor="green"
          type='icon'
          headingText="Search Parks Near You"
          subheadingText="Find the perfect park for you furry friend." />
        <MapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          content={this.props.parks}
          markerClicked={this.handleMarkerClick}
          filterParams={this.props.parkFilter}
        />
        {parks}
      </Container>
    );
  };
};

const mapStateToProps = state => {
  const { parks, loading, parkFilter } = state.park;
  return {
      parks,
      loading,
      parkFilter
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ fetchParks, updateParkFilter, fetchCurrentUser }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ParksIndex);