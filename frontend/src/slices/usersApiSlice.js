import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

// allow us to do is create our own endpoints in this file and,
// it'll inject the, into endpoints: (builder) => ({}) here.
export const userApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
        }),
        updateUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = userApiSlice;
