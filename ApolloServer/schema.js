const {
    gql
} = require('apollo-server');

const typeDefs = gql`
    type Query {
        names: [String]
        books: [Book]
    }

    type Book {
        title: String
        author: Author
    }

    type Author {
        firstName: String
        lastName: String
    }

    input AuthorInput {
        firstName: String
        lastName: String
    }

    type Mutation {
        addName(name: String): MutationResult
        removeName(name: String): MutationResult
        addBook(title: String, author: AuthorInput): MutationResult
    }

    type MutationResult {
        isSuccess: Boolean
        errorText: String
        successText: String
    }
`;

// сделать мутацию для добавления книги (объект)

// query { Можно запросить в песочнице
//     books {
//      title
//      author {
//         firstName
//         lastName
//       }
//    }
// }

const resolvers = {
    Query: {
        /**
         * @param parent	This is the return value of the resolver for this field's parent (the resolver for a parent field always executes before the resolvers for that field's children).
         * @param args	This object contains all GraphQL arguments provided for this field.
         * @param context	This object is shared across all resolvers that execute for a particular operation. Use this to share per-operation state, such as authentication information and access to data sources.
         * @param info	This contains information about the execution state of the operation (used only in advanced cases).
         */
        names: (parent, args, { dataSources }) => {
            return dataSources.names.getNames();
        },
        books: (parent, args, { dataSources }) => {
            return dataSources.books.getBooks();
        },
    },
    Mutation: {
        addName: (parent, { name }, { dataSources }) => {
            dataSources.names.addName(name);
            return {
                isSuccess: true,
                errorText: '',
                successText: 'Имя успешно добавлено',
            };
        },
        removeName: (parent, { name }, { dataSources }) => {
            dataSources.names.removeName(name);
            return {
                isSuccess: true,
                errorText: '',
                successText: `Имя ${name} удалено`,
            }
        },
        addBook: (parent, { title, author }, { dataSources }) => {
            dataSources.books.addBook(title, author);
            return {
                isSuccess: true,
                errorText: '',
                successText: `Книга ${title} добавлена`,
            }
        },
    }
};

module.exports = {
    typeDefs,
    resolvers,
};
