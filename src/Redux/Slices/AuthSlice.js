import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || 'false',
    role: localStorage.getItem('role') || '',
    data: JSON.parse(localStorage.getItem('data')) || {},
};

export const createAccount=createAsyncThunk("/auth/createAccount",async(data)=>{
    console.log("incoming data",data);
    try{
        const response= axiosInstance.post("/users/create",data);
        toast.promise(response,{
            success:(resolvedPromise)=>{
                return resolvedPromise?.data?.message;

            },
            loading:'Hold back right,we are registering your id',
            error:'oh! no something went wrong, please try again.'
        });
        const apiResponse=await response;
        return apiResponse;

    }catch(err){
        console.log(err);
    }
})


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default AuthSlice.reducer;