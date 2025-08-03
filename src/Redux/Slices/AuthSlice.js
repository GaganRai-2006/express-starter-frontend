import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
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
});

export const login=createAsyncThunk("/auth/login",async(data)=>{
    console.log("incoming data",data);
    try{
        const response= axiosInstance.post("/auth/login",data);
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
});

export const logout=createAsyncThunk("/auth/logout",async()=>{
    console.log("incoming data");
    try{
        const response= axiosInstance.post("/auth/logout");
        toast.promise(response,{
            success:(resolvedPromise)=>{
                return resolvedPromise?.data?.message;

            },
            loading:'we are logging out',
            error:'oh! no something went wrong, please try again.'
        });
        const apiResponse=await response;
        return apiResponse;

    }catch(err){
        console.log(err);
    }
});


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.data?.Role;
            state.data = action?.payload?.data?.data?.userData;

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('role', action?.payload?.data?.data?.Role);
            localStorage.setItem('data', JSON.stringify(action?.payload?.data?.data?.userData));

        })

        .addCase(logout.fulfilled,(state)=>{
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('role', '');
            localStorage.setItem('data', JSON.stringify({}));

            state.isLoggedIn = false;
            state.role = '';
            state.data = {};
        })
    }
});

export default AuthSlice.reducer;