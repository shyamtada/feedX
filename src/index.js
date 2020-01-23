import React from "react";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './Reducers'
import AddData from './containers/AddData'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);



render(
  <Provider store={store}>
    <AddData />
  </Provider>,
  document.getElementById('root')
)
