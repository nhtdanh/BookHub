<template>
    <div class="container mt-4">
        <h2 class="mb-4">Tất cả sách</h2>
        <div class="row">
            <div class="col book-column" v-for="book in books" :key="book._id">
                <BookCard :book="book" />
            </div>
        </div>
    </div>
</template>

<script>
import BookCard from '@/components/BookCard.vue'
import api from '@/services/api.service'

export default {
    components: { BookCard },
    data() {
        return { books: [] }
    },
    async created() {
        const res = await api.get('/sach')
        this.books = res.data.data.items
    }
}
</script>

<style scoped>
.book-column {
    width: 20%;
    padding: 12px;
}

@media (max-width: 992px) {
    .book-column {
        width: 25%;
    }
}

@media (max-width: 768px) {
    .book-column {
        width: 33.333%;
    }
}

@media (max-width: 576px) {
    .book-column {
        width: 50%;
    }
}
</style>
