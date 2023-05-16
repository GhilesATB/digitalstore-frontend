import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const categoriesEndpoint = (builder) => {
    return builder.query({
        query: () => "api/categories",
        providesTags: ["categories"],
    });
};