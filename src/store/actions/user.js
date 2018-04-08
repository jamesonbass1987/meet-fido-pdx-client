import * as actionTypes from './actionTypes';
import axios from '../../shared/axios-api';

// USER SHARED ACTIONS

export const userActionStart = () => ({
    type: actionTypes.USER_ACTION_START
});

export const userActionFail = error => ({
    type: actionTypes.USER_ACTION_FAIL,
    error
});

// USER INDEX ACTIONS

export const fetchUsers = () => {
    return dispatch => {
        dispatch(userActionStart());
        axios.get('/users')
            .then(res => {
                const fetchedUsers = [...res.data];
                dispatch(fetchUsersSuccess(fetchedUsers));
            })
            .catch(err => {
                dispatch(userActionFail(err));
            });
    };
};

export const fetchUsersSuccess = users => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    users
});

// USER SHOW ACTIONS

export const fetchUser = id => {
    return dispatch => {
        dispatch(userActionStart());
        axios.get(`/users/${id}`)
            .then(res => {
                dispatch(fetchUserSuccess(res.data));
            })
            .catch(err => {
                dispatch(userActionFail(err));
            });
    };
};

export const fetchUserSuccess = user => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    user
});


// USER FILTER FUNCTIONS

export const updateUserFilter = (type, value) => ({
    type: actionTypes.UPDATE_USER_FILTER,
    payload: { type, value }
});

export const resetUserFilter = (type, value) => ({
    type: actionTypes.RESET_USER_FILTER
});

export const removeSelectedUser = () => ({
    type: actionTypes.REMOVE_SELECTED_USER
});

