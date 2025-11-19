import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import productSliceReducer from "./Slices/ProductSlice";
import addproductSliceReducer from "./Slices/AdminSlice" ;
import cartSlicereducer from "./Slices/CartSlice";
import OrderSliceReducer from "./Slices/OrderSlice";
import RiderSliceReducer from "./Slices/RiderSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSliceReducer,
        product:productSliceReducer,
        Addproduct:addproductSliceReducer,
        cart:cartSlicereducer,
        order:OrderSliceReducer,
        rider: RiderSliceReducer
    },
    devTools:true,
});