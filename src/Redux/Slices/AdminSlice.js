import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";


const initialState={
    AddedProducts:[],
}

export const AddProducts=createAsyncThunk("/add/products",async (data)=>{
   try{
    console.log("incoming data",data);
    const response=axiosInstance.post('/create/product',data);
    toast.promise(response,{
        loading:"Adding the product",
        error:'something went wrong',
        success:'successfully added the product'
    });
    const apiResponse=await response;
    return apiResponse;
   }catch(error){
    console.log(error);
    toast.error("Product not added");
   }
})

const AddproductSlice=createSlice({
    name:'Addproduct',
    initialState,
    reducers:{},
    // extraReducers:(builder)=>{
    //     builder.addCase(AddProducts.fulfilled,(state,action)=>{
    //         console.log(action.payload);
    //         state.AddedProducts=action?.payload?.data?.data;

    //     })
    // }

});

export default AddproductSlice.reducer;