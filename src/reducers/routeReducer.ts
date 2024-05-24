import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типы для компонентов
type MarkerType = [number, number];

interface Route {
  markers: MarkerType[];
  polyline: MarkerType[] | null;
}

interface RouteState {
  routes: Route[];
  selectedRouteId: number | null;
}

const initialState: RouteState = {
  routes: [
    {
      markers: [
        [54.738762, 55.972055], // Уфа, Башкортостан, Россия
        [54.790311, 56.034864], // Уфа, Башкортостан, Россия
        [54.766159, 56.076595], // Уфа, Башкортостан, Россия
      ],
      polyline: null,
    },
    {
      markers: [
        [54.738762, 55.972055], // Уфа, Башкортостан, Россия
        [54.789989, 56.054277], // Уфа, Башкортостан, Россия
        [54.752713, 56.073465], // Уфа, Башкортостан, Россия
      ],
      polyline: null,
    },
    {
      markers: [
        [54.738762, 55.972055], // Уфа, Башкортостан, Россия
        [54.743062, 56.046573], // Уфа, Башкортостан, Россия
        [54.790311, 56.034864], // Уфа, Башкортостан, Россия
      ],
      polyline: null,
    },
  ],
  selectedRouteId: null,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setSelectedRouteId(state, action: PayloadAction<number>) {
      state.selectedRouteId = action.payload;
    },
    setPolyline(state, action: PayloadAction<{ routeId: number; polyline: MarkerType[] }>) {
      const { routeId, polyline } = action.payload;
      state.routes[routeId].polyline = polyline;
    },
    addMarker(state, action: PayloadAction<{ routeId: number; marker: MarkerType }>) {
      const { routeId, marker } = action.payload;
      state.routes[routeId].markers.push(marker);
    },
    fetchPolyline(state, action: PayloadAction<{ routeId: number; markers: MarkerType[] }>) {
      // This will be handled by the saga
    },
    clearRoute(state, action: PayloadAction<number>) {
      const routeId = action.payload;
      state.routes[routeId].markers = [];
      state.routes[routeId].polyline = null;
    }
  },
});

export const { setSelectedRouteId, setPolyline, addMarker, fetchPolyline, clearRoute } = routeSlice.actions;
export default routeSlice.reducer;
