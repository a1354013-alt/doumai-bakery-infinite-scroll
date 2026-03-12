<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div 
      class="toast align-items-center text-white bg-brand border-0" 
      :class="{ show: cartStore.showToast }"
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle-fill me-2"></i>
          {{ cartStore.toastMessage }}
        </div>
        <button 
          type="button" 
          class="btn-close btn-close-white me-2 m-auto" 
          @click="cartStore.showToast = false"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
</script>

<style scoped>
.bg-brand {
  background-color: var(--brand-color) !important;
}
.toast {
  transition: opacity 0.3s ease;
  opacity: 0;
  display: block;
  pointer-events: none;
}
.toast.show {
  opacity: 1;
  pointer-events: auto;
}
</style>
