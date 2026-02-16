
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {base_url} from "../urls"
import axios from "axios"



export const getCategory = createAsyncThunk("category",async()=>{
    const response = await axios.get(`${base_url}/category/get`);
    const data = await response.data;
    return data

})
const categorySlice = createSlice({
    name:"category",
    initialState:{
        info:null,
        isLoading:false,
        isError:false
    },
    extraReducers:(builder)=>{
        builder.addCase(getCategory.pending,(state)=>{
            state.info=null
            state.isError=false;
         state.isLoading=true;
        }),
        builder.addCase(getCategory.fulfilled,(state,action)=>{
state.info= action.payload;
state.isLoading= false;
state.isError = false;
        });
        builder.addCase(getCategory.rejected,(state)=>{
            state.info=null
            state.isError=true;
         state.isLoading=false;
        })
    
}




})


export default  categorySlice.reducer;