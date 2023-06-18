import {createSlice} from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        request:{},
    },
    loading: false,
    reducers: {
            setGlobalQuery:(state,action)=>{
                state.request = action.payload

                console.log('here we are');
            },
            resetGlobalQuery:(state,action)=>{
                state.global.success = true;
                state.global.msg = action.payload 
            }
    },
});

export const {setGlobalQuery,resetGlobalQuery} = categoriesSlice.actions;
export default categoriesSlice.reducer;