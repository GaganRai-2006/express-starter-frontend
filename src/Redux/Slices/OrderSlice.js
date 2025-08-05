import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState={
    ordersdata:null
}
export const PlaceOrder=createAsyncThunk("/cart/addproduct",async ()=>{
    try{
        const response=axiosInstance.get(`/user/All/orders`);
        toast.promise(response,{
            loading:"Placing the order",
            error:'product is not placed',
            success:'successfully placed the order'
        });
        const apiresponse=await response;
        return apiresponse;

    }catch(error){
        console.log(error);
        toast.error("something went wrong");
    }
    
});

const OrderSlice=createSlice({
    name:'order',
    initialState,
    reducers:{},
    extraReducers:(buider)=>{
        // buider.addCase((PlaceOrder.fulfilled,(state,action)=>{
        //     state.ordersdata=action?.payload?.data?.data;

        // }))

    }
})

export default OrderSlice.reducer;