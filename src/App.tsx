import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./components/MapComponent";
import RouteTable from "./components/RouteTable";
import { useEffect } from "react";
import { setSelectedRouteId, addMarker, fetchPolyline, clearRoute } from "./reducers/routeReducer";
import { AppDispatch, RootState } from "./store";

type MarkerType = [number, number];

interface Route {
  markers: MarkerType[];
  polyline: MarkerType[] | null;
}

const App = () => {
  const routes = useSelector((state: RootState) => state.route.routes as Route[]);
  const selectedRouteId = useSelector((state: RootState) => state.route.selectedRouteId);
  const selectedRoute = selectedRouteId !== null ? routes[selectedRouteId] : null;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedRouteId !== null && selectedRoute && !selectedRoute.polyline) {
      dispatch(fetchPolyline({ routeId: selectedRouteId, markers: selectedRoute.markers }));
    }
  }, [dispatch, selectedRouteId, selectedRoute?.polyline]);

  const handleRowClick = (index: number) => {
    dispatch(setSelectedRouteId(index));
  };

  const handleAddMarker = (marker: MarkerType) => {
    if (selectedRouteId !== null && selectedRoute !== null) {
      const newMarkers = [...selectedRoute.markers, marker];
      dispatch(addMarker({ routeId: selectedRouteId, marker }));
      dispatch(fetchPolyline({ routeId: selectedRouteId, markers: newMarkers }));
    }
  };

  const handleClearRoute = () => {
    if (selectedRouteId !== null) {
      dispatch(clearRoute(selectedRouteId));
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <RouteTable
          routes={routes}
          selectedRouteId={selectedRouteId}
          onRowClick={handleRowClick}
        />
        <button onClick={handleClearRoute}>Очистить маршрут</button>
      </div>
      {selectedRoute && (
        <MapComponent selectedRoute={selectedRoute} onAddMarker={handleAddMarker} />
      )}
    </div>
  );
};

export default App;
