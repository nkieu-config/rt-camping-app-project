"use client";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { LatLngExpression, LatLng } from "leaflet";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { DEFAULT_POSITION, markerIcon } from "@/utils/map";

interface MapLandmarkProps {
  location?: LatLngExpression;
}

interface LocationMarkerProps {
  position: LatLng | null;
  setPosition: (position: LatLng) => void;
}

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  if (!position) return null;

  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function MapLandmark({ location }: MapLandmarkProps) {
  const [position, setPosition] = useState<LatLng | null>(null);

  return (
    <>
      <p className="mt-8 text-sm font-semibold">Where is your landmark?</p>
      <input type="hidden" name="lat" value={position ? position.lat : ""} />
      <input type="hidden" name="lng" value={position ? position.lng : ""} />

      <MapContainer
        className="relative z-0 mt-4 h-[400px] w-full rounded-lg"
        center={location || DEFAULT_POSITION}
        zoom={9}
        scrollWheelZoom={true}
      >
        <Marker position={[14, 100.5]} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker position={position} setPosition={setPosition} />

        <LayersControl>
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
}

export default MapLandmark;
