import AddBookForm from '@/components/AddBookForm'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import BooksRepository from '@/lib/BooksRepository';

jest.mock('@/lib/BooksRepository');

function createWrapper(options = {}) {
    return shallowMount(AddBookForm, {
        localVue: createLocalVue(),
    })
}

describe(AddBookForm.name, () => {
    beforeEach(() => {
        BooksRepository.prototype.addBook = jest.fn().mockResolvedValue(null);;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it.each([
        'title',
        'authorname',
        'authorlastname',
    ])('должна отображать поле c именем %s', (name) => {
        const wrapper = createWrapper();
        const titleInputWrapper = wrapper.find(`input[name="${name}"]`);

        expect(titleInputWrapper.exists()).toBeTruthy();
    });

    it('должна отображать кнопку отправки формы', () => {
        const wrapper = createWrapper();
        const buttonWrapper = wrapper.find('button.add-book-form__submit');

        expect(buttonWrapper.exists()).toBe(true);
    });

    it('должна отображать кнопку отправки формы с атрибутом type = submit', () => {
        const wrapper = createWrapper();
        const buttonWrapper = wrapper.find('button.add-book-form__submit');

        expect(buttonWrapper.attributes('type')).toBe('submit');
    });

    it.each([
        ['click', 'button.add-book-form__submit'],
        ['submit', 'form.add-book-form'],
    ])('должна вызывать метод addBook у инстанса BooksRepository книги событии %s на элементе %s', (event, selector) => {
        const wrapper = createWrapper();
        const actionElementWrapper = wrapper.find(selector);

        actionElementWrapper.trigger(event);

        const booksRepoInstance = BooksRepository.mock.instances[0];

        expect(booksRepoInstance.addBook).toHaveBeenCalled();
    });

    it('должна передавать в метод addBook у инстанса BooksRepository параметры книги', async () => {
        const title = 'Бойцовский Клуб'
        const authorName = 'Билл'
        const authorLastName = 'Гейтс'

        const wrapper = createWrapper()

        const titleInputWrapper = wrapper.find(`input[name="title"]`)
        const authorNameInputWrapper = wrapper.find(`input[name="authorname"]`)
        const authorLastNameInputWrapper = wrapper.find(`input[name="authorlastname"]`)

        const buttonWrapper = wrapper.find('button.add-book-form__submit')

        await titleInputWrapper.setValue(title)
        await authorNameInputWrapper.setValue(authorName)
        await authorLastNameInputWrapper.setValue(authorLastName)

        await buttonWrapper.trigger('click')

        const booksRepoInstance = BooksRepository.mock.instances[0]

        expect(booksRepoInstance.addBook).toHaveBeenCalledWith(title, authorName, authorLastName)
    });

    it.todo('должна генерировать событие success после успешного добавления книги');

    it.todo('должна генерировать событие error после НЕ успешного добавления книги');

    it.todo('должна очищать поля после успешного добавления книги');

    it.todo('удаление книг..,.....');
})
