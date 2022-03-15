import booksQuery from './gql/books.gql'
import addBookMutation from './gql/addBook.gql'

export const badDataFormatError = new Error('bad data format')

export default class BooksRespository {
  constructor (appoloClient) {
    this.appoloClient = appoloClient
  }

  async addBook (title, author) {
    try {
      const result = await this.appoloClient.mutate({
        mutation: addBookMutation,
        variables: {
          title,
          author
        }
      })

      const { isSuccess, errorText, successText } = result.addBook;
  
      return {
        isSuccess,
        message: isSuccess ? successText : errorText
      }
    }
    catch( error ) {
      return {
        isSuccess: false,
        message: error.message,
      }
    }
  }

  async getBooks () {
    const result = await this.appoloClient.query({ query: booksQuery })

    if (!result?.data?.books) {
      throw badDataFormatError
    }

    return result.data.books
  }
}
