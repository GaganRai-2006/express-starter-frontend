import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { riderLogin, updateRiderLocation } from "../../Redux/Slices/RiderSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RiderLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    plusCode: "", // manually entered
  });
  const { loading } = useSelector((state) => state.rider);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password || !loginData.plusCode) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await dispatch(
        riderLogin({
          email: loginData.email,
          password: loginData.password,
        })
      );
      console.log(res);

      if (res?.payload?.data?.rider?.id) {
        // Update location with manual Plus Code
        await dispatch(
          updateRiderLocation({
            riderId: res.payload.data?.rider?.id,
            plusCode: loginData.plusCode,
          })
        );

        toast.success("Login successful!");
        navigate("/rider/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error("Something went wrong during login");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Rider Login
        </h2>

        {/* Email Field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3 focus:ring-2 focus:ring-yellow-400 outline-none"
          value={loginData.email}
          onChange={handleInputChange}
          required
        />

        {/* Password Field */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-3 focus:ring-2 focus:ring-yellow-400 outline-none"
          value={loginData.password}
          onChange={handleInputChange}
          required
        />

        {/* Plus Code Field */}
        <input
          type="text"
          name="plusCode"
          placeholder="Enter your Plus Code (e.g., 7J4V+P3 New Delhi)"
          className="border p-2 rounded w-full mb-4 focus:ring-2 focus:ring-yellow-400 outline-none"
          value={loginData.plusCode}
          onChange={handleInputChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded w-full transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default RiderLogin;
