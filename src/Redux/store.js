import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import productSliceReducer from "./Slices/ProductSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        product:productSliceReducer
    },
    devTools:true,
});