class NamesApi {
    constructor() {
        this.names = ['Лермонтов', 'Пушкин', 'Онегин'];
    }
    getNames() {
        return this.names;
    }
    addName(name) {
        this.names.push(name);
    }
    removeName(name) {
        this.names = this.names.filter(item => item !== name);
    }
}

class BooksApi {
    constructor() {
        this.books = [
            {
                title: 'The Awakening',
                author: {
                    firstName: 'Kate',
                    lastName: 'Chopin'
                }
            },
            {
                title: 'City of Glass',
                author: {
                    firstName: 'Paul',
                    lastName: 'Auster'
                }
            },
            {
                title: 'Onegin',
                author: {
                    firstName: 'Alexander',
                    lastName: 'Pushkin'
                }
            },
        ]
    }

    getBooks() {
        return this.books;
    }

    addBook(title, author) {
        this.books.push({
            title,
            author,
        })
    }
}

module.exports = {
    NamesApi,
    BooksApi,
};