<template>
    <div class="d-flex justify-content-center">
        <div class="container mt-5 mb-5">
            <div class="row justify-content-center">
                <div class="col-md-4 text-center">
                    <img :src="avatarUrl" class="rounded-circle mb-3" width="200" height="200" alt="avatar" />
                    <router-link to="/profile/avatar" class="btn btn-sm" style="background-color: var(--color-btn)">
                        Thay đổi ảnh
                    </router-link>
                </div>
                <div class="col-md-8">
                    <h2>{{ profile.hoTen }}</h2>
                    <p><strong>Ngày sinh:</strong> {{ formatDate(profile.ngaySinh) }}</p>
                    <p><strong>Giới tính:</strong> {{ profile.gioiTinh }}</p>
                    <p><strong>Địa chỉ:</strong> {{ profile.diaChi }}</p>
                    <p><strong>SĐT:</strong> {{ profile.soDienThoai }}</p>
                    <p><strong>Email:</strong> {{ profile.email }}</p>
                    <router-link to="/profile/edit" class="btn mt-3" style="background-color: var(--color-btn)">
                        Chỉnh sửa thông tin
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import api from '@/services/api.service'

const backendBaseURL = import.meta.env.VITE_API_URL.replace('/api/v1', '')

export default {
    name: 'ProfileView',
    data() {
        return {
            profile: {}
        }
    },
    computed: {
        avatarUrl() {
            return this.profile.anhDaiDien
                ? `${backendBaseURL}${this.profile.anhDaiDien}`
                : '/default.jpg'
        }
    },
    methods: {
        async fetchProfile() {
            const { data } = await api.get('/docgia/me')
            this.profile = data.data
            console.log(this.profile)
        },
        formatDate(d) {
            return new Date(d).toLocaleDateString('vi-VN', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            })
        }
    },
    created() {
        this.fetchProfile()
    }
}
</script>