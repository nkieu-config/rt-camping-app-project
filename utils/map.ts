import L, { LatLngExpression } from "leaflet";

export const DEFAULT_POSITION: LatLngExpression = [14, 100.5];

export const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconSize: [20, 30],
});
