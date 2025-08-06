<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h2 class="mb-4">Đăng ký tài khoản</h2>
            <form @submit.prevent="register">
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Họ và tên</label>
                        <input v-model="form.hoTen" type="text" class="form-control" required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Email</label>
                        <input v-model="form.email" type="email" class="form-control" required />
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Mật khẩu</label>
                        <input v-model="form.matKhau" type="password" class="form-control" required />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Ngày sinh</label>
                        <input v-model="form.ngaySinh" type="date" class="form-control" required />
                    </div>
                </div>
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <label class="form-label">SĐT</label>
                        <input v-model="form.soDienThoai" type="text" class="form-control" />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label">Giới tính</label>
                        <select v-model="form.gioiTinh" class="form-select">
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Địa chỉ</label>
                    <input v-model="form.diaChi" type="text" class="form-control" />
                </div>
                <button type="submit" class="btn w-100" style="background-color: var(--color-btn)">
                    Đăng ký
                </button>
                <p class="mt-3 text-center">
                    Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
    name: 'RegisterView',
    data() {
        return {
            form: {
                hoTen: '',
                email: '',
                matKhau: '',
                ngaySinh: '',
                gioiTinh: 'Nam',
                diaChi: '',
                soDienThoai: ''
            }
        }
    },
    methods: {
        async register() {
            try {
                await AuthService.register(this.form)
                alert('Đăng ký thành công. Vui lòng đăng nhập!')
                this.$router.push({ name: 'Login' })
            } catch (err) {
                alert('Lỗi đăng ký: ' + (err.response?.data?.message || 'Không xác định'))
            }
        }
    }
}
</script>
