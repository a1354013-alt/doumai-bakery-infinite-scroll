<template>
  <div>
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">最新消息</h1>
    </header>

    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/">首頁</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">最新消息</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- News List -->
    <section class="container py-5">
      <div class="row g-4">
        <div v-for="n in newsList" :key="n.id" class="col-12">
          <div class="news-card card border-0 shadow-sm overflow-hidden">
            <div class="row g-0">
              <div class="col-md-4">
                <div class="news-img-wrapper h-100">
                  <img :src="n.image" :alt="n.title" class="img-fluid h-100 w-100 object-fit-cover" />
                </div>
              </div>
              <div class="col-md-8">
                <div class="card-body p-4">
                  <div class="d-flex align-items-center mb-2">
                    <span class="badge bg-brand me-2">{{ n.category }}</span>
                    <small class="text-muted">{{ n.date }}</small>
                  </div>
                  <h3 class="card-title h4 fw-bold mb-3">{{ n.title }}</h3>
                  <p class="card-text text-muted mb-4">{{ n.summary }}</p>
                  <a href="#" class="btn btn-outline-brand btn-sm" @click.prevent>閱讀更多</a>
                </div>
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

const newsList = ref([
  {
    id: 1,
    category: '活動',
    date: '2023-10-25',
    title: '【萬聖節限定】驚喜甜點派對開始囉！',
    summary: '不給糖就搗蛋！多麥烘焙推出萬聖節限定南瓜派與幽靈馬卡龍，快來門市一起狂歡吧。',
    image: '/images/news1.png'
  },
  {
    id: 2,
    category: '新品',
    date: '2023-10-15',
    title: '秋季新品：宇治抹茶生乳捲濃郁登場',
    summary: '選用日本宇治抹茶粉，搭配北海道鮮奶油，苦甜適中的大人味，是秋日午後的最佳陪伴。',
    image: '/images/news2.png'
  },
  {
    id: 3,
    category: '公告',
    date: '2023-10-01',
    title: '多麥烘焙官網正式上線，會員招募中',
    summary: '為了提供更好的服務，我們的官網正式上線囉！現在加入會員即可領取 50 元折價券。',
    image: '/images/news3.png'
  }
])
</script>

<style scoped>
.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1920&q=80');
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

.bg-brand {
  background-color: var(--brand-color);
}

.btn-outline-brand {
  border: 1px solid var(--brand-color);
  color: var(--brand-color);
}

.btn-outline-brand:hover {
  background-color: var(--brand-color);
  color: white;
}

.news-card {
  transition: transform 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
}

.object-fit-cover {
  object-fit: cover;
}
</style>
