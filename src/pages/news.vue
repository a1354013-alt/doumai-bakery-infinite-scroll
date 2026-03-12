<template>
  <div>
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">最新消息</h1>
    </header>

    <AppBreadcrumb :items="[{ name: '最新消息', path: '/news' }]" />

    <!-- News List -->
    <section class="container py-5">
      <div class="row g-4">
        <div v-for="item in newsData" :key="item.id" class="col-lg-4 col-md-6">
          <div class="news-card card h-100 border-0 shadow-sm overflow-hidden">
            <div class="position-relative">
              <img :src="item.image" class="card-img-top" :alt="item.title" style="height: 240px; object-fit: cover;">
              <span class="badge bg-brand position-absolute top-0 start-0 m-3">{{ item.category }}</span>
            </div>
            <div class="card-body p-4 d-flex flex-column">
              <div class="text-muted small mb-2"><i class="bi bi-calendar-event me-2"></i>{{ item.date }}</div>
              <h5 class="card-title fw-bold mb-3 flex-grow-1">{{ item.title }}</h5>
              <p class="card-text text-muted mb-4">{{ item.summary }}</p>
              <RouterLink :to="`/news/${item.id}`" class="btn btn-outline-brand mt-auto">
                閱讀全文
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { newsData } from '@/data/newsData'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
</script>

<style scoped>
.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 300px;
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

.news-card {
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.bg-brand {
  background-color: var(--brand-color) !important;
}

.btn-outline-brand {
  border-color: var(--brand-color);
  color: var(--brand-color);
  transition: all 0.3s;
}

.btn-outline-brand:hover {
  background-color: var(--brand-color);
  color: white;
}
</style>
