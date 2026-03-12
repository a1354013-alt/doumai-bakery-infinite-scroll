<template>
  <div class="app-wrapper">
    <AppNavbar />
    <main class="pt-nav">
      <slot />
    </main>
    <AppFooter />
    <AppToast />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppToast from '@/components/AppToast.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.pt-nav {
  padding-top: 56px; /* Navbar height */
}
</style>
