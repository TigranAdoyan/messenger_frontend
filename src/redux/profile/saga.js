import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from '../../http/axios';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    getAuthDataRequest,
    getAuthDataSuccess,
    getAuthDataFailure
} from './reducer';

function* login(action) {
    try {
        const response = yield call(() => {
            return Axios.post('/user/login', action.payload);
        });

        localStorage.setItem('token', response.data.token);

        yield put(loginSuccess({
            profileData: response.data,
        }));
    } catch (err) {
        yield put(loginFailure({
            message: err.response.data.message
        }));
    }
}

function* getAuthData() {
    try {
        const response = yield call(() => {
            return Axios.get('/user/auth_data');
        });

        yield put(getAuthDataSuccess({
            profileData: response.data,
        }));
    } catch (err) {
        yield put(getAuthDataFailure({
            message: err.response.data.message
        }));
    }
}

export default function* mySaga() {
    yield takeLatest(loginRequest.type, login);
    yield takeLatest(getAuthDataRequest.type, getAuthData);
}