import {createSlice} from "@reduxjs/toolkit";

export const UsersSlice = createSlice({
    name: "users",
    initialState: {
        Auth: {}
    },
    loading: false,
    reducers: {
        setAuth: (state, action) => {
            state.Auth = action.payload;
        }
    },
});

export const {setAuth} = UsersSlice.actions;

export default UsersSlice.reducer;