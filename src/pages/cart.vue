<template>
  <div class="cart-page">
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">購物車</h1>
    </header>

    <AppBreadcrumb :items="[{ name: '購物車', path: '/cart' }]" />

    <section class="container py-5">
      <div v-if="cartStore.items.length > 0" class="row g-4">
        <!-- 購物車清單 -->
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm overflow-hidden">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                  <tr>
                    <th class="ps-4 py-3">商品資訊</th>
                    <th class="text-center py-3">單價</th>
                    <th class="text-center py-3">數量</th>
                    <th class="text-end py-3 pe-4">小計</th>
                    <th class="py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartStore.items" :key="item.id">
                    <td class="ps-4 py-4">
                      <div class="d-flex align-items-center">
                        <img :src="item.image" :alt="item.title" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;">
                        <h6 class="mb-0 fw-bold">{{ item.title }}</h6>
                      </div>
                    </td>
                    <td class="text-center">NT. {{ item.price }}</td>
                    <td class="text-center">
                      <div class="input-group input-group-sm mx-auto" style="width: 100px;">
                        <button class="btn btn-outline-secondary" type="button" @click="cartStore.updateQuantity(item.id, item.quantity - 1)">-</button>
                        <input type="text" class="form-control text-center" :value="item.quantity" readonly>
                        <button class="btn btn-outline-secondary" type="button" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                      </div>
                    </td>
                    <td class="text-end pe-4 fw-bold text-brand">NT. {{ item.price * item.quantity }}</td>
                    <td class="text-center">
                      <button class="btn btn-link text-muted p-0" @click="cartStore.removeFromCart(item.id)">
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 訂單摘要 -->
        <div class="col-lg-4">
          <!-- UX 巧思：免運進度條 -->
          <FreeShippingProgress />
          
          <div class="card border-0 shadow-sm p-4">
            <h5 class="fw-bold mb-4">訂單摘要</h5>
            <div class="d-flex justify-content-between mb-3">
              <span>商品小計</span>
              <span>NT. {{ cartStore.totalAmount }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>運費</span>
              <span v-if="cartStore.totalAmount >= 1000" class="text-success">免運費</span>
              <span v-else>NT. 100</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-4">
              <span class="h5 fw-bold">總計</span>
              <span class="h5 fw-bold text-brand">NT. {{ cartStore.totalAmount >= 1000 ? cartStore.totalAmount : cartStore.totalAmount + 100 }}</span>
            </div>
            <RouterLink to="/checkout" class="btn btn-brand w-100 py-3 fw-bold">前往結帳</RouterLink>
            <RouterLink to="/products" class="btn btn-link w-100 mt-2 text-muted text-decoration-none">
              <i class="bi bi-arrow-left me-2"></i>繼續購物
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- 空購物車狀態 -->
      <div v-else class="text-center py-5">
        <div class="mb-4">
          <i class="bi bi-cart-x display-1 text-muted"></i>
        </div>
        <h3 class="fw-bold">您的購物車是空的</h3>
        <p class="text-muted mb-4">快去選購一些美味的麵包吧！</p>
        <RouterLink to="/products" class="btn btn-brand px-5 py-3">
          開始購物
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import FreeShippingProgress from '@/components/FreeShippingProgress.vue'

const cartStore = useCartStore()
</script>

<style scoped>
.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.page-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 700;
}

.text-brand {
  color: var(--brand-color);
}

.btn-brand {
  background-color: var(--brand-color);
  color: white;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-brand:hover {
  background-color: var(--brand-hover);
  transform: translateY(-2px);
}
</style>
