import {configureStore} from "@reduxjs/toolkit";
import categoriesReducer from '../store/reduces/categories';
import usersReducer from '../store/reduces/Users';
import {apiSlice} from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        users: usersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
        //serializableCheck: false,
});