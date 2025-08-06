<template>
    <div class="row mt-4">
        <!-- Ảnh sách bên trái -->
        <div class="col-md-4 text-center">
            <div class="book-image-wrapper mx-auto">
                <img :src="coverUrl" class="book-image" alt="cover" />
            </div>
            <button @click="handleBookmark" class="btn mt-3 custom-btn"
                :class="isBookmarked ? 'btn-outline-danger' : 'btn-outline-primary'" style="width: 180px">
                <i :class="isBookmarked ? 'fas fa-times' : 'fas fa-bookmark'" class="me-1"></i>
                {{ isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu sách' }}
            </button>
        </div>

        <!-- Nội dung bên phải -->
        <div class="col-md-8">
            <h2 class="fw-bold mb-1">{{ book.tenSach }}</h2>
            <p class="text-muted mb-1">Tác giả: {{ book.tacGia }}</p>
            <p class="text-muted mb-2">Thể loại:
                <span v-if="book.theLoais?.length">
                    <a v-for="t in book.theLoais" :key="t._id" class="text-link me-2" role="button" @click.prevent>
                        {{ t.theLoai.tenTheLoai }}
                    </a>
                </span>
                <span v-else>Không rõ</span>
            </p>

            <hr />

            <!-- Mô tả -->
            <p class="book-description">
                {{ showFullDescription ? book.moTa : shortDescription }}
                <span v-if="book.moTa && book.moTa.length > 300" @click="showFullDescription = !showFullDescription"
                    class="text-link ms-2 text-dark" style="cursor: pointer">
                    {{ showFullDescription ? 'Thu gọn' : 'Xem thêm' }}
                </span>
            </p>

            <hr />

            <!-- Thông tin chi tiết -->
            <ul class="list-unstyled small">
                <li>
                    <strong>Nhà xuất bản: {{ book.nhaXuatBan?.tenNhaXuatBan || '...' }}</strong>
                </li>
                <li><strong>Đơn giá:</strong> {{ book.donGia ? book.donGia + ' VNĐ' : '...' }}</li>
                <li><strong>Số lượng tồn:</strong> {{ book.soLuongTon || '...' }}</li>

            </ul>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.service'
import { useUserStore } from '@/stores/userStore'

const backendBaseURL = import.meta.env.VITE_API_URL.replace('/api/v1', '')

export default {
    name: 'BookDetail',
    data() {
        return {
            book: {},
            isBookmarked: false,
            showFullDescription: false,
            store: null // lưu userStore tại đây
        }
    },
    computed: {
        coverUrl() {
            return this.book.anhBia?.[0]
                ? `${backendBaseURL}${this.book.anhBia[0]}`
                : '/default-cover.jpg'
        },
        shortDescription() {
            return this.book.moTa?.length > 300
                ? this.book.moTa.slice(0, 300) + '...'
                : this.book.moTa
        }
    },
    async created() {
        this.store = useUserStore()
        try {
            const res = await api.get(`/sach/${this.$route.params.id}`)
            this.book = res.data.data

            if (this.store.isLoggedIn) {
                const bmRes = await api.get('/danhdau')
                this.isBookmarked = bmRes.data.some(bm => bm.sach._id === this.book._id)
            }
        } catch (err) {
            console.error('Lỗi khi lấy dữ liệu sách hoặc đánh dấu', err)
        }
    },
    methods: {
        async handleBookmark() {
            if (!this.store.isLoggedIn) {
                this.$router.push({ name: 'Login' })
                return
            }

            try {
                if (this.isBookmarked) {
                    await api.delete(`/danhdau/${this.book._id}`)
                    this.isBookmarked = false
                } else {
                    await api.post('/danhdau', { sachId: this.book._id, soLuong: 1 })
                    this.isBookmarked = true
                }
            } catch (err) {
                console.error('Lỗi khi thay đổi đánh dấu', err)
            }
        }
    }
}
</script>


<style scoped>
.book-image-wrapper {
    width: 180px;
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.book-description {
    white-space: pre-wrap;
    font-size: 0.95rem;
    line-height: 1.6;
}
</style>
