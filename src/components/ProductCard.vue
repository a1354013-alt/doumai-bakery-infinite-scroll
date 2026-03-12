<template>
  <div class="product-card h-100">
    <div class="product-img-wrapper">
      <span v-if="product.badge" class="product-badge">{{ product.badge }}</span>
      <img :src="product.image || product.img" :alt="product.title" loading="lazy" />
    </div>

    <div class="card-body">
      <h5 class="product-title">{{ product.title }}</h5>
      <div class="product-price">NT. {{ product.price }}</div>

      <button v-if="showAddCart" class="btn btn-add-cart" type="button" @click="$emit('add-to-cart', product)">
        <i class="bi bi-cart-plus me-2"></i>加入購物車
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  },
  showAddCart: {
    type: Boolean,
    default: false
  }
})

defineEmits(['add-to-cart'])
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.product-img-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.product-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-img-wrapper img {
  transform: scale(1.1);
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--brand-color, #cf2e5a);
  color: white;
  padding: 4px 12px;
  font-size: 0.75rem;
  border-radius: 20px;
  z-index: 1;
}

.card-body {
  padding: 1.25rem;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.product-price {
  color: var(--brand-color, #cf2e5a);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.btn-add-cart {
  width: 100%;
  background-color: transparent;
  border: 1px solid var(--brand-color, #cf2e5a);
  color: var(--brand-color, #cf2e5a);
  border-radius: 4px;
  padding: 8px;
  transition: all 0.3s;
}

.btn-add-cart:hover {
  background-color: var(--brand-color, #cf2e5a);
  color: white;
}
</style>
