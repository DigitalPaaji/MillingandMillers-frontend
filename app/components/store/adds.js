
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {base_url} from "../urls"
import axios from "axios"



export const getAdds = createAsyncThunk("adds",async()=>{
    const response = await axios.get(`${base_url}/adds/get`);
    const data = await response.data;
    return data

})
const addSlice = createSlice({
    name:"adds",
    initialState:{
        info:null,
        isLoading:false,
        isError:false
    },
    extraReducers:(builder)=>{
        builder.addCase(getAdds.pending,(state)=>{
            state.info=null
            state.isError=false;
         state.isLoading=true;
        }),
        builder.addCase(getAdds.fulfilled,(state,action)=>{
state.info= action.payload;
state.isLoading= false;
state.isError = false;
        });
        builder.addCase(getAdds.rejected,(state)=>{
            state.info=null
            state.isError=true;
         state.isLoading=false;
        })
    
}




})


export default  addSlice.reducer;