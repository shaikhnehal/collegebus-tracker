import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../api/axios";
import socket from "../socket";

const MapPage = () => {
  const [buses, setBuses] = useState([]);

  // 🔹 Load buses
  useEffect(() => {
    api.get("/buses").then((res) => setBuses(res.data));
  }, []);

  // 🔹 Live socket update
  useEffect(() => {
    socket.on("busLocationUpdate", (updatedBus) => {
      setBuses((prev) =>
        prev.map((b) => (b._id === updatedBus._id ? updatedBus : b))
      );
    });

    return () => socket.off("busLocationUpdate");
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {buses.map((bus) => (
          <Marker
            key={bus._id}
            position={[bus.location.lat, bus.location.lng]}
          >
            <Popup>
              <b>🚌 Bus:</b> {bus.number} <br />
              <b>🛣 Route:</b> {bus.route} <br />
              <b>👨‍✈️ Driver:</b>{" "}
              {bus.driver?.name || bus.driverName || "Not Assigned"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
