<template>
    <div class="container mt-4">
        <!-- Tiêu đề và lọc trạng thái -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>Theo dõi mượn sách</h1>
            <select class="form-select w-auto" v-model="selectedStatus">
                <option value="">Tất cả trạng thái</option>
                <option v-for="status in statusOptions" :key="status" :value="status">
                    {{ status }}
                </option>
            </select>
        </div>

        <!-- Hiển thị loading -->
        <div v-if="loading" class="text-center">
            <span class="spinner-border" role="status"></span>
        </div>

        <!-- Danh sách yêu cầu -->
        <div v-else>
            <ul class="list-group">
                <li v-for="req in filteredRequests" :key="req._id" class="list-group-item"
                    style="background-color: var(--color-bg-secondary); border-color: var(--color-border)">
                    <!-- Phần tiêu đề yêu cầu -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span>Ngày gửi yêu cầu: <strong>{{ formatDate(req.ngayGuiYeuCau) }}</strong></span>
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="badge me-3" :class="badgeClass(req.trangThai)">
                                {{ req.trangThai }}
                            </span>
                            <button class="btn btn-sm" @click="toggleExpand(req._id)">
                                <i :class="isExpanded(req._id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Phần mở rộng chi tiết -->
                    <div v-if="isExpanded(req._id)" class="mt-3 ps-3">
                        <div v-if="req.ngayMuon" class="mb-2">
                            <strong>Ngày mượn:</strong> {{ formatDate(req.ngayMuon) }}
                        </div>
                        <div v-if="req.ngayHetHan" class="mb-2">
                            <strong>Hạn trả:</strong> {{ formatDate(req.ngayHetHan) }}
                        </div>
                        <div v-if="req.ngayTra" class="mb-2">
                            <strong>Ngày trả:</strong> {{ formatDate(req.ngayTra) }}
                        </div>
                        <div v-if="req.tienPhat" class="mb-2">
                            <strong>Tiền phạt:</strong> {{ formatDate(req.tienPhat) }}
                        </div>

                        <hr class="my-2" />

                        <div v-for="(item, idx) in req.sachs" :key="idx" class="mb-3">
                            <div><strong>Tên sách:</strong> {{ item.sach?.tenSach || 'Không rõ' }}</div>
                            <div v-if="item.sach?.tacGia"><strong>Tác giả:</strong> {{ item.sach.tacGia }}</div>
                            <div><strong>Số lượng:</strong> {{ item.soLuong }}</div>
                            <hr class="my-2" />
                        </div>
                    </div>
                </li>
            </ul>

            <!-- Khi không có kết quả -->
            <div v-if="!filteredRequests.length" class="mt-3 text-center text-secondary">
                Không có yêu cầu mượn phù hợp.
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.service'

export default {
    name: 'BorrowingView',
    data() {
        return {
            requests: [],
            loading: false,
            selectedStatus: '',
            expandedItems: [],
            statusOptions: [
                'Chờ duyệt',
                'Đã được duyệt',
                'Không được duyệt',
                'Đang mượn',
                'Đã trả'
            ]
        }
    },
    computed: {
        filteredRequests() {
            if (!this.selectedStatus) return this.requests
            return this.requests.filter(r => r.trangThai === this.selectedStatus)
        }
    },
    methods: {
        async fetchBorrowings() {
            this.loading = true
            try {
                const { data } = await api.get('/muon')
                this.requests = data.data || []
            } catch (err) {
                console.error(err)
                alert('Không tải được dữ liệu mượn sách.')
            } finally {
                this.loading = false
            }
        },
        formatDate(date) {
            if (!date) return '—'
            return new Date(date).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        },
        badgeClass(status) {
            return {
                'bg-warning text-dark': status === 'Chờ duyệt',
                'bg-success': status === 'Đã được duyệt' || status === 'Đang mượn',
                'bg-info text-dark': status === 'Đã trả',
                'bg-danger': status === 'Không được duyệt'
            }
        },
        toggleExpand(id) {
            const index = this.expandedItems.indexOf(id)
            if (index === -1) this.expandedItems.push(id)
            else this.expandedItems.splice(index, 1)
        },
        isExpanded(id) {
            return this.expandedItems.includes(id)
        }
    },
    created() {
        this.fetchBorrowings()
    }
}
</script>

<style scoped>
hr {
    border-top: 1px dashed var(--color-border);
}
</style>
