import * as actionTypes from './actionTypes';
import axios from '../../shared/axios-api';

// PARK SHARED ACTIONS

export const parkActionFail = error => ({
    type: actionTypes.PARK_ACTION_FAIL,
    error
});

export const parkActionStart = () => ({
    type: actionTypes.PARK_ACTION_START
});

// PARK INDEX ACTIONS

export const fetchParksSuccess = parks => ({
    type: actionTypes.FETCH_PARKS_SUCCESS,
    parks
});

export const fetchParks = () => {
    return dispatch => {
        dispatch(parkActionStart());
        axios.get('/parks')
            .then(res => {
                const fetchedParks = [...res.data];
                dispatch(fetchParksSuccess(fetchedParks));
            })
            .catch(err => {
                dispatch(parkActionFail(err));
            });
    };
};

// PARK FILTER ACTIONS

export const updateParkFilter = (type, value) => ({
    type: actionTypes.UPDATE_PARK_FILTER,
    payload: { type, value }
});

export const resetParkFilter = () => ({
    type: actionTypes.RESET_PARK_FILTER
});