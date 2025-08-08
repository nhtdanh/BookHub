<template>
  <div class="layout">
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    showFooter() {
      // Danh sách route KHÔNG muốn hiển thị footer
      const hiddenRoutes = ['/login', '/register'];
      return !hiddenRoutes.includes(this.$route.path);
    }
  }
};
</script>
