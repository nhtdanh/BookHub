<template>
    <div class="container mt-4">
        <h1 class="mb-4">Sách đã đánh dấu</h1>

        <!-- Bảng sách -->
        <table v-if="list.length > 0" class="table table-bordered align-middle text-center">
            <thead class="table-light">
                <tr>
                    <th>Ảnh bìa</th>
                    <th>Tên sách</th>
                    <th>Tác giả</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.sach._id">
                    <td>
                        <img :src="getCoverUrl(item.sach)" width="50" height="70" style="object-fit: cover"
                            alt="cover" />
                    </td>
                    <td>{{ item.sach.tenSach }}</td>
                    <td>{{ item.sach.tacGia }}</td>
                    <td>
                        <input style="width: 60px; margin: 0 auto" type="number" v-model.number="item.soLuong"
                            @change="updateQty(item)" class="form-control form-control-sm text-center" min="1"
                            :max="getBookMax(item.sach)" />
                    </td>
                    <td>
                        <button @click="remove(item.sach._id)" class="btn btn-sm btn-outline-danger">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Nếu không có sách -->
        <div v-else class="alert alert-info text-center">
            Bạn chưa đánh dấu quyển sách nào.
        </div>

        <!-- Nút -->
        <div v-if="list.length > 0" class="d-flex justify-content-end mt-4 gap-3">
            <button class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#policyModal">
                <i class="fas fa-info-circle me-1"></i> Chính sách
            </button>
            <button @click="requestBorrowAll" class="btn btn-outline-secondary">
                <i class="fas fa-book-reader me-1"></i> Gửi yêu cầu mượn
            </button>
        </div>

        <!-- Modal chính sách -->
        <div class="modal fade" id="policyModal" tabindex="-1" aria-labelledby="policyModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="policyModalLabel">Chính sách mượn sách</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Đóng"></button>
                    </div>
                    <div class="modal-body">
                        • Mọi yêu cầu mượn sách đều phải chờ duyệt từ nhân viên. <br />
                        • Mượn được tối đa <strong>5 quyển sách</strong> tại một thời điểm. <br />
                        • Hạn trả sách là <strong>2 tháng</strong> kể từ ngày mượn. <br />
                        • Phạt <strong>2.000đ/ngày</strong> nếu trả trễ hạn.
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
const backendBaseURL = import.meta.env.VITE_API_URL.replace('/api/v1', '')

export default {
    name: 'BookmarkView',
    data() {
        return {
            list: [],
            borrowedCount: 0
        }
    },
    async created() {
        const res = await api.get('/danhdau')
        this.list = res.data.data.sachs

        const muonRes = await api.get('/muon')
        const active = muonRes.data.data.filter(r => r.trangThai !== 'Đã trả')
        this.borrowedCount = active.reduce((sum, req) => {
            return sum + req.sachs.reduce((s, b) => s + b.soLuong, 0)
        }, 0)
    },
    methods: {
        getCoverUrl(book) {
            return book.anhBia?.[0] ? `${backendBaseURL}${book.anhBia[0]}` : '/default-cover.jpg'
        },
        getBookMax(book) {
            return Math.min(3, book.soLuongTon || 0)
        },
        async updateQty(item) {
            const maxPerBook = this.getBookMax(item.sach)

            if (item.soLuong < 1) {
                item.soLuong = 1
                return
            }

            if (item.soLuong > maxPerBook) {
                if (item.sach.soLuongTon < 3) {
                    alert(`Số lượng tồn kho không đủ. Bạn chỉ có thể mượn tối đa ${item.sach.soLuongTon} quyển.`)
                } else {
                    alert('Bạn chỉ được mượn tối đa 3 quyển cho mỗi đầu sách.')
                }
                item.soLuong = maxPerBook
                return
            }

            const currentTotal = this.list.reduce((sum, i) => sum + i.soLuong, 0)

            if (currentTotal > 5) {
                alert('Bạn chỉ được mượn tối đa 5 quyển mỗi lần.')
                item.soLuong = 1
                return
            }

            const totalAtOnce = this.borrowedCount + currentTotal
            if (totalAtOnce > 5) {
                const maxAllowed = 5 - this.borrowedCount
                alert(`Bạn đang có ${this.borrowedCount} quyển chưa trả. Bạn chỉ được mượn thêm tối đa ${maxAllowed} quyển.`)
                item.soLuong = Math.min(maxAllowed, maxPerBook)
                return
            }

            await api.patch(`/danhdau/${item.sach._id}`, { soLuong: item.soLuong })
            alert('Cập nhật số lượng thành công')
        },
        async remove(id) {
            await api.delete(`/danhdau/${id}`)
            this.list = this.list.filter(i => i.sach._id !== id)
        },
        async requestBorrowAll() {
            const totalBooks = this.list.reduce((sum, i) => sum + i.soLuong, 0)

            if (totalBooks > 5) {
                alert('Bạn chỉ được mượn tối đa 5 quyển mỗi lần.')
                return
            }

            const totalAtOnce = totalBooks + this.borrowedCount
            if (totalAtOnce > 5) {
                const maxAllowed = 5 - this.borrowedCount
                alert(`Bạn đang có ${this.borrowedCount} quyển chưa trả. Bạn chỉ được mượn thêm tối đa ${maxAllowed} quyển.`)
                return
            }

            const payload = {
                sachs: this.list.map(item => ({
                    sach: item.sach._id,
                    soLuong: item.soLuong
                }))
            }

            try {
                await api.post('/muon', payload)
                alert(`Yêu cầu mượn ${totalBooks} cuốn đã được gửi thành công.`)
                this.list = []
            } catch (err) {
                console.error('Lỗi gửi yêu cầu mượn:', err)
                alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.')
            }
        }
    }
}
</script>

<style scoped>
.table td,
.table th {
    vertical-align: middle;
}
</style>
