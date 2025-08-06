<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h2 class="mb-4">Đăng nhập</h2>
            <form @submit.prevent="login">
                <div class="mb-3">
                    <label class="form-label">Tên đăng nhập</label>
                    <input v-model="form.tenDangNhap" type="text" class="form-control" required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Mật khẩu</label>
                    <input v-model="form.matKhau" type="password" class="form-control" required />
                </div>
                <button type="submit" class="btn w-100" style="background-color: var(--color-btn)">
                    Đăng nhập
                </button>
                <p class="mt-3 text-center">
                    Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/auth.service'
//import { useRouter } from 'vue-router'

export default {
    name: 'LoginView',
    data() {
        return {
            form: { tenDangNhap: '', matKhau: '' }
        }
    },
    methods: {
        async login() {
            try {
                await AuthService.login({
                    tenDangNhap: this.form.tenDangNhap,
                    matKhau: this.form.matKhau
                })
                alert('Đăng nhập thành công!')
                this.$router.push({ name: 'Home' })
            } catch (err) {
                alert('Đăng nhập thất bại: ' + (err.response?.data?.message || 'Lỗi không xác định'))
            }
        }
    }
}
</script>
