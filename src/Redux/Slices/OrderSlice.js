import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  orderData: null,      // customer order details
  assignedOrders: [],   // list of orders assigned to the rider
  loading: false,
  error: null,
};

// ✅ 1️⃣ Place Order (customer)
export const PlaceOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderDetails, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/user/order`, orderDetails);
      toast.success("Order placed successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to place order");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ 2️⃣ Fetch Assigned Orders for Rider (only "ORDERED")
export const FetchAssignedOrders = createAsyncThunk(
  "order/fetchAssignedOrders",
  async (riderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("user/rider/assigned");
      return response.data.data; // backend sends { success, data: [orders] }
    } catch (error) {
      toast.error("Failed to fetch assigned orders");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ 3️⃣ Update Order Status to OUT_FOR_DELIVERY
export const UpdateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/order/${orderId}/status`, { status });
      toast.success(`Order marked as ${status}`);
      return response.data.data; // updated order
    } catch (error) {
      toast.error("Failed to update order status");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Place Order
      .addCase(PlaceOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PlaceOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.data;
      })
      .addCase(PlaceOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Assigned Orders
      .addCase(FetchAssignedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchAssignedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedOrders = action.payload;
      })
      .addCase(FetchAssignedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Order Status
      .addCase(UpdateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        // update the order in assignedOrders list
        const updatedOrder = action.payload;
        state.assignedOrders = state.assignedOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(UpdateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default OrderSlice.reducer;
