import {apiSlice} from '../apiSlice';
import {categoriesEndpoint} from "./endpoints/getCategories";
import {addNewCategoryEndpoint} from "./endpoints/addNewCategory";
import {editCategoryEndpoint} from "./endpoints/editCategory";
import {deleteCategoryEndpoint} from "./endpoints/deleteCategory";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {categoryByIdEndpoint} from "./endpoints/getCategory";

const categoriesApi = apiSlice.injectEndpoints({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000"}),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: categoriesEndpoint(builder),
        getCategoryById: categoryByIdEndpoint(builder),
        addNewCategory: addNewCategoryEndpoint(builder),
        editCategory: editCategoryEndpoint(builder),
        deleteCategory: deleteCategoryEndpoint(builder),
    }),
})

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddNewCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;


export const selectCategoriesResult = categoriesApi.endpoints.getCategories.select()