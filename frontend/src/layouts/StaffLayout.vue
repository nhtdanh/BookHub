<template>
    <div class="staff-layout d-flex">
        <SidebarComponent />

        <div class="main-content flex-grow-1">
            <TopbarComponent />

            <div class="container mt-4">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import SidebarComponent from '@/components/staff/SidebarComponent.vue'
import TopbarComponent from '@/components/staff/TopbarComponent.vue'

export default {
    name: 'StaffLayout',
    components: {
        SidebarComponent,
        TopbarComponent
    }
}
</script>

<style scoped>
.staff-layout {
    min-height: 100vh;
}

.main-content {
    flex-grow: 1;
    overflow-x: hidden;
}
</style>
