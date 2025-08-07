<template>
    <div class="container mt-4">
        <h3>Quản lý mượn sách</h3>

        <!-- Filters -->
        <div class="row mb-3 g-3">
            <div class="col-auto">
                <label>Trạng thái:</label>
                <select v-model="filter" class="form-select ms-2">
                    <option value="">Tất cả</option>
                    <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                </select>
            </div>
            <div class="col-auto">
                <label>Từ ngày:</label>
                <input type="date" v-model="startDate" class="form-control ms-2" />
            </div>
            <div class="col-auto">
                <label>Đến ngày:</label>
                <input type="date" v-model="endDate" class="form-control ms-2" />
            </div>
        </div>

        <!-- Table -->
        <table class="table table-sm text-center">
            <thead>
                <tr>
                    <th>Người mượn</th>
                    <th>Ngày yêu cầu</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in filtered" :key="r._id">
                    <td>{{ r.docGia?.hoTen || '—' }}</td>
                    <td>{{ formatDate(r.ngayGuiYeuCau) }}</td>
                    <td>{{ r.trangThai }}</td>
                    <td>
                        <button class="btn btn-info btn-sm me-1" @click="openDetail(r)" data-bs-toggle="modal"
                            data-bs-target="#detailModal">Chi tiết</button>

                        <button v-if="r.trangThai === 'Chờ duyệt'" class="btn btn-success btn-sm me-1"
                            @click="duyet(r._id, true)">Duyệt</button>
                        <button v-if="r.trangThai === 'Chờ duyệt'" class="btn btn-danger btn-sm me-1"
                            @click="duyet(r._id, false)">Từ chối</button>

                        <button v-if="r.trangThai === 'Đã được duyệt'" class="btn btn-secondary btn-sm me-1"
                            @click="updateStatus(r._id, 'Đang mượn')">Bắt đầu mượn</button>
                        <button v-if="r.trangThai === 'Đang mượn'" class="btn btn-secondary btn-sm"
                            @click="updateStatus(r._id, 'Đã trả')">Hoàn trả</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Detail Modal -->
        <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="detailModalLabel">Chi tiết yêu cầu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body" v-if="selected">
                        <p><strong>Người mượn:</strong> {{ selected.docGia.hoTen }}</p>
                        <p><strong>Ngày gửi:</strong> {{ formatDate(selected.ngayGuiYeuCau) }}</p>
                        <p v-if="selected.ngayMuon"><strong>Ngày mượn:</strong> {{ formatDate(selected.ngayMuon) }}</p>
                        <p v-if="selected.ngayHetHan"><strong>Hạn trả:</strong> {{ formatDate(selected.ngayHetHan) }}
                        </p>
                        <p v-if="selected.ngayTra"><strong>Ngày trả:</strong> {{ formatDate(selected.ngayTra) }}</p>
                        <p v-if="selected.tienPhat != null"><strong>Tiền phạt:</strong> {{ selected.tienPhat }} VNĐ</p>
                        <hr />
                        <h6>Sách:</h6>
                        <ul>
                            <li v-for="item in selected.sachs" :key="item.sach._id">
                                {{ item.sach.tenSach }} — Số lượng: {{ item.soLuong }}
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.service'

export default {
    name: 'BorrowManage',
    data() {
        return {
            list: [],
            filter: '',
            statuses: ['Chờ duyệt', 'Đã được duyệt', 'Không được duyệt', 'Đang mượn', 'Đã trả'],
            startDate: '',
            endDate: '',
            selected: null
        }
    },
    computed: {
        filtered() {
            return this.list
                .filter(r => !this.filter || r.trangThai === this.filter)
                .filter(r => !this.startDate || new Date(r.ngayGuiYeuCau) >= new Date(this.startDate))
                .filter(r => !this.endDate || new Date(r.ngayGuiYeuCau) <= new Date(this.endDate))
        }
    },
    created() {
        this.loadRequests()
    },
    methods: {
        async loadRequests() {
            try {
                const res = await api.get('/muon/list/all')
                this.list = Array.isArray(res.data.data) ? res.data.data : Array.isArray(res.data) ? res.data : []
            } catch (err) {
                console.error('Lỗi khi tải danh sách mượn:', err)
                this.list = []
            }
        },
        formatDate(d) {
            return d
                ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                : ''
        },
        openDetail(r) {
            this.selected = r
        },
        async duyet(id, ok) {
            try {
                await api.patch(`/admin/duyet/${id}`, { duyet: ok })
                this.loadRequests()
            } catch (err) {
                console.error('Lỗi khi duyệt:', err)
            }
        },
        async updateStatus(id, status) {
            try {
                await api.patch(`/admin/capNhat/${id}`, { trangThai: status })
                this.loadRequests()
            } catch (err) {
                console.error('Lỗi khi cập nhật trạng thái:', err)
            }
        }
    }
}
</script>

<style scoped>
hr {
    border-top: 1px dashed #ccc;
}
</style>
