import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../shared/axios-api';


// DOG SHARED ACTIONS

export const dogActionStart = () => ({ type: actionTypes.DOG_ACTION_START });
export const dogActionFail = (error) => ({ type: actionTypes.DOG_ACTION_FAIL, error });

// DOG INDEX ACTIONS

export const fetchDogs = () => {
    return dispatch => {
        dispatch(dogActionStart());
        axios.get('/dogs')
            .then(res => {
                const fetchedDogs = [...res.data];
                dispatch(fetchDogsSuccess(fetchedDogs));
            })
            .catch(err => {
                dispatch(dogActionFail(err));
            });
    };
};

export const fetchDogsSuccess = dogs => ({
    type: actionTypes.FETCH_DOGS_SUCCESS,
    dogs
});

//DOG ATTRIBUTE INDEX ACTIONS

export const fetchDogAttribute = attribute => {
    return dispatch => {
        dispatch(dogActionStart());
        axios.get(`/${attribute}`)
            .then(res => {
                const fetchedAttributeList = res.data.map(obj => (obj));
                dispatch(fetchDogAttributeSuccess(fetchedAttributeList, attribute));
            })
            .catch(err => {
                dispatch(dogActionFail(err));
            });
    };
};

export const fetchDogAttributeSuccess = (attributes, attribute) => ({
    type: actionTypes.FETCH_DOG_ATTRIBUTE_SUCCESS,
    attributes,
    attribute
});

// DOG FILTER ACTIONS

export const updateDogFilter = (type, value) => ({
    type: actionTypes.UPDATE_DOG_FILTER,
    payload: { type, value }
});

export const resetDogFilter = () => ({
    type: actionTypes.RESET_DOG_FILTER
});

// DOG CREATE/EDIT ACTIONS

export const addEditDog = (dog, action) => (
    action === 'createDog' ? createDog(dog) : editDog(dog)
);

const createDog = dog => {
    return dispatch => {
        dispatch(dogActionStart());
        axios.post('/dogs', { dog })
            .then(res => {
                dispatch(addEditDogSuccess())
                dispatch(actions.fetchUser(dog.user_id))
            })
            .catch(err => {
                dispatch(dogActionFail(err))
            });
    };
};

const editDog = dog => {
    return dispatch => {
        dispatch(dogActionStart());
        axios.patch(`/dogs/${dog.id}`, { dog })
            .then(res => {
                dispatch(addEditDogSuccess());
                dispatch(actions.fetchUser(dog.user_id));
            })
            .catch(err => {
                dispatch(dogActionFail(err));
            });
    };
};

export const addEditDogSuccess = () => ({
    type: actionTypes.CREATE_EDIT_DOG_SUCCESS
});

// DOG DELETE ACTIONS

export const deleteDog = (id) => {
    return dispatch => {
        dispatch(dogActionStart());
        axios.delete(`/dogs/${id}`)
            .then(res => {
                dispatch(deleteDogSuccess())
                dispatch(actions.fetchCurrentUser());
            })
            .catch(err => {
                dispatch(dogActionFail(err))
            });
    };
};

export const deleteDogSuccess = () => ({
    type: actionTypes.DELETE_DOG_SUCCESS
});