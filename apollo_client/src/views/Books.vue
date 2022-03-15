<template>
  <div class="books-list">
    <div
      v-if="isLoading"
      class="books-list__loader"
    />

    <span
      v-if="errorMessage"
      class="books-list__error"
    >
      {{ errorMessage }}
    </span>

    <ul class="books-list__items">
      <li
        class="books-list__item"
        v-for="book in books"
        :key="book.title"
      >
        <p class="books-list__item-title">
          {{ book.title }}
        </p>

        <p class="books-list__item-author">
          {{ book.author.firstName }} {{ book.author.lastName }}
        </p>
      </li>
    </ul>

    <AddBookForm />
  </div>
</template>

<script>
import BooksRepository from '@/lib/BooksRepository'
import apolloClient from '@/lib/apolloClient'
import AddBookForm from '@/components/AddBookForm'

export default {
  name: 'BooksView',

  components: {
    AddBookForm
  },

  data () {
    return {
      errorMessage: '',
      isLoading: true,
      books: []
    }
  },

  async mounted () {
    try {
      const booksRepo = new BooksRepository(apolloClient)

      this.books = await booksRepo.getBooks()
      this.isLoading = false
    } catch (error) {
      this.errorMessage = error.message
    }
  }
}
</script>
