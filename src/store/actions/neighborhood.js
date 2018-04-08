import * as actionTypes from './actionTypes';
import axios from '../../shared/axios-api';

// NEIGHBORHOOD SHARED ACTIONS

export const neighborhoodActionStart = () => ({
    type: actionTypes.NEIGHBORHOOD_ACTION_START
});

export const neighborhoodActionFail = error => ({
    type: actionTypes.NEIGHBORHOOD_ACTION_FAIL,
    error
});

// NEIGHBORHOOD INDEX ACTIONS

export const fetchNeighborhoodsSuccess = neighborhoods => ({
    type: actionTypes.FETCH_NEIGHBORHOODS_SUCCESS,
    neighborhoods
});

export const fetchNeighborhoods = () => {
    return dispatch => {
        dispatch(neighborhoodActionStart());
        axios.get('/neighborhoods')
            .then(res => {
                const fetchedNeighborhoods = [...res.data];
                dispatch(fetchNeighborhoodsSuccess(fetchedNeighborhoods));
            })
            .catch(err => {
                dispatch(neighborhoodActionFail(err));
            });
    };
};