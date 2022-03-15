import BooksRespository, { badDataFormatError } from '@/lib/BooksRepository';
import booksQuery from '@/lib/gql/books.gql';
import addBookMutation from '@/lib/gql/addBook.gql'

function createBooksQueryResult() {
    return {
        data : {
            books : []
        }
    }
}

function createAddBookMutationResult() {
    return {
        addBook: {
            isSuccess: false,
        }
    }
}

/**
 * @param {Object} result
 */
function createDefaultQueryHandler(result = createBooksQueryResult()) {
    return jest.fn().mockResolvedValue(result)
}

/**
 * @param {Object} result
 */
function createDefaultMutateHandler(result = createAddBookMutationResult()) {
    return jest.fn().mockResolvedValue(result);
}

/**
 * @param {Function} query - метод
 * @param {Function} mutate - метод
 */
function createApolloClienttMock( query = createDefaultQueryHandler(), mutate = createDefaultMutateHandler() ) {
    return {
        query,
        mutate,
    }
}

describe('BooksRespository', () => {
    describe('getBooks', () => {
        it('should call query method of apollo client', async () => {
            const apolloClient = createApolloClienttMock();
            const booksRepo = new BooksRespository(apolloClient);

            await booksRepo.getBooks();

            expect(apolloClient.query).toHaveBeenCalledWith( { query: booksQuery } );
        });

        it('should transform data from client query to expected array', async () => {
            const booksQueryResult = createBooksQueryResult();
            const resolvedQueryMock = createDefaultQueryHandler(booksQueryResult);
            const apolloClient = createApolloClienttMock(resolvedQueryMock);
            const booksRepo = new BooksRespository(apolloClient);

            const getBooksResult = await booksRepo.getBooks();

            expect(getBooksResult).toBe(booksQueryResult.data.books);
        });

        it('should pass any client errors to upper scope', async () => {
            const expectedError = new Error('Async error');
            const rejectedQueryMock = jest.fn().mockRejectedValue(expectedError);
            const apolloClient = createApolloClienttMock(rejectedQueryMock);
            const booksRepo = new BooksRespository(apolloClient);

            await expect(booksRepo.getBooks()).rejects.toBe(expectedError);
        });

        it('should throw bad query data format error', async () => {
            const expectedError = badDataFormatError;
            const badResult = {
                any: {
                    bad:{
                        data: 'format',
                    },
                },
            };
            const resolvedQueryMock = createDefaultQueryHandler(badResult);
            const apolloClient = createApolloClienttMock(resolvedQueryMock);
            const booksRepo = new BooksRespository(apolloClient);

            await expect(booksRepo.getBooks()).rejects.toBe(expectedError);
        })
    });

    describe('addBook', () => {
        let bookTitle;
        let bookAuthor;
        
        beforeEach(() => {
            bookTitle = 'The Awakening';
            bookAuthor = { 
                firstName: 'Kate',
                lastName: 'Chopin',
            };
        });
        
        it('should call mutate method on apollo client with expected mutation', async () => {
            const apolloClient = createApolloClienttMock();
            const booksRepo = new BooksRespository(apolloClient);

            await booksRepo.addBook();

            expect(apolloClient.mutate).toHaveBeenCalledWith( expect.objectContaining({ mutation: addBookMutation }) );
        });

        it('должен вызывать мутацию с нужными variables', async () => {
            const variables = {
                title: bookTitle,
                author: bookAuthor,
            };
                
            const apolloClient = createApolloClienttMock();
            const booksRepo = new BooksRespository(apolloClient);

            await booksRepo.addBook(bookTitle, bookAuthor);

            expect(apolloClient.mutate).toHaveBeenCalledWith( expect.objectContaining({ variables }) )
        });

        it('должен вернуть флаг успеха = true в случае успешного добавления книги', async () => {
            const apolloClient = createApolloClienttMock(undefined, jest.fn().mockResolvedValue({ addBook: { isSuccess: true } }));
            const booksRepo = new BooksRespository(apolloClient);

            expect(await booksRepo.addBook(bookTitle, bookAuthor))
                .toEqual(expect.objectContaining({ isSuccess: true }));
        });

        it('должен вернуть сообщение Успех в случае успешного добавления книги', async () => {
            const apolloClient = createApolloClienttMock(undefined, jest.fn().mockResolvedValue({ addBook: { isSuccess: true, successText: 'Успех' } }));
            const booksRepo = new BooksRespository(apolloClient);

            expect(await booksRepo.addBook(bookTitle, bookAuthor))
                .toEqual( expect.objectContaining({ message: 'Успех' }) );
        });

        it.each([
            ['isSuccess', false],
            ['message', 'error text']
        ])('должен вернуть поле %s с значением %s если клиент вернул ошибку операции', async (fieldName, fieldValue) => {
            const apolloClient = createApolloClienttMock(undefined, jest.fn().mockResolvedValue({ addBook: { isSuccess: false, errorText: 'error text' } }));
            const booksRepo = new BooksRespository(apolloClient);

            expect(await booksRepo.addBook(bookTitle, bookAuthor))
                .toEqual( expect.objectContaining({ [fieldName]: fieldValue }) );
        });

        it.each([
            ['isSuccess', false],
            ['message', 'network error']
        ])('должен вернуть поле %s с значением %s если произошла сетевая ошибка', async (fieldName, fieldValue) => {
            const error = new Error('network error');
            const apolloClient = createApolloClienttMock(undefined, jest.fn().mockRejectedValue(error));
            const booksRepo = new BooksRespository(apolloClient);

            expect(await booksRepo.addBook(bookTitle, bookAuthor))
                .toEqual( expect.objectContaining({ [fieldName]: fieldValue }) );
        });
    });
});
