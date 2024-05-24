const boundsMaps = (selectedRoute: any) => {
  return selectedRoute?.polyline?.length > 0
    ? selectedRoute.polyline.map((point: number[]) => [point[0], point[1]])
    : [
        [54.733805, 55.957838],
        [54.733805, 55.957838],
      ];
};

export default boundsMaps;
