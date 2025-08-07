<template>
    <div>
        <h3>Quản lý Sách</h3>
        <button class="btn btn-primary mb-3" @click="openForm()">Thêm sách</button>

        <table class="table table-striped ">
            <thead>
                <tr>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>  
                     <th>Đơn giá</th>
                    <th>Số lượng tồn</th>
                    <!-- <th>Thể loại</th> -->
                 
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in list" :key="book._id">
                    <td>{{ book.tenSach }}</td>
                    <td>{{ book.tacGia }}</td>  
                    <td>{{ book.donGia }} VNĐ</td>
                    <td>{{ book.soLuongTon }}</td>
              
                    <td>
                        <button class="btn btn-sm btn-warning me-1" @click="openForm(book)">Sửa</button>
                        <button class="btn btn-sm btn-danger" @click="remove(book._id)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Form Add/Edit (simplest: inline) -->
        <div v-if="editing" class="card p-3 mb-3">
            <h5>{{ editing._id ? 'Sửa sách' : 'Thêm sách' }}</h5>
            <div class="row g-2">
                <div class="col-md-6">
                    <input v-model="editing.tenSach" class="form-control" placeholder="Tiêu đề" />
                </div>
                <div class="col-md-6">
                    <input v-model="editing.tacGia" class="form-control" placeholder="Tác giả" />
                </div>
                <div class="col-md-4">
                    <select v-model="editing.nhaXuatBan" class="form-select">
                        <option v-for="pb in publishers" :key="pb._id">{{ pb.tenNhaXuatBan }}</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <select v-model="editing.theLoais" class="form-select" multiple>
                        <option v-for="cat in categories" :key="cat._id">{{ cat.tenTheLoai }}</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <input v-model.number="editing.donGia" type="number" class="form-control" placeholder="Đơn giá" />
                </div>
            </div>
            <div class="mt-2">
                <button class="btn btn-success me-2" @click="save()">Lưu</button>
                <button class="btn btn-secondary" @click="cancel()">Hủy</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.service'
export default {
    data() {
        return {
            list: [],
            publishers: [],
            categories: [],
            editing: null
        }
    },
    async created() {
        await Promise.all([this.fetchList(), this.fetchRefs()])
    },
    methods: {
        async fetchList() {
            const { data } = await api.get('/sach')
            this.list = data.data.items || data.data
        },
        async fetchRefs() {
            const [pb, cat] = await Promise.all([
                api.get('/nhaxuatban'),
                api.get('/theloai')
            ])
            this.publishers = pb.data.data
            this.categories = cat.data.data
        },
        openForm(book = null) {
            this.editing = book
                ? { ...book, nhaXuatBan: book.nhaXuatBan._id, theLoais: book.theLoais.map(t => t._id) }
                : { tenSach: '', tacGia: '', nhaXuatBan: '', theLoais: [], donGia: 0 }
        },
        cancel() {
            this.editing = null
        },
        async save() {
            try {
                if (this.editing._id) {
                    await api.patch(`/sach/${this.editing._id}`, this.editing)
                } else {
                    await api.post('/sach', this.editing)
                }
                await this.fetchList()
                this.cancel()
            } catch (e) {
                alert('Lỗi khi lưu sách')
                console.log(e)
            }
        },
        async remove(id) {
            if (!confirm('Xác nhận xóa?')) return
            await api.delete(`/sach/${id}`)
            this.fetchList()
        }
    }
}
</script>
