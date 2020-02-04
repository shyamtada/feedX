import React from "react";
import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
// import reducer from './Reducers'
import AddData from './Containers/AddData'
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./Sagas";
import './index.css';

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(rootSaga);

import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";



const client = new ApolloClient({
  uri: 'http://15.206.158.92:4000/',
});

// client
//   .query({
//     query: gql`
//     {
//       Review{
//        id
//        text
//        user{
//          id
//          name
//        }
//        stars
//        date {
//          day
//          year
//          month
//        }
//      }
//      }
//     `
//   })
//   .then(result => console.log(result.data));

render(
  <ApolloProvider client={client}>
    <AddData />
  </ApolloProvider>
  ,
  document.getElementById('root')
)
