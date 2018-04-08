import { combineReducers } from 'redux';
import dogReducer from './dog';
import parkReducer from './park';
import authReducer from './auth';
import userReducer from './user';
import neighborhoodReducer from './neighborhood';

export const rootReducer = combineReducers({
    park: parkReducer,
    dog: dogReducer,
    auth: authReducer,
    user: userReducer,
    neighborhood: neighborhoodReducer
});

