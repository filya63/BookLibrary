import { shallowMount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Books from '@/views/Books.vue';
import BooksRepository from '@/lib/BooksRepository';
import apolloClient from '@/lib/apolloClient';


jest.mock('@/lib/BooksRepository');

jest.mock('@/lib/apolloClient');


function createWrapper() {
    return shallowMount(Books, {
        localVue: createLocalVue(),
    });
}

function getReceivedBooks() {
    return [
        {
            title: 'firstBookTitle',
            author: {
                firstName: 'John',
                lastName: 'Doe',
            },
        },
        {
            title: 'secondBookTitle',
            author: {
                firstName: 'Jane',
                lastName: 'Doe',
            },
        },
        {
            title: 'thirdBookTitle',
            author: {
                firstName: 'Iggy',
                lastName: 'Pop',
            },
        },
    ];
}

function findFirstRenderedBook( wrapper ) {
    return wrapper.findAll('.books-list__item').at(0)
}

describe('Books.vue', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create repository with apollo client instance', () => {
        const wrapper = createWrapper();

        expect( BooksRepository ).toHaveBeenCalledWith( apolloClient );
    });

    it('should call getBooks on BooksRepository instace', async () => {
        const wrapper = createWrapper();

        await wrapper.vm.$nextTick();

        const booksRepoInstance = BooksRepository.mock.instances[0];

        expect(booksRepoInstance.getBooks).toHaveBeenCalledTimes(1);
    });

    it('should render all received books', async () => {
        const receivedBooks = getReceivedBooks();

        // TODO: как правильно мокать метод - погуглить
        BooksRepository.prototype.getBooks = jest.fn().mockResolvedValue(receivedBooks);

        const wrapper = createWrapper();

        await flushPromises();

        const renderedBooks = wrapper.findAll('.books-list__item');

        expect( renderedBooks.length ).toBe(receivedBooks.length);
    });

    it('should render book name', async () => {
        const receivedBooks = getReceivedBooks();

        // TODO: как правильно мокать метод - погуглить
        BooksRepository.prototype.getBooks = jest.fn().mockResolvedValue(receivedBooks);

        const wrapper = createWrapper();

        await flushPromises();

        const firstRenderedBook = findFirstRenderedBook(wrapper);
        const firstBookTitle = firstRenderedBook.find('.books-list__item-title').text();

        expect( firstBookTitle ).toBe(receivedBooks[0].title);
    });

    it('should render book author', async () => {
        const receivedBooks = getReceivedBooks();

        // TODO: как правильно мокать метод - погуглить
        BooksRepository.prototype.getBooks = jest.fn().mockResolvedValue(receivedBooks);

        const wrapper = createWrapper();

        await flushPromises();

        const firstRenderedBook = findFirstRenderedBook(wrapper);
        const firstBookAuthor = firstRenderedBook.find('.books-list__item-author').text();
        const expectedAuthor = `${receivedBooks[0].author.firstName} ${receivedBooks[0].author.lastName}`;

        expect( firstBookAuthor ).toBe( expectedAuthor );
    });

    it('should render error rejected by getBooks', async () => {
        const error = new Error('Some error');

        // TODO: как правильно мокать метод - погуглить
        BooksRepository.prototype.getBooks = jest.fn().mockRejectedValue(error);

        const wrapper = createWrapper();

        await flushPromises();

        const textMessage = wrapper.find('.books-list__error').text();

        expect( textMessage ).toBe( error.message );
    });

    it('should render loader while books loading in process', async () => {

        // TODO: как правильно мокать метод - погуглить
        BooksRepository.prototype.getBooks = jest.fn().mockResolvedValue(getReceivedBooks());

        const wrapper = createWrapper();

        expect(wrapper.find('.books-list__loader').exists()).toBe(true);

        await flushPromises();

        expect(wrapper.find('.books-list__loader').exists()).toBe(false);
    });
});
