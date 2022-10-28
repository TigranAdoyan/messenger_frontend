import { call, put, takeLatest } from 'redux-saga/effects'
import Axios from '../../http/axios';
import { loginRequest, loginSuccess, loginFailure } from './reducer';

function* login(action) {
    try {
        debugger;

        const response = yield call(() => {
            return Axios.post('/users/login', action.payload);
        });

        debugger;

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

export default function* mySaga() {
    yield takeLatest(loginRequest.type, login);
}