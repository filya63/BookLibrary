const { ApolloServer } = require('apollo-server');
const { NamesApi, BooksApi } = require('./dataSources');
const {
    typeDefs,
    resolvers
}
= require('./schema');

const names = new NamesApi();
const books = new BooksApi();

const server = new ApolloServer({
    typeDefs,
    resolvers,

    // возвращаемый объект попадет в aргумент context (третий) резолверов: context.dataSources 
    dataSources: () => {
        return {
            names,
            books,
        };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});