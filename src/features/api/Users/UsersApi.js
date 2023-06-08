import {apiSlice} from '../apiSlice'
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {userLoginEndpoint} from './endpoints/UserLogin';
import {getCsrfTokenEndpoint} from './endpoints/getCsrfToken';
import {getAuthUser} from './endpoints/getAuthUser';
import {userLogoutEndpoint} from './endpoints/UserLogout';
import {userRegisterEndpoint} from './endpoints/UserRegister';

const usersApi = apiSlice.injectEndpoints({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000"}),

    tagTypes: ['users'],
    endpoints: (builder) => ({
        userLogin: userLoginEndpoint(builder),
        userLogout: userLogoutEndpoint(builder),
        userRegister: userRegisterEndpoint(builder),
        getAuthUser: getAuthUser(builder),
        getCsrfToken: getCsrfTokenEndpoint(builder),
    }),
})

export const {
    useUserLoginQuery,
} = usersApi;

export const {
    useLazyUserLoginQuery,
    useLazyGetCsrfTokenQuery,
    useLazyGetAuthUserQuery,
    useLazyUserLogoutQuery,
    useLazyUserRegisterQuery
} = usersApi;