import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Route = {
  markers: number[][];
  polyline: number[][] | null;
};

type RouteState = {
  routes: Route[];
  selectedRouteId: number | null;
};

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
    setPolyline(state, action: PayloadAction<{ routeId: number; polyline: number[][] }>) {
      const { routeId, polyline } = action.payload;
      state.routes[routeId].polyline = polyline;
    },
    addMarker(state, action: PayloadAction<{ routeId: number; marker: number[] }>) {
      const { routeId, marker } = action.payload;
      state.routes[routeId].markers.push(marker);
    },
    fetchPolyline(state, action: PayloadAction<{ routeId: number; markers: number[][] }>) {
      // This will be handled by the saga
    },
  },
});

export const { setSelectedRouteId, setPolyline, addMarker, fetchPolyline } = routeSlice.actions;
export default routeSlice.reducer;
