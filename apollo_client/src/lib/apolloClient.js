import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export default new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})
