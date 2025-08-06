<template>
  <div class="book-section position-relative">
    <h2 class="mb-3">Sách nổi bật</h2>

    <!-- Nút cuộn -->
    <button class="scroll-btn left" @click="scrollLeft"><i class="fas fa-chevron-left"></i></button>
    <button class="scroll-btn right" @click="scrollRight"><i class="fas fa-chevron-right"></i></button>

    <!-- Dãy thẻ sách -->
    <div class="scroll-row d-flex overflow-hidden" ref="scrollContainer">
      <BookCard v-for="(book, index) in books" :key="book._id" :book="book" :index="index" :total="books.length" />
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue'
import api from '@/services/api.service' // Đúng file bạn nói

export default {
  components: { BookCard },
  data() {
    return { books: [] }
  },
  async created() {
    const res = await api.get('/sach')
    this.books = res.data.data.items
  },
  methods: {
    scrollLeft() {
      this.$refs.scrollContainer.scrollBy({ left: -400, behavior: 'smooth' })
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
.scroll-row {
  scroll-behavior: smooth;
  padding: 10px 0;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: #eee8d5;
  border: none;
  padding: 8px;
  font-size: 20px;
  color: #382110;
  cursor: pointer;
  border-radius: 50%;
}

.scroll-btn.left {
  left: -5px;
}

.scroll-btn.right {
  right: -5px;
}
</style>
