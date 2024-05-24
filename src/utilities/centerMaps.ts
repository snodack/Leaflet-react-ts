const centerMaps = (selectedRoute: any) => {
  return selectedRoute?.polyline?.length
    ? selectedRoute.polyline[0]
    : [54.733805, 55.957838];
};
export default centerMaps;
