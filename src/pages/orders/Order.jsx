import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { PlaceOrder } from "../../Redux/Slices/OrderSlice";
import toast from "react-hot-toast";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartsData } = useSelector((state) => state.cart);

  const [details, setDetails] = useState({
    paymentMethod: "OFFLINE",
    address: "",
  });

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  // Initialize Google Map
  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }

    const initMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // India center
      zoom: 5,
    });
    setMap(initMap);
  }, []);

  // Input handler
  function handleUserInput(e) {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  }

  // Locate Plus Code / Address on Map
  const handleLocate = () => {
    if (!details.address || !map) {
      toast.error("Please enter a valid Plus Code or address");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: details.address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(17);

        if (marker) marker.setMap(null);
        const newMarker = new window.google.maps.Marker({
          map,
          position: location,
        });
        setMarker(newMarker);
        toast.success("Location found successfully!");
      } else {
        toast.error("Could not find location for the entered Plus Code or address.");
      }
    });
  };

  // Place order
  async function handleFormSubmit(e) {
    e.preventDefault();

    if (details.paymentMethod === "" || details.address === "") {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await dispatch(PlaceOrder(details));
    console.log("order response", response);

    if (response?.payload?.success) {
      toast.success("Order placed successfully");
      navigate("/order/success");
    } else {
      toast.error("Cannot place the order");
    }
  }

  return (
    <Layout>
      <section className="text-gray-600 body-font min-h-56">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Thanks for Choosing Us
            </h1>

            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Total Price -
              <span className="font-bold text-red-900">
                ₹{" "}
                {cartsData?.items?.length === 0
                  ? ""
                  : cartsData?.items?.reduce(
                      (acc, item) => acc + item?.quantity * item?.product?.price,
                      0
                    )}
              </span>
            </p>
          </div>

          <form onSubmit={handleFormSubmit}>
            {/* Payment Method */}
            <div className="relative flex-grow w-full mb-4">
              <label
                htmlFor="paymentMethod"
                className="text-2xl leading-7 text-gray-600"
              >
                Payment Method
              </label>
              <select
                name="paymentMethod"
                required
                onChange={handleUserInput}
                value={details.paymentMethod}
                className="p-2 border rounded-md focus:outline-none bg-white text-gray-700 w-full"
              >
                <option value="OFFLINE">Offline</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>

            {/* Address / Plus Code */}
            <div className="relative flex-grow w-full mb-4">
              <label
                htmlFor="address"
                className="leading-7 text-2xl text-gray-600"
              >
                Delivery Address / Plus Code
              </label>
              <textarea
                name="address"
                placeholder="Enter Plus Code or full address"
                onChange={handleUserInput}
                value={details.address}
                className="w-full p-2 border rounded-md focus:outline-none bg-white text-gray-700"
              />
            </div>

            {/* Locate Button */}
            <button
              type="button"
              onClick={handleLocate}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-4"
            >
              Locate on Map
            </button>

            {/* Google Map */}
            <div
              ref={mapRef}
              className="w-full h-80 rounded-md border mb-4"
              style={{ border: "1px solid #ccc" }}
            ></div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg w-full"
            >
              Place Order
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
