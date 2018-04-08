import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { parkFilter } from '../../shared/filters'

// import classes from './Map.css'

const mapComponent = withScriptjs(withGoogleMap(props => {

    const parks = parkFilter(props.content, props.filterParams);
    
    const contentMarkerList = parks.map((park, i) => (
            <Marker
                position={{lat: parseFloat(park.loc_latitude), lng: parseFloat(park.loc_longitude)}}
                key={i}
                clickable
                onClick={() => props.markerClicked(park.name)}
            />
    ));

    return (
        <div>
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: 45.523062, lng: -122.676482 }}
                googleMapURL={props.googleMapURL}
            >
                {contentMarkerList}
            </GoogleMap>
        </div>
        )}
    )
);

export default mapComponent;




