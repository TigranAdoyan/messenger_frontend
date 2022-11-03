import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    profileData: null,
    isLoginRequest: false,
    isLoginSuccess: false,
    isLoginFailure: false,
    isGetAuthDataRequest: false,
    isGetAuthDataSuccess: false,
    isGetAuthDataFailure: false,
    errorMessage: ''
};

export const counterSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loginRequest: ((state, action) => {
            state.isLoginRequest = true;
            state.errorMessage = '';
        }),
        loginSuccess: ((state, {payload}) => {
            // debugger;
            state.isLoginRequest = false;
            state.isLoginSuccess = true;
            state.profileData = payload.profileData;
        }),
        loginFailure: ((state, {payload}) => {
            // debugger;
            state.isLoginRequest = false;
            state.isLoginFailure = true;
            state.errorMessage = payload.message;
        }),
        getAuthDataRequest: ((state) => {
            state.isGetAuthDataRequest = true;
            state.isGetAuthDataSuccess = false;
            state.isGetAuthDataFailure = false;
            state.errorMessage = '';
        }),
        getAuthDataSuccess: ((state, {payload}) => {
            state.isGetAuthDataRequest = false;
            state.isGetAuthDataSuccess = true;
            state.profileData = payload.profileData;
        }),
        getAuthDataFailure: ((state, {payload}) => {
            state.isGetAuthDataRequest = false;
            state.isGetAuthDataFailure = true;
            state.errorMessage = payload.message;
        }),
    }
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    getAuthDataRequest,
    getAuthDataSuccess,
    getAuthDataFailure
} = counterSlice.actions;

export default counterSlice.reducer;