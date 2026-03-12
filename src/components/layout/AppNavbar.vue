<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
    <div class="container">
      <RouterLink class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi bi-shop me-2 brand-icon"></i>
        <span>多麥健康烘焙</span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">最新商品</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/store">門市資訊</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact">聯絡我們</RouterLink>
          </li>
          <li class="nav-item ms-lg-3">
            <a class="nav-link cart-icon" href="#" @click.prevent>
              <i class="bi bi-cart"></i>
              <span class="cart-badge">0</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  padding: 0.8rem 0;
  transition: all 0.3s;
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.4rem;
  color: #333;
}

.brand-icon {
  color: var(--brand-color);
  font-size: 1.6rem;
}

.nav-link {
  font-weight: 500;
  color: #555 !important;
  padding: 0.5rem 1rem !important;
  transition: color 0.3s;
}

.nav-link:hover,
.router-link-active {
  color: var(--brand-color) !important;
}

.cart-icon {
  position: relative;
  font-size: 1.2rem;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--brand-color);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50%;
  transform: translate(25%, -25%);
}
</style>
