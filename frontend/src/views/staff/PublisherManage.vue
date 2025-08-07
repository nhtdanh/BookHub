<template>
    <div>
        <h3>Quản lý Nhà xuất bản</h3>
        <button class="btn btn-primary mb-3" @click="openForm()">Thêm NXB</button>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Tên NXB</th>

                    <th>Điện thoại</th>
                    <!-- <th>Email</th> -->
                    <th>Website</th>
                    <th>Năm thành lập</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in list" :key="p._id">
                    <td>{{ p.tenNhaXuatBan }}</td>

                    <td>{{ p.soDienThoai }}</td>
                    <td>
                        <a :href="p.website" target="_blank">{{ p.website }}</a>
                    </td>
                    <td class="text-center">{{ p.namThanhLap }}</td>
                    <!-- <td>{{ p.email }}</td> -->

                   
                    <td>
                        <button class="btn btn-sm btn-warning me-1" @click="openForm(p)">
                            Sửa
                        </button>
                        <button class="btn btn-sm btn-danger" @click="remove(p._id)">
                            Xóa
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal Form -->
        <div class="modal fade" id="publisherModal" tabindex="-1" aria-labelledby="publisherModalLabel"
            aria-hidden="true" ref="publisherModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="publisherModalLabel">
                            {{ editing._id ? 'Sửa Nhà xuất bản' : 'Thêm Nhà xuất bản' }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="save">
                            <div class="mb-3">
                                <label class="form-label">Tên NXB *</label>
                                <input v-model="editing.tenNhaXuatBan" type="text" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Số điện thoại</label>
                                <input v-model="editing.soDienThoai" type="tel" class="form-control"
                                    pattern="^[0-9]{10,11}$" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email *</label>
                                <input v-model="editing.email" type="email" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Năm thành lập</label>
                                <input v-model.number="editing.namThanhLap" type="number" class="form-control"
                                    min="1900" :max="new Date().getFullYear()" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Website</label>
                                <input v-model="editing.website" type="url" class="form-control"
                                    placeholder="https://example.com" />
                            </div>
                            <div class="text-end">
                                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">
                                    Hủy
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { nextTick } from 'vue'
import * as bootstrap from 'bootstrap'
import api from '@/services/api.service'

export default {
    name: 'PublisherManage',
    data() {
        return {
            list: [],
            editing: {
                _id: null,
                tenNhaXuatBan: '',
                soDienThoai: '',
                email: '',
                namThanhLap: null,
                website: ''
            }
        }
    },
    async created() {
        await this.fetchList()
    },
    methods: {
        async fetchList() {
            try {
                const res = await api.get('/nhaxuatban')
                this.list = res.data.data
            } catch (err) {
                console.error('Lỗi tải NXB:', err)
                this.list = []
            }
        },
        async openForm(p = null) {
            if (p) {
                this.editing = { ...p }
            } else {
                Object.assign(this.editing, {
                    _id: null,
                    tenNhaXuatBan: '',
                    soDienThoai: '',
                    email: '',
                    namThanhLap: null,
                    website: ''
                })
            }
            await nextTick()
            new bootstrap.Modal(this.$refs.publisherModal).show()
        },
        async save() {
            try {
                if (this.editing._id) {
                    await api.patch(`/nhaxuatban/${this.editing._id}`, this.editing)
                } else {
                    await api.post('/nhaxuatban', this.editing)
                }
                await this.fetchList()
                bootstrap.Modal.getInstance(this.$refs.publisherModal).hide()
            } catch (err) {
                console.error('Lỗi lưu NXB:', err)
                alert('Không lưu được. Kiểm tra lại dữ liệu.')
            }
        },
        async remove(id) {
            if (!confirm('Xác nhận xóa Nhà xuất bản?')) return
            try {
                await api.delete(`/nhaxuatban/${id}`)
                await this.fetchList()
            } catch (err) {
                console.error('Lỗi xóa NXB:', err)
                alert('Xóa không thành công.')
            }
        }
    }
}
</script>

<style scoped>
/* Nếu modal form quá dài, có thể scroll */
.modal-body {
    max-height: 70vh;
    overflow-y: auto;
}
</style>
