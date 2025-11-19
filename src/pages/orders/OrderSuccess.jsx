import { useEffect, useRef } from "react";
import Layout from "../../layout/Layout";
import orderImage from "../../assets/images/orderImage.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Ordersuccess() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const { orderData } = useSelector((state) => state.order);


  const riderLocation = {
    lat: Number(orderData?.assignedRider?.latitude),
    lng: Number(orderData?.assignedRider?.longitude),
  };

  const orderLocation = {
    lat: Number(orderData?.addressLocation?.latitude),
    lng: Number(orderData?.addressLocation?.longitude),
  };

  useEffect(() => {
    console.log("Order Data:", orderData);
    console.log("Rider Location:", riderLocation);
    console.log("Order Location:", orderLocation);

    if (
      !orderData ||
      !riderLocation.lat ||
      !riderLocation.lng ||
      !orderLocation.lat ||
      !orderLocation.lng
    ) {
      console.warn("❌ Missing order or coordinates — map not loaded");
      return;
    }

    const loadMap = () => {
      console.log("🗺️ Initializing Google Map...");

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: orderLocation,
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
      });
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: riderLocation,
          destination: orderLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);

            const leg = result.routes[0].legs[0];
            const distance = leg.distance.text;
            const duration = leg.duration.text;

            // 🏍️ Rider Marker
            new window.google.maps.Marker({
              position: riderLocation,
              map,
              title: "Rider Location",
              icon: {
                url: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
                scaledSize: new window.google.maps.Size(40, 40),
              },
            });

            // 📦 Order Marker
            new window.google.maps.Marker({
              position: orderLocation,
              map,
              title: "Delivery Location",
            });

            // ℹ️ Info Window
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="font-size:14px; line-height:1.4">
                  <strong>Distance:</strong> ${distance}<br/>
                  <strong>ETA:</strong> ${duration}
                </div>
              `,
              position: leg.steps[Math.floor(leg.steps.length / 2)].end_location,
            });
            infoWindow.open(map);

            // ✅ Fit map to route bounds
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(riderLocation);
            bounds.extend(orderLocation);
            map.fitBounds(bounds);
          } else {
            console.error("❌ Directions request failed:", status);
          }
        }
      );
    };

    // ✅ Load Google Maps safely
    const initialize = () => setTimeout(loadMap, 300);

    if (!window.google || !window.google.maps) {
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`;
        script.async = true;
        script.defer = true;
        script.onload = initialize;
        document.body.appendChild(script);
      } else {
        existingScript.addEventListener("load", initialize);
      }
    } else {
      initialize();
    }
  }, [orderData]);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center py-16">
        <img width={400} height={400} src={orderImage} alt="Order Success" />
        <p className="text-lg font-semibold mt-4">
          Your order has been placed successfully
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
        >
          Go Back Home
        </button>

        {/* 🗺️ Map Container */}
        <div
          ref={mapRef}
          style={{
            width: "90%",
            height: "400px",
            marginTop: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        ></div>
      </div>
    </Layout>
  );
}

export default Ordersuccess;
