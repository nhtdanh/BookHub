<template>
  <div class="reader-layout" style="background-color: var(--color-bg); min-height: 100vh">
    <NavbarComponent />
    <main class="container py-4">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'ReaderLayout',
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>
