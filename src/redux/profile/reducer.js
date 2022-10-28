import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    profileData: null,
    isLoginRequest: false,
    isLoginSuccess: false,
    isLoginFailure: false,
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
            state.isLoginRequest = false;
            state.isLoginSuccess = true;
            state.profileData = payload.profileData;
        }),
        loginFailure: ((state, {payload}) => {
            state.isLoginRequest = false;
            state.isLoginFailure = true;
            state.errorMessage = payload.message;
        })
    }
});

export const {loginRequest, loginSuccess, loginFailure} = counterSlice.actions;

export default counterSlice.reducer;