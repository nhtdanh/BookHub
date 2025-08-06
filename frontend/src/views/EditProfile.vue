<template>
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <h2 class="mb-4">Chỉnh sửa thông tin</h2>
            <form @submit.prevent="submit">
                <div class="mb-3">
                    <label class="form-label">Họ và tên</label>
                    <input v-model="form.hoTen" type="text" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Ngày sinh</label>
                    <input v-model="form.ngaySinh" type="date" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Giới tính</label>
                    <select v-model="form.gioiTinh" class="form-select">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Địa chỉ</label>
                    <input v-model="form.diaChi" type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Số điện thoại</label>
                    <input v-model="form.soDienThoai" type="tel" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input v-model="form.email" type="email" class="form-control" required />
                </div>
                <button type="submit" class="btn" style="background-color: var(--color-btn)">
                    Lưu thay đổi
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'

export default {
    name: 'EditProfile',
    data() {
        return {
            form: {
                hoTen: '',
                ngaySinh: '',
                gioiTinh: 'Nam',
                diaChi: '',
                soDienThoai: '',
                email: ''
            }
        }
    },
    async created() {
        try {
            const { data } = await api.get('/docgia/me')
            this.form = {
                hoTen: data.hoTen,
                ngaySinh: data.ngaySinh.split('T')[0],
                gioiTinh: data.gioiTinh,
                diaChi: data.diaChi,
                soDienThoai: data.soDienThoai,
                email: data.email
            }
        } catch (err) {
            alert('Không tải được thông tin cá nhân')
            console.error(err)
        }
    },
    methods: {
        async submit() {
            try {
                await api.patch('/docgia/me', this.form)
                alert('Cập nhật thành công')
                this.$router.push({ name: 'Profile' })
            } catch (err) {
                alert('Lỗi khi cập nhật')
                console.error(err)
            }
        }
    }
}
</script>
