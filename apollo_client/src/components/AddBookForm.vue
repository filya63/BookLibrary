<template>
  <form
    class="add-book-form"
    @submit.prevent="handleSubmit"
  >
    <input
      type="text"
      name="title"
      v-model="title"
      class="add-book-form__input"
    >
    <input
      type="text"
      name="authorname"
      v-model="authorName"
      class="add-book-form__input"
    />
    <input
      type="text"
      name="authorlastname"
      v-model="authorLastName"
      class="add-book-form__input"
    />
    <button
      class="add-book-form__submit"
      type="submit"
      @click.prevent="handleSubmit"
    >
        Добавить книгу
    </button>
  </form>
</template>

<script>
import BooksRepository from '@/lib/BooksRepository'

export default {
  name: 'AddBookForm',

  data () {
    return {
      title: '',
      authorName: '',
      authorLastName: ''
    }
  },

  methods: {
    handleSubmit () {
      const booksRepository = new BooksRepository(null)

      const result = booksRepository.addBook(this.title, { firstName: this.authorName, lastName: this.authorLastName});
    }
  }
}
</script>
