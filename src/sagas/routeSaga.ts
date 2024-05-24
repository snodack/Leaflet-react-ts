import { takeLatest, call, put, StrictEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchPolyline, setPolyline } from '@/reducers/routeReducer';
import { getPolylineFromAPI } from '@/services/routeService';

function* handleFetchPolyline(action: PayloadAction<{ routeId: number; markers: number[][] }>): Generator<StrictEffect, void, number[][]> {
  const { routeId, markers } = action.payload;
  try {
    const polyline = yield call(getPolylineFromAPI, markers);
    yield put(setPolyline({ routeId, polyline }));
  } catch (error) {
    console.error("Error fetching polyline:", error);
    // handle error properly here
  }
}

export function* watchFetchPolyline() {
  yield takeLatest(fetchPolyline.type, handleFetchPolyline);
}
