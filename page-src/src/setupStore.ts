import { createStore, applyMiddleware, StoreEnhancer, compose } from "redux";

import createSagaMiddleware from "redux-saga";

import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import reducers from "./app/reducers";
import rootSaga from "./app/sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];
const middlewareEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

const enhancers = [middlewareEnhancer];

const composedEnhancers: StoreEnhancer<{}> = compose(...enhancers);

const store = createStore(reducers, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
