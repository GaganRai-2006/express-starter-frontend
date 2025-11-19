import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchAssignedOrders } from "../../Redux/Slices/OrderSlice";

function Riderdashboard() {
  const dispatch = useDispatch();
  const { riderData } = useSelector((state) => state.rider);
  const mapRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!riderData?.rider?.id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await dispatch(
          FetchAssignedOrders(riderData.rider.id)
        ).unwrap();

        console.log("✅ Assigned orders fetched:", response);

        const orders = response || [];
        if (orders.length === 0) {
          console.warn("⚠️ No assigned orders from backend");
          return;
        }

        const order = orders[0];
        console.log("🗺️ Using order data:", order);

        const rider = {
          lat: Number(order?.assignedRider?.latitude) || 12.9716,
          lng: Number(order?.assignedRider?.longitude) || 77.5946,
        };
        const restaurant = {
          lat:
            Number(order?.items?.[0]?.product?.restaurantLocation?.latitude) ||
            12.9352,
          lng:
            Number(order?.items?.[0]?.product?.restaurantLocation?.longitude) ||
            77.6245,
        };
        const customer = {
          lat: Number(order?.addressLocation?.latitude) || 12.9141,
          lng: Number(order?.addressLocation?.longitude) || 77.6387,
        };

        console.log("🧭 Rider:", rider);
        console.log("🍴 Restaurant:", restaurant);
        console.log("🏠 Customer:", customer);

        const loadMap = () => {
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 13,
            center: rider,
          });

          // Add markers for each location
          new window.google.maps.Marker({
            position: rider,
            map,
            label: "R",
            title: "Rider Location",
          });

          new window.google.maps.Marker({
            position: restaurant,
            map,
            label: "S",
            title: "Restaurant Location",
          });

          new window.google.maps.Marker({
            position: customer,
            map,
            label: "C",
            title: "Customer Location",
          });

          // Draw route: Rider → Restaurant → Customer
          const directionsService = new window.google.maps.DirectionsService();
          const directionsRenderer = new window.google.maps.DirectionsRenderer({
            suppressMarkers: true,
          });
          directionsRenderer.setMap(map);

          directionsService.route(
            {
              origin: rider,
              destination: customer,
              waypoints: [
                {
                  location: restaurant,
                  stopover: true,
                },
              ],
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result);
                console.log("✅ Route Rider → Restaurant → Customer drawn");
              } else {
                console.error("❌ Directions request failed:", status);
              }
            }
          );

          // Fit map to show all locations
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend(rider);
          bounds.extend(restaurant);
          bounds.extend(customer);
          map.fitBounds(bounds);
        };

        const initMap = () => setTimeout(loadMap, 300);

        if (!window.google || !window.google.maps) {
          const existingScript = document.querySelector(
            `script[src*="maps.googleapis.com"]`
          );
          if (!existingScript) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            document.body.appendChild(script);
          } else {
            existingScript.addEventListener("load", initMap);
          }
        } else {
          initMap();
        }
      } catch (err) {
        console.error("❌ Failed to fetch assigned orders:", err);
        setError(err?.message || "Failed to fetch assigned orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [dispatch, riderData]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Rider Dashboard</h2>

      {loading && <p>Loading assigned orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "450px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          marginTop: "10px",
        }}
      ></div>
    </div>
  );
}

export default Riderdashboard;
