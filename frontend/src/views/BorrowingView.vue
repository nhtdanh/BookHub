<template>
    <div>
        <h1 class="mb-4">Theo dõi mượn sách</h1>
        <div v-if="loading" class="text-center">
            <span class="spinner-border" role="status"></span>
        </div>
        <div v-else>
            <ul class="list-group">
                <li v-for="req in requests" :key="req._id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                    style="background-color: var(--color-bg-secondary); border-color: var(--color-border)">
                    <div>
                        <strong>{{ req.sachs.length }} cuốn</strong> —
                        <span class="text-secondary">{{ formatDate(req.ngayGuiYeuCau) }}</span>
                    </div>
                    <span class="badge" :class="{
                        'bg-warning text-dark': req.trangThai === 'Chờ duyệt',
                        'bg-success': req.trangThai === 'Đã được duyệt',
                        'bg-danger': req.trangThai === 'Đã từ chối'
                    }">
                        {{ req.trangThai }}
                    </span>
                </li>
            </ul>
            <div v-if="!requests.length" class="mt-3 text-center text-secondary">
                Chưa có yêu cầu mượn nào.
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'

export default {
    name: 'BorrowingView',
    data() {
        return {
            requests: [],
            loading: false
        }
    },
    methods: {
        async fetchBorrowings() {
            this.loading = true
            try {
                const { data } = await api.get('/muon')
                this.requests = data
            } catch (err) {
                console.error(err)
                alert('Không tải được dữ liệu mượn sách.')
            } finally {
                this.loading = false
            }
        },
        formatDate(d) {
            return new Date(d).toLocaleDateString('vi-VN', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            })
        }
    },
    created() {
        this.fetchBorrowings()
    }
}
</script>
