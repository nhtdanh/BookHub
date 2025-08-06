<template>
    <div class="row">
        <div class="col-md-4 text-center">
            <img :src="profile.avatar || '/public/default-avatar.png'" class="rounded-circle mb-3" width="150"
                height="150" alt="avatar" />
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
</template>

<script>
import api from '@/services/api'

export default {
    name: 'ProfileView',
    data() {
        return {
            profile: {}
        }
    },
    methods: {
        async fetchProfile() {
            const { data } = await api.get('/docgia/me')
            this.profile = data
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
