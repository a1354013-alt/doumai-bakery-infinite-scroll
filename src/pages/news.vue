<template>
  <div class="news-page">
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">最新消息</h1>
    </header>

    <AppBreadcrumb :items="[{ name: '最新消息', path: '/news' }]" />

    <section class="container py-5">
      <!-- 篩選與排序工具列 -->
      <div class="row mb-5 align-items-center g-3">
        <div class="col-lg-8">
          <div class="filter-tags d-flex flex-wrap gap-2">
            <button 
              v-for="cat in categories" 
              :key="cat"
              @click="handleCategoryChange(cat)"
              class="btn btn-sm rounded-pill px-3"
              :class="currentCategory === cat ? 'btn-brand' : 'btn-outline-secondary'"
            >
              {{ cat }}
            </button>
          </div>
        </div>
        <div class="col-lg-4 text-lg-end">
          <div class="d-flex align-items-center justify-content-lg-end">
            <span class="text-muted small me-2 text-nowrap">排序方式：</span>
            <select v-model="sortOrder" class="form-select form-select-sm d-inline-block w-auto" @change="resetInfiniteScroll">
              <option value="newest">由新到舊</option>
              <option value="oldest">由舊到新</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 消息列表 -->
      <div class="row g-4">
        <TransitionGroup name="list">
          <div v-for="news in displayedNews" :key="news.id" class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm news-card">
              <div class="news-img-wrapper">
                <img :src="news.image" class="card-img-top" :alt="news.title" loading="lazy">
                <span class="category-badge">{{ news.category }}</span>
              </div>
              <div class="card-body p-4 d-flex flex-column">
                <div class="text-muted small mb-2">
                  <i class="bi bi-calendar3 me-2"></i>{{ news.date }}
                </div>
                <h5 class="card-title fw-bold mb-3 flex-grow-1">{{ news.title }}</h5>
                <p class="card-text text-muted small mb-4">{{ news.summary }}</p>
                <RouterLink :to="`/news/${news.id}`" class="btn btn-outline-brand mt-auto">
                  閱讀全文
                </RouterLink>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- 無限捲動觸發點 -->
      <div ref="loadMoreTrigger" class="text-center py-5 mt-4">
        <div v-if="isLoading" class="spinner-border text-brand" role="status">
          <span class="visually-hidden">載入中...</span>
        </div>
        <p v-else-if="isFinished && filteredNews.length > 0" class="text-muted small">
          已經顯示所有消息了
        </p>
        <div v-else-if="filteredNews.length === 0" class="text-center py-5">
          <i class="bi bi-search display-1 text-light mb-3"></i>
          <p class="text-muted">找不到相關消息，請嘗試其他分類</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { newsData } from '@/data/newsData'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'

const currentCategory = ref('全部')
const sortOrder = ref('newest')

// 無限捲動相關狀態
const loadMoreTrigger = ref(null)
const displayedCount = ref(6)
const isLoading = ref(false)
const isFinished = ref(false)
const pageSize = 3

// 自動提取所有不重複的分類
const categories = computed(() => {
  const cats = newsData.map(item => item.category)
  return ['全部', ...new Set(cats)]
})

// 篩選與排序邏輯
const filteredNews = computed(() => {
  let result = [...newsData]
  if (currentCategory.value !== '全部') {
    result = result.filter(item => item.category === currentCategory.value)
  }
  result.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return sortOrder.value === 'newest' ? dateB - dateA : dateA - dateB
  })
  return result
})

const displayedNews = computed(() => {
  return filteredNews.value.slice(0, displayedCount.value)
})

const resetInfiniteScroll = () => {
  displayedCount.value = 6
  isFinished.value = false
}

const handleCategoryChange = (cat) => {
  currentCategory.value = cat
  resetInfiniteScroll()
}

const loadMore = async () => {
  if (isLoading.value || isFinished.value) return
  
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  
  displayedCount.value += pageSize
  
  if (displayedCount.value >= filteredNews.value.length) {
    isFinished.value = true
  }
  isLoading.value = false
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, { threshold: 0.1 })

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
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
  border-radius: 12px;
  overflow: hidden;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.news-img-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.news-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .news-img-wrapper img {
  transform: scale(1.1);
}

.category-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: var(--brand-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 1;
}

.btn-brand {
  background-color: var(--brand-color);
  color: white;
  border: 1px solid var(--brand-color);
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

.text-brand {
  color: var(--brand-color);
}

/* 列表動畫 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
