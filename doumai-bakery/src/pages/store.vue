<template>
  <div>
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">門市資訊</h1>
    </header>

    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/">首頁</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">門市資訊</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Store List -->
    <section class="container py-5">
      <div class="row g-4">
        <div v-for="s in stores" :key="s.id" class="col-md-6">
          <div class="store-card card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <h3 class="card-title h4 fw-bold mb-3 text-brand">{{ s.name }}</h3>
              <ul class="list-unstyled mb-4">
                <li class="mb-2"><i class="bi bi-geo-alt me-2"></i>{{ s.address }}</li>
                <li class="mb-2"><i class="bi bi-telephone me-2"></i>{{ s.phone }}</li>
                <li class="mb-2"><i class="bi bi-clock me-2"></i>{{ s.hours }}</li>
              </ul>
              <div class="map-placeholder bg-light rounded d-flex align-items-center justify-content-center" style="height: 200px;">
                <span class="text-muted"><i class="bi bi-map me-2"></i>Google Map 載入中...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const stores = ref([
  {
    id: 1,
    name: '信義總店',
    address: '台北市信義區烘焙路 1 號',
    phone: '02-1234-5678',
    hours: '09:00 - 21:00'
  },
  {
    id: 2,
    name: '大安分店',
    address: '台北市大安區美味街 88 號',
    phone: '02-8765-4321',
    hours: '10:00 - 20:00'
  }
])
</script>

<style scoped>
.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
}

.page-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.breadcrumb-section {
  background-color: #f8f9fa;
  padding: 15px 0;
}

.text-brand {
  color: var(--brand-color);
}

.store-card {
  transition: transform 0.3s;
}

.store-card:hover {
  transform: translateY(-5px);
}
</style>
