import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [
    {
      markers: [
        [59.84660399, 30.29496392],
        [59.82934196, 30.42423701],
        [59.83567701, 30.38064206],
      ],
      polyline: null,
    },
    {
      markers: [
        [59.82934196, 30.42423701],
        [59.82761295, 30.41705607],
        [59.84660399, 30.29496392],
      ],
      polyline: null,
    },
    {
      markers: [
        [59.83567701, 30.38064206],
        [59.84660399, 30.29496392],
        [59.82761295, 30.41705607],
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
    setSelectedRouteId(state, action) {
      state.selectedRouteId = action.payload;
    },
    setPolyline(state, action) {
      const { routeId, polyline } = action.payload;
      state.routes[routeId].polyline = polyline;
    },
    addMarker(state, action) {
      const { routeId, marker } = action.payload;
      state.routes[routeId].markers.push(marker);
    },
  },
});

export const { setSelectedRouteId, setPolyline, addMarker } = routeSlice.actions;
export default routeSlice.reducer;
