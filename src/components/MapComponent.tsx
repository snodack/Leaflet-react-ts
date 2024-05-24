import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import MapContent from "@/components/MapContent";
import boundsMaps from "@/utilities/bounds";
import centerMaps from "@/utilities/centerMaps";

// Типы для компонентов
type MarkerType = [number, number];

interface Route {
  markers: MarkerType[];
  polyline: MarkerType[] | null;
}

interface ClickHandlerProps {
  onAddMarker: (marker: MarkerType) => void;
}

interface MapComponentProps {
  selectedRoute: Route | null;
  onAddMarker: (marker: MarkerType) => void;
  center: MarkerType; // Добавлен новый пропс
}

// Функция для создания нумерованных иконок
const createNumberedIcon = (number: number) => {
  return L.divIcon({
    html: `<div style="background-color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">${number}</div>`,
    className: "",
    iconSize: [24, 24],
  });
};

const ClickHandler = ({ onAddMarker }: ClickHandlerProps) => {
  useMapEvents({
    click(e) {
      const newMarker: MarkerType = [e.latlng.lat, e.latlng.lng];
      onAddMarker(newMarker);
    },
  });
  return null;
};

const MapComponent = ({ selectedRoute, onAddMarker, center }: MapComponentProps) => {
  const [mapCenter, setMapCenter] = useState(center);
  const [mapBounds, setMapBounds] = useState(() => boundsMaps(selectedRoute));

  useEffect(() => {
    if (selectedRoute) {
      setMapCenter(centerMaps(selectedRoute));
      setMapBounds(boundsMaps(selectedRoute));
    } else {
      setMapCenter(center);
    }
  }, [selectedRoute, center]);

  return (
    <MapContainer center={mapCenter} zoom={8} whenCreated={(map) => map.setView(mapCenter)}>
      <MapContent bounds={mapBounds} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onAddMarker={onAddMarker} />
      {selectedRoute?.polyline && (
        <Polyline positions={selectedRoute.polyline} color="green" />
      )}
      {selectedRoute?.markers &&
        selectedRoute.markers.map((marker, index) => (
          <Marker key={index} position={marker} icon={createNumberedIcon(index + 1)} />
        ))}
    </MapContainer>
  );
};

export default MapComponent;
