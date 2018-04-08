import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isAuthenticating: false,
    isSigningUp: false,
    loading: false,
    error: null,
    token: null,
    currentUser: null,
};

const authActionStart = state => (
    updateObject(state, { loading: true }) 
);

const authActionFail = (state, action) => (
    updateObject(state, {
        error: action.error,
        loading: false
    })
);

const updateAuthenticatingState = state => (
    updateObject(state, {isAuthenticating: !state.isAuthenticating, error: null})
);

const updateSignUpState = state => (
    updateObject(state, { isSigningUp: !state.isSigningUp, error: null })
);

const authSuccess = (state, action) => (
    updateObject(state, {
        token: action.payload.token,
        currentUser: action.payload.user,
        isAuthenticating: false,
        error: null,
        loading: false
    })
);

const userSignUpSuccess = state => (
    updateObject(state, {
        isSigningUp: false,
        error: null,
        loading: false
    })
);

const authLogout = state => (
    updateObject(state, { token: null })
);

const fetchCurrentUserSuccess = (state, action) => (
    updateObject(state, {
        currentUser: action.payload,
        loading: false
    })
);

const deleteUserSuccess = state => (
    updateObject(state, {
        loading: false,
        currentUser: null,
        token: null
    })
);

const removeCurrentUser = state => (updateObject(state, { currentUser: null }));

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_ACTION_START: return authActionStart(state);
        case actionTypes.AUTH_ACTION_FAIL: return authActionFail(state, action);
        case actionTypes.UPDATE_AUTHENTICATING_STATE: return updateAuthenticatingState(state);
        case actionTypes.UPDATE_SIGN_UP_STATE: return updateSignUpState(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.USER_SIGN_UP_SUCCESS: return userSignUpSuccess(state);
        case actionTypes.REMOVE_CURRENT_USER: return removeCurrentUser(state);
        case actionTypes.DELETE_USER_SUCCESS: return deleteUserSuccess(state);
        case actionTypes.FETCH_CURRENT_USER_SUCCESS: return fetchCurrentUserSuccess(state, action);
        default: return state;
    }
};

export default authReducer;