<template>
  <div class="free-shipping-box p-3 mb-4 rounded shadow-sm border">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="status-text fw-bold">
        <i v-if="isFreeShipping" class="bi bi-truck text-success me-2"></i>
        <i v-else class="bi bi-gift text-brand me-2"></i>
        {{ statusMessage }}
      </span>
      <span class="amount-text fw-bold" :class="{ 'text-success': isFreeShipping }">
        {{ isFreeShipping ? '已達標' : `還差 NT. ${remainingAmount}` }}
      </span>
    </div>
    
    <div class="progress" style="height: 10px;">
      <div 
        class="progress-bar progress-bar-striped progress-bar-animated" 
        :class="{ 'bg-success': isFreeShipping, 'bg-brand': !isFreeShipping }"
        role="progressbar" 
        :style="{ width: `${progressPercentage}%` }" 
        :aria-valuenow="progressPercentage" 
        aria-valuemin="0" 
        aria-valuemax="100"
      ></div>
    </div>
    
    <p class="small text-muted mt-2 mb-0">
      <i class="bi bi-info-circle me-1"></i>
      全館消費滿 NT. {{ threshold }} 即可享有免運優惠
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const threshold = 1000 // 免運門檻設定為 1000

const isFreeShipping = computed(() => cartStore.totalAmount >= threshold)

const remainingAmount = computed(() => {
  const diff = threshold - cartStore.totalAmount
  return diff > 0 ? diff : 0
})

const progressPercentage = computed(() => {
  const percentage = (cartStore.totalAmount / threshold) * 100
  return Math.min(percentage, 100)
})

const statusMessage = computed(() => {
  if (isFreeShipping.value) return '恭喜！您已獲得免運優惠'
  return '再買一點點，即可享免運'
})
</script>

<style scoped>
.free-shipping-box {
  background-color: #fff;
  transition: all 0.3s ease;
}

.status-text {
  font-size: 0.95rem;
}

.amount-text {
  font-size: 1.1rem;
}

.bg-brand {
  background-color: var(--brand-color) !important;
}

.text-brand {
  color: var(--brand-color);
}

/* 達標時的發光效果 */
.free-shipping-box:has(.bg-success) {
  border-color: #198754 !important;
  background-color: #f8fffb;
}
</style>
