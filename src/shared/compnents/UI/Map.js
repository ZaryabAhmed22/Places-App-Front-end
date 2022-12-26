import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";

export default function Map(props) {
  return (
    <div className={`map ${props.className}`} style={props.style}>
      <MapContainer center={props.center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={props.center}>
          <Popup className="pop-up">{props.title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
