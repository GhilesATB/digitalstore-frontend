import {apiSlice} from '../apiSlice'
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { userLoginEndpoint } from './endpoints/UserLogin';
import { getCsrfTokenEndpoint } from './endpoints/getCsrfToken';
import Cookies from 'js-cookie';

const usersApi = apiSlice.injectEndpoints({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000"}),
    
    tagTypes: ['users'],
    endpoints: (builder) => ({
        userLogin: userLoginEndpoint(builder),
        getCsrfToken: getCsrfTokenEndpoint(builder),
    }),
})

export const {
    useUserLoginQuery,
} = usersApi;

export const { useLazyUserLoginQuery, useLazyGetCsrfTokenQuery } = usersApi;