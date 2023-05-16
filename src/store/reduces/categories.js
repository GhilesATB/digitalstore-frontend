import {createSlice} from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
    },
    loading: false,
    reducers: {},
});

export default categoriesSlice.reducer;