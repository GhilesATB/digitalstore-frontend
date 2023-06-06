import {createSlice} from "@reduxjs/toolkit";

export const UsersSlice = createSlice({
    name: "users",
    initialState: {
        Auth: {"credentials":{"email" : "","password" : ""}},
        isAuth: false,
        token:"",
    },
    loading: false,
    reducers: {},
});

export const setCredentials = (isAuth, token) =>{
    return {...UsersSlice.initialState, isAuth:isAuth, token: token}
};

export default UsersSlice.reducer;