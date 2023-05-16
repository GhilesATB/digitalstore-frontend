import { apiSlice } from '../apiSlice';
import {categoriesEndpoint} from "./endpoints/getCategories";
import {addNewCategoryEndpoint} from "./endpoints/addNewCategory";
import {editCategoryEndpoint} from "./endpoints/editCategory";
import {deleteCategoryEndpoint} from "./endpoints/deleteCategory";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const categoriesApi = apiSlice.injectEndpoints({
    tagTypes: ["categories"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),

    endpoints: (builder) => ({
        getCategories: categoriesEndpoint(builder),
        addNewCategory: addNewCategoryEndpoint(builder),
        editCategory: editCategoryEndpoint(builder),
        deleteCategory: deleteCategoryEndpoint(builder),
    }),
})

export const {
    useGetCategoriesQuery,
    useAddNewCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = apiSlice;

