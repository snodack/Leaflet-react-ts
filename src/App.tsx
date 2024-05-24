import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./components/MapComponent";
import RouteTable from "./components/RouteTable";
import { useEffect } from "react";
import { setSelectedRouteId, addMarker } from "./reducers/routeReducer";

const App = () => {
  const routes = useSelector((state: any) => state.route.routes);
  const selectedRouteId = useSelector((state: any) => state.route.selectedRouteId);
  const selectedRoute = routes[selectedRouteId];

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRoute && !selectedRoute.polyline) {
      dispatch({
        type: "route/fetchPolyline",
        payload: { routeId: selectedRouteId, markers: selectedRoute.markers },
      });
    }
  }, [dispatch, selectedRoute, selectedRouteId]);

  const handleRowClick = (index: any) => {
    dispatch(setSelectedRouteId(index));
  };

  const handleAddMarker = (marker: any) => {
    if (selectedRouteId !== null) {
      dispatch(addMarker({ routeId: selectedRouteId, marker }));
    }
  };

  return (
    <div className="container">
      <RouteTable
        routes={routes}
        selectedRouteId={selectedRouteId}
        onRowClick={handleRowClick}
      />
      <MapComponent selectedRoute={selectedRoute} onAddMarker={handleAddMarker} />
    </div>
  );
};

export default App;
