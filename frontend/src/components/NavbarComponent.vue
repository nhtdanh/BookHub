<template>
    <nav class="navbar navbar-expand-lg" style="background-color: var(--color-bg-secondary)">
        <div class="container">
            <router-link to="/" class="navbar-brand fw-bold" style="color: var(--color-text-primary)">
                BookHub
            </router-link>
            <div class="d-flex align-items-center">
                <UserMenu v-if="isLoggedIn" />
                <router-link v-else class="btn btn-outline-primary" to="/login">Đăng nhập</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import UserMenu from '@/components/UserMenu.vue'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

export default {
    components: { UserMenu },
    setup() {
        const store = useUserStore()
        const isLoggedIn = computed(() => store.isLoggedIn)
        return { isLoggedIn }
    }
}

</script>
