import { createStore, applyMiddleware } from "redux";
import createSagaMedlleware from 'redux-saga';
import reduxlogger from "redux-logger";

import RootReducer from "./root-reducer";
import RootSaga from './root-saga'

const sagaMiddleware = createSagaMedlleware();
let middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares = [...middlewares, reduxlogger];
}

// store
const store = createStore(RootReducer, applyMiddleware(...middlewares));
// run saga
sagaMiddleware.run(RootSaga);

export default store;
