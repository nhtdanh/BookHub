<template>
    <div class="sidebar bg-dark text-white p-3">
        <h4 class="text-center mb-4">BookHub</h4>
        <ul class="nav flex-column">
            <li class="nav-item" v-for="item in navItems" :key="item.name">
                <router-link class="nav-link text-white" :to="item.to" active-class="fw-bold">
                    <i :class="item.icon" class="me-2" />
                    {{ item.label }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SidebarComponent',
    data() {
        return {
            navItems: [
                { name: 'Dashboard', label: 'Thống kê', to: '/staff', icon: 'fas fa-chart-bar' },
                { name: 'BookManage', label: 'Quản lý sách', to: '/staff/books', icon: 'fas fa-book' },
                { name: 'CategoryManage', label: 'Quản lý thể loại', to: '/staff/categories', icon: 'fas fa-tags' },
                { name: 'PublisherManage', label: 'Quản lý NXB', to: '/staff/publishers', icon: 'fas fa-industry' },
                { name: 'BorrowManage', label: 'Quản lý mượn', to: '/staff/borrows', icon: 'fas fa-book-reader' }
            ]
        }
    }
}
</script>

<style scoped>
.sidebar {
    width: 240px;
    min-height: 100vh;
}

.nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
