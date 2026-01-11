
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import socket from "../../socket";
import api from "../../api/axios";

const LiveMap = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    api.get("/buses").then((res) => setBuses(res.data));
  }, []);

  useEffect(() => {
    socket.on("busLocationUpdate", (bus) => {
      setBuses((prev) =>
        prev.map((b) => (b._id === bus._id ? bus : b))
      );
    });
    return () => socket.off("busLocationUpdate");
  }, []);

  return (
    <MapContainer center={[23.2599, 77.4126]} zoom={12} className="h-96 w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {buses.map((bus) => (
        <Marker
          key={bus._id}
          position={[bus.location.lat, bus.location.lng]}
        >
          <Popup>
            <b>{bus.number}</b><br />
            {bus.route}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LiveMap;
