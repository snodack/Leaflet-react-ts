import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "../reducers/routeReducer";
import createSagaMiddleware from "redux-saga";
import { watchFetchPolyline } from "@/sagas/routeSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    route: routeReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPolyline);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
