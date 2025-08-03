import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import productSliceReducer from "./Slices/ProductSlice";
import addproductSliceReducer from "./Slices/AdminSlice" ;
import cartSlicereducer from "./Slices/CartSlice"

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        product:productSliceReducer,
        Addproduct:addproductSliceReducer,
        cart:cartSlicereducer
    },
    devTools:true,
});