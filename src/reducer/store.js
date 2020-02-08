import { createStore, applyMiddleware } from "redux";
import reduxlogger from "redux-logger";

import RootReducer from "./root-reducer";

let middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares = [...middlewares, reduxlogger];
}

const store = createStore(RootReducer, applyMiddleware(...middlewares));

export default store;
