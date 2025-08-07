<template>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="avatarUrl" alt="avatar" width="32" height="32" class="rounded-circle me-2" />
            <strong style="color: var(--color-text-primary)">{{ tenDangNhap }}</strong> 
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li><router-link class="dropdown-item" to="/profile">Thông tin cá nhân</router-link></li>
            <li>
                <hr class="dropdown-divider" />
            </li>
            <li>
                <a class="dropdown-item text-danger" href="#" @click.prevent="signOut">Đăng xuất</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
const backendBaseURL = import.meta.env.VITE_API_URL.replace('/api/v1', '')

export default {
    name: 'UserMenu',
    setup() {
        const userStore = useUserStore()
        const router = useRouter()
        const signOut = () => {
            userStore.$reset()
            document.cookie = 'accessToken=; Max-Age=0' // xóa cookie
            router.push({ name: 'Home' })
        }

        const avatarUrl = computed(() => {
            console.log(userStore.user)
            // return null
            return userStore.user.anhDaiDien
                ? `${backendBaseURL}${userStore.user.anhDaiDien}`
                : '/default.jpg'
        })
        const tenDangNhap = userStore.user.tenDangNhap;
        return {
            user: userStore.user || {},
            signOut,
            avatarUrl,
            tenDangNhap
        }
    }
}
</script>
