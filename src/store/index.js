import {configureStore} from "@reduxjs/toolkit";
import categoriesReducer from '../store/reduces/categories';
import {apiSlice} from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});