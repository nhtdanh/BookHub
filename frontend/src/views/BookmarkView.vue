<template>
    <div>
        <h1 class="mb-4">Sách đã đánh dấu</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Ảnh</th>
                    <th>Tên sách</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.sach._id">
                    <td><img :src="item.sach.anhBia[0]" width="50" /></td>
                    <td>{{ item.sach.tenSach }}</td>
                    <td>
                        <input type="number" v-model.number="item.soLuong" @change="updateQty(item)"
                            class="form-control form-control-sm" />
                    </td>
                    <td>
                        <button @click="remove(item.sach._id)" class="btn btn-sm btn-outline-danger me-2">
                            Xóa
                        </button>
                        <button @click="requestBorrow(item)" class="btn btn-sm btn-primary">
                            Mượn
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from '@/services/api'

export default {
    name: 'BookmarkView',
    data() {
        return { list: [] }
    },
    async created() {
        const res = await api.get('/danhdau')
        this.list = res.data.sachs
    },
    methods: {
        async updateQty(item) {
            await api.patch(`/danhdau/${item.sach._id}`, { soLuong: item.soLuong })
            alert('Cập nhật số lượng thành công')
        },
        async remove(id) {
            await api.delete(`/danhdau/${id}`)
            this.list = this.list.filter(i => i.sach._id !== id)
        },
        async requestBorrow(item) {
            await api.post('/muon', {
                sachs: [{ sach: item.sach._id, soLuong: item.soLuong }]
            })
            alert(`Đã gửi yêu cầu mượn ${item.soLuong} cuốn`)
        }
    }
}
</script>
