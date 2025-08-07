<template>
    <div class="text-center mt-5">
        <h1 class="display-4 text-danger">404 - Không tìm thấy trang</h1>
        <p class="lead text-muted">Trang bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
        <router-link to="/" class="btn btn-primary mt-3">
            <i class="fas fa-home me-1"></i> Quay về trang chủ
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
h1 {
    font-weight: bold;
}
</style>
