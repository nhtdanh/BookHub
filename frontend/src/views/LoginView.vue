<template>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm rounded-3">
                <div class="card-body p-4">
                    <h2 class="text-center mb-4">Đăng nhập</h2>

                    <!-- Server error alert -->
                    <div v-if="serverError" class="alert alert-danger">
                        <i class="fas fa-exclamation-circle me-1"></i>
                        {{ serverError }}
                    </div>

                    <form @submit.prevent="login">
                        <!-- Username -->
                        <div class="mb-3">
                            <label class="form-label">Tên đăng nhập</label>
                            <input v-model.trim="form.tenDangNhap" type="text" class="form-control"
                                :class="{ 'is-invalid': errors.tenDangNhap }" required />
                            <div v-if="errors.tenDangNhap" class="invalid-feedback">
                                {{ errors.tenDangNhap }}
                            </div>
                        </div>

                        <!-- Password -->
                        <div class="mb-3">
                            <label class="form-label">Mật khẩu</label>
                            <input v-model="form.matKhau" type="password" class="form-control"
                                :class="{ 'is-invalid': errors.matKhau }" required />
                            <div v-if="errors.matKhau" class="invalid-feedback">
                                {{ errors.matKhau }}
                            </div>
                        </div>

                        <!-- Buttons -->
                        <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="loading">
                            <i v-if="loading" class="fas fa-spinner fa-spin me-2"></i>
                            {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
                        </button>

                        <p class="text-center mb-2">
                            Quay về
                            <router-link to="/" class="text-decoration-none">
                                Trang chủ
                            </router-link>
                        </p>
                        <p class="text-center mb-0">
                            Chưa có tài khoản?
                            <router-link to="/register" class="text-decoration-none">
                                Đăng ký ngay
                            </router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
    name: 'LoginView',
    data() {
        return {
            form: { tenDangNhap: '', matKhau: '' },
            errors: {},
            serverError: '',
            loading: false
        }
    },
    methods: {
        validate() {
            this.errors = {}

            // tenDangNhap: 3–20 ký tự, [a-zA-Z0-9_]
            const u = this.form.tenDangNhap
            if (!u) this.errors.tenDangNhap = 'Vui lòng nhập tên đăng nhập'
            else if (u.length < 3 || u.length > 20)
                this.errors.tenDangNhap = 'Tên đăng nhập phải từ 3–20 ký tự'
            else if (!/^[a-zA-Z0-9_]+$/.test(u))
                this.errors.tenDangNhap = 'Chỉ được dùng chữ, số và dấu gạch dưới'

            // matKhau: ≥6 ký tự
            const p = this.form.matKhau
            if (!p) this.errors.matKhau = 'Vui lòng nhập mật khẩu'
            else if (p.length < 6)
                this.errors.matKhau = 'Mật khẩu phải có ít nhất 6 ký tự'

            return Object.keys(this.errors).length === 0
        },

        async login() {
            this.serverError = ''
            if (!this.validate()) return

            this.loading = true
            try {
                await AuthService.login({
                    tenDangNhap: this.form.tenDangNhap,
                    matKhau: this.form.matKhau
                })
                this.$router.push({ name: 'Home' })
            } catch (err) {
                // Lấy thông điệp từ server
                const msg = err.response?.data?.msg
                this.serverError =
                    msg === 'Resource Not Found'
                        ? 'Tên đăng nhập hoặc mật khẩu không đúng'
                        : msg || 'Đăng nhập thất bại. Vui lòng thử lại.'
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
.card {
    border: none;
}

.btn-primary {
    background-color: var(--color-btn);
    border-color: var(--color-btn);
}

.btn-primary:disabled {
    opacity: 0.7;
}
</style>
