import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  riders: [],
  nearestRider: null,
  riderData: null,       // current logged-in rider
  loading: false,
  isLoggedIn: localStorage.getItem("riderToken") ? true : false, // auto-persist login
};

// 🚀 Rider Login
export const riderLogin = createAsyncThunk(
  "rider/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/rider/auth/login", loginData);

      const token = response.data?.token;
      if (token) {
        localStorage.setItem("riderToken", token);
        toast.success("Rider login successful");
      }

      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🚀 Fetch all available riders
export const fetchAvailableRiders = createAsyncThunk(
  "rider/fetchAvailableRiders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/rider/available");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch riders");
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🚀 Find nearest rider
export const findNearestRider = createAsyncThunk(
  "rider/findNearestRider",
  async (plusCode, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/riders/nearest", { plusCode });
      toast.success("Nearest rider found");
      return response.data;
    } catch (error) {
      toast.error("Could not find nearest rider");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateRiderLocation = createAsyncThunk(
  "rider/updateLocation",
  async ({ riderId, plusCode }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`api/riders/update-location/${riderId}`, {
        plusCode,
      });
      toast.success("Rider location updated");
      return response.data;
    } catch (error) {
      toast.error("Failed to update location");
      return rejectWithValue(error.response?.data);
    }
  }
);

const RiderSlice = createSlice({
  name: "rider",
  initialState,
  reducers: {
    // ✅ Logout functionality
    logoutRider: (state) => {
      localStorage.removeItem("riderToken");
      state.isLoggedIn = false;
      state.riderData = null;
      toast.success("Rider logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 Rider Login
      .addCase(riderLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(riderLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.riderData = action.payload?.data || null;
        state.isLoggedIn = true;
      })
      .addCase(riderLogin.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      })

      // 🟡 Fetch Riders
      .addCase(fetchAvailableRiders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableRiders.fulfilled, (state, action) => {
        state.loading = false;
        state.riders = action.payload;
      })
      .addCase(fetchAvailableRiders.rejected, (state) => {
        state.loading = false;
      })

      // 🟡 Find Nearest Rider
      .addCase(findNearestRider.fulfilled, (state, action) => {
        state.nearestRider = action.payload;
      })

      .addCase(updateRiderLocation.fulfilled, (state, action) => {
        if (state.riderData)
          state.riderData.plusCode = action.payload.plusCode;
      });
      
  },
});

export const { logoutRider } = RiderSlice.actions;
export default RiderSlice.reducer;
