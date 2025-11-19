import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState={
    cartsData:'',
}

export const addProductToCart=createAsyncThunk("/cart/addproduct",async (productId)=>{
    try{
        const response=axiosInstance.post(`/user/cart/add/${productId}`)
        toast.promise(response,{
            loading:"adding the product to cart",
            error:(err)=>err.response.data.message,
            success:'successfully added the product to cart'
        });
        const apiresponse=await response;
        return apiresponse;

    }catch(error){
        console.log(error);
        toast.error("something went wrong")
    }
    
});

export const removeProductFromCart=createAsyncThunk("/cart/removeproduct",async (productId)=>{
    try{
        const response=axiosInstance.post(`/user/cart/remove/${productId}`);
        toast.promise(response,{
            loading:"removing the product from cart",
            error:'product is not removed from cart',
            success:'successfully remove the product from cart'
        });
        const apiresponse=await response;
        return apiresponse;

    }catch(error){
        console.log(error);
        toast.error("something went wrong");
    }
    
});

export const getCartDetails=createAsyncThunk("/cart/getDetails",async ()=>{
    try{
        const response=axiosInstance.get(`/user/cart`);
        toast.promise(response,{
            loading:"fetching the user cart",
            error:'not able to fetch the user cart details',
            success:'successfully fetched the user cart'
        });
        const apiresponse=await response;
        return apiresponse;

    }catch(error){
        console.log(error.response);
        if(error?.response?.status===401){
            toast.error("please login to view cart");
            return {
                isUnauthorized:true,
            }
        }
        
        toast.error("something went wrong");
    }
    
});


const cartslice=createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(buider)=>{
        buider
        .addCase(addProductToCart.fulfilled,(state,action)=>{
            state.cartsData=action?.payload?.data?.data;
        })

        .addCase(removeProductFromCart.fulfilled,(state,action)=>{
            state.cartsData=action?.payload?.data?.data;
        })

    }
})
export default cartslice.reducer