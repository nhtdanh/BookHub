<template>
    <div class="topbar bg-light py-2 px-3 d-flex justify-content-between align-items-center shadow-sm">
        <span>Xin chào, {{ userStore.user.hoTen || 'Nhân viên' }}</span>
        <button class="btn btn-outline-secondary btn-sm" @click="logout">
            <i class="fas fa-sign-out-alt me-1"></i> Đăng xuất
        </button>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import Cookies from 'vue-cookies'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
    Cookies.remove('accessToken')
    //userStore.logout()
    router.push({ name: 'Login' })
}
</script>
