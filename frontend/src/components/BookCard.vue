<template>
    <div class="book-card" @click="goToDetail">
        <div class="book-image-wrapper">
            <img :src="coverUrl" class="book-image" />
        </div>
        <div class="book-meta mt-2 text-center">
            <div class="book-title text-truncate fw-semibold">{{ book.tenSach }}</div>
            <div class="book-author text-muted small">{{ book.tacGia }}</div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

const backendBaseURL = import.meta.env.VITE_API_URL.replace('/api/v1', '')

export default {
    props: {
        book: Object
    },
    computed: {
        coverUrl() {
            return this.book.anhBia?.[0]
                ? `${backendBaseURL}${this.book.anhBia[0]}`
                : '/default-cover.jpg'
        }
    },
    setup(props) {
        const router = useRouter()
        const goToDetail = () => {
            router.push({ name: 'BookDetail', params: { id: props.book._id } })
        }
        return { goToDetail }
    }
}
</script>

<style scoped>
.book-card {
    width: 160px;
    margin: 0 10px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
    cursor: pointer;
}

.book-card:hover {
    transform: scale(1.05);
}

.book-image-wrapper {
    width: 100%;
    aspect-ratio: 2 / 3;
    overflow: hidden;
}

.book-image {
    width: 100%;
    height: 100%;
    object-fit: cover;


    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
}

.book-title {
    font-size: 0.9rem;
    color: #382110;
}

.book-author {
    font-size: 0.75rem;
    color: #666;
}
</style>
