import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import UploadFrom from './UploadFrom'

const client = new ApolloClient({

  link: createUploadLink({
    uri: 'http://localhost:4000/graphql/'
  }),
  cache: new InMemoryCache(),
})

function App() {
  return <ApolloProvider client={client}>
    <UploadFrom />
  </ApolloProvider>
}

export default App;
