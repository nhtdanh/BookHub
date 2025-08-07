<template>
    <nav class="navbar navbar-expand-lg" style="background-color: var(--color-bg-secondary)">
        <div class="container">
            <!-- Brand + Links -->
            <div class="d-flex align-items-center gap-4">

                <router-link to="/" class="navbar-brand fw-bold" style="color: var(--color-text-primary)">
                    BookHub
                </router-link>
                <SearchBar />
                <router-link to="/books" class="nav-link" style="color: var(--color-text-primary)">
                    Sách
                </router-link>
                <router-link to="/bookmarks" class="nav-link" style="color: var(--color-text-primary)">
                    Mượn sách
                </router-link>
                <router-link to="/borrowings" class="nav-link" style="color: var(--color-text-primary)">
                    Theo dõi
                </router-link>

            </div>

            <!-- User Section -->
            <div class="d-flex align-items-center">
                <UserMenu v-if="isLoggedIn" />
                <router-link v-else class="btn btn-outline-primary" to="/login">Đăng nhập</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import UserMenu from './UserMenu.vue'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

export default {
    components: { SearchBar, UserMenu },
    setup() {
        const store = useUserStore()
        const isLoggedIn = computed(() => store.isLoggedIn)
        return { isLoggedIn }
    }
}
</script>

<style scoped>
.navbar .nav-link {
    margin-left: 1rem;
    font-weight: 500;
}
</style>
