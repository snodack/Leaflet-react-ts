import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import MapContent from "@/components/MapContent";
import boundsMaps from "@/utilities/bounds";
import centerMaps from "@/utilities/centerMaps";

const ClickHandler = ({ onAddMarker }: any) => {
  useMapEvents({
    click(e) {
      const newMarker = [e.latlng.lat, e.latlng.lng];
      onAddMarker(newMarker);
    },
  });
  return null;
};

const MapComponent = ({ selectedRoute, onAddMarker }: any) => {
  const center = centerMaps(selectedRoute);
  const bounds = boundsMaps(selectedRoute);

  return (
    <MapContainer center={center} zoom={8}>
      <MapContent bounds={bounds} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onAddMarker={onAddMarker} />
      {selectedRoute?.polyline && (
        <Polyline positions={selectedRoute.polyline} color="green" />
      )}
      {selectedRoute?.markers &&
        selectedRoute.markers.map((marker: any, index: any) => (
          <Marker key={index} position={marker} />
        ))}
    </MapContainer>
  );
};

export default MapComponent;
