import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    parks: [],
    loading: false,
    parkFilter: {
        searchQuery: '',
        fencedPark: true,
        unfencedPark: true
    }
};

const parkActionStart = state => updateObject(state, { loading: true });

const parkActionFail = (state, action) => updateObject(state, { loading: true, error: action.error });

const fetchParksSuccess = (state, action) => (
    updateObject(state, {
        parks: action.parks,
        loading: false,
    })
);

const updateParkFilter = (state, action) => (
    updateObject(state, {
        parkFilter: {
            ...state.parkFilter,
            [action.payload.type]: action.payload.value
        }
    })
);

const resetParkFilter = state => (
    updateObject(state, {
        parkFilter: {
            ...state.parkFilter,
            searchQuery: ''
        }
    })
);

const parkReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PARK_ACTION_START: return parkActionStart(state);
        case actionTypes.PARK_ACTION_FAIL: return parkActionFail(state, action);
        case actionTypes.FETCH_PARKS_SUCCESS: return fetchParksSuccess(state, action);
        case actionTypes.UPDATE_PARK_FILTER: return updateParkFilter(state, action);
        case actionTypes.RESET_PARK_FILTER: return resetParkFilter(state);
        default: return state
    }
};

export default parkReducer;