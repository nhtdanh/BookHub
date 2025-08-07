<template>
    <div>
        <h3>Quản lý Thể loại</h3>
        <button class="btn btn-primary mb-3" @click="openForm()">Thêm thể loại</button>

        <table class="table">
            <thead>
                <tr>
                    <th>Tên thể loại</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="c in list" :key="c._id">
                    <td>{{ c.tenTheLoai }}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-1" @click="openForm(c)">Sửa</button>
                        <button class="btn btn-sm btn-danger" @click="remove(c._id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="editing" class="card p-3 mb-3">
            <input v-model="editing.tenTheLoai" class="form-control mb-2" placeholder="Tên thể loại" />
            <button class="btn btn-success me-2" @click="save()">Lưu</button>
            <button class="btn btn-secondary" @click="cancel()">Hủy</button>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.service'
export default {
    data() { return { list: [], editing: null } },
    created() { this.fetch() },
    methods: {
        async fetch() {
            const { data } = await api.get('/theloai')
            this.list = data.data
        },
        openForm(c = null) { this.editing = c ? { ...c } : { tenTheLoai: '' } },
        cancel() { this.editing = null },
        async save() {
            if (this.editing._id) await api.patch(`/theloai/${this.editing._id}`, this.editing)
            else await api.post('/theloai', this.editing)
            this.fetch(); this.cancel()
        },
        async remove(id) {
            if (!confirm('Xóa?')) return
            await api.delete(`/theloai/${id}`)
            this.fetch()
        }
    }
}
</script>
