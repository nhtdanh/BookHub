<template>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="userDropdown"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="user.avatar || '/public/default-avatar.png'" alt="avatar" width="32" height="32"
                class="rounded-circle me-2" />
            <strong style="color: var(--color-text-primary)">{{ user.hoTen }}</strong>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li><router-link class="dropdown-item" to="/profile">Thông tin cá nhân</router-link></li>
            <li><router-link class="dropdown-item" to="/profile/edit">Chỉnh sửa thông tin</router-link></li>
            <li><router-link class="dropdown-item" to="/profile/avatar">Cập nhật ảnh đại diện</router-link></li>
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
export default {
    name: 'UserMenu',
    setup() {
        const userStore = useUserStore()
        const router = useRouter()

        const signOut = () => {
            userStore.$reset()
            document.cookie = 'accessToken=; Max-Age=0' // xóa cookie thủ công
            router.push({ name: 'Login' })
        }

        return {
            user: userStore.user || {},
            signOut
        }
    }
}
</script>
