import React from "react";
import { render } from 'react-dom'
import AddData from './Containers/AddData'
import './index.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: 'http://15.206.158.92:4000/',
});

render(
  <ApolloProvider client={client}>
     <AddData />
   </ApolloProvider>
  ,
  document.getElementById('root')
)
