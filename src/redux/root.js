import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import profileReducer from './profile/reducer';
import profileSaga from './profile/saga';

export const rootReducer = combineReducers({
    profile: profileReducer,
});

export function* rootSaga() {
    yield all([
        profileSaga(),
    ]);
}