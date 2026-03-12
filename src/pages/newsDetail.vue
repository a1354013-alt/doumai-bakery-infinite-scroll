<template>
  <div v-if="article" class="news-detail-page">
    <!-- Article Header -->
    <header class="article-header" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${article.image})` }">
      <div class="container text-center">
        <span class="badge bg-brand mb-3">{{ article.category }}</span>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta mt-3">
          <span class="me-3"><i class="bi bi-calendar-event me-2"></i>{{ article.date }}</span>
          <span><i class="bi bi-person me-2"></i>多麥編輯部</span>
        </div>
      </div>
    </header>

    <AppBreadcrumb :items="[
      { name: '最新消息', path: '/news' },
      { name: article.title, path: `/news/${article.id}` }
    ]" />

    <article class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <!-- Article Content -->
          <div class="article-content mb-5" v-html="article.content"></div>
          
          <hr class="my-5">
          
          <!-- Navigation -->
          <div class="d-flex justify-content-between align-items-center">
            <RouterLink to="/news" class="btn btn-outline-secondary px-4">
              <i class="bi bi-arrow-left me-2"></i>返回列表
            </RouterLink>
            <div class="share-links">
              <span class="me-3 text-muted">分享文章：</span>
              <a href="#" class="text-secondary me-2"><i class="bi bi-facebook"></i></a>
              <a href="#" class="text-secondary me-2"><i class="bi bi-line"></i></a>
              <a href="#" class="text-secondary"><i class="bi bi-link-45deg"></i></a>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Related News -->
    <section class="bg-light py-5">
      <div class="container">
        <h4 class="fw-bold mb-4 text-center">更多精彩活動</h4>
        <div class="row g-4">
          <div v-for="item in relatedNews" :key="item.id" class="col-md-4">
            <div class="card border-0 shadow-sm h-100 news-card">
              <img :src="item.image" class="card-img-top" :alt="item.title" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <h6 class="fw-bold mb-2">{{ item.title }}</h6>
                <RouterLink :to="`/news/${item.id}`" class="stretched-link text-brand text-decoration-none small">
                  閱讀更多 <i class="bi bi-chevron-right"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="container py-5 text-center">
    <h3>載入中...</h3>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { newsData } from '@/data/newsData'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'

const route = useRoute()
const articleId = computed(() => route.params.id)

const article = computed(() => {
  return newsData.find(n => n.id === articleId.value)
})

const relatedNews = computed(() => {
  return newsData.filter(n => n.id !== articleId.value).slice(0, 3)
})

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.article-header {
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.article-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.8rem;
  font-weight: 700;
  max-width: 800px;
}

.article-meta {
  font-size: 1rem;
  opacity: 0.9;
}

.article-content {
  font-size: 1.1rem;
  line-height: 2;
  color: #444;
}

/* 深度選擇器處理 v-html 中的樣式 */
:deep(.article-content h4) {
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
  color: #333;
  border-left: 4px solid var(--brand-color);
  padding-left: 1rem;
}

:deep(.article-content ul) {
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
}

:deep(.article-content li) {
  margin-bottom: 0.5rem;
}

.news-card {
  transition: transform 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
}

.bg-brand {
  background-color: var(--brand-color) !important;
}

.text-brand {
  color: var(--brand-color);
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem;
  }
  .article-header {
    height: 300px;
  }
}
</style>
