import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./components/MapComponent";
import RouteTable from "./components/RouteTable";
import { useEffect } from "react";
import { setSelectedRouteId, addMarker, fetchPolyline } from "./reducers/routeReducer";
import { AppDispatch, RootState } from "./store";

const App = () => {
  const routes = useSelector((state: RootState) => state.route.routes);
  const selectedRouteId = useSelector((state: RootState) => state.route.selectedRouteId);
  const selectedRoute = selectedRouteId !== null ? routes[selectedRouteId] : null;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedRouteId !== null && selectedRoute && !selectedRoute.polyline) {
      dispatch(fetchPolyline({ routeId: selectedRouteId, markers: selectedRoute.markers }));
    }
  }, [dispatch, selectedRoute, selectedRouteId]);

  const handleRowClick = (index: number) => {
    dispatch(setSelectedRouteId(index));
  };

  const handleAddMarker = (marker: number[]) => {
    if (selectedRouteId !== null && selectedRoute !== null) {
      const newMarkers = [...selectedRoute.markers, marker];
      dispatch(addMarker({ routeId: selectedRouteId, marker }));
      dispatch(fetchPolyline({ routeId: selectedRouteId, markers: newMarkers }));
    }
  };

  return (
    <div className="container">
      <RouteTable
        routes={routes}
        selectedRouteId={selectedRouteId}
        onRowClick={handleRowClick}
      />
      {selectedRoute && (
        <MapComponent selectedRoute={selectedRoute} onAddMarker={handleAddMarker} />
      )}
    </div>
  );
};

export default App;
