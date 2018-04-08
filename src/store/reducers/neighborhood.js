import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    neighborhoods: [],
    loading: false
};

const neighborhoodActionStart = state => (updateObject(state, { loading: true }));

const neighborhoodActionFail = (state, action) => (updateObject(state, { loading: false, error: action.error}));

const fetchNeighborhoodsSuccess = (state, action) => (
    updateObject(state, {
        neighborhoods: action.neighborhoods,
        loading: false,
    })
);

const neighborhoodReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NEIGHBORHOOD_ACTION_START: return neighborhoodActionStart(state);
        case actionTypes.NEIGHBORHOOD_ACTION_FAIL: return neighborhoodActionFail(state, action);
        case actionTypes.FETCH_NEIGHBORHOODS_SUCCESS: return fetchNeighborhoodsSuccess(state, action);
        default: return state
    }
};

export default neighborhoodReducer;