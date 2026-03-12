<template>
  <div>
    <!-- Hero Carousel -->
    <section id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
      <div class="carousel-indicators">
        <button v-for="(s, i) in slides" :key="s.title" type="button" data-bs-target="#heroCarousel" :data-bs-slide-to="i"
          :class="{ active: i === 0 }" :aria-current="i === 0 ? 'true' : undefined" :aria-label="`Slide ${i + 1}`" />
      </div>

      <div class="carousel-inner">
        <div v-for="(s, i) in slides" :key="s.title" class="carousel-item" :class="{ active: i === 0 }">
          <img :src="s.img" class="d-block w-100" :alt="s.alt" />
          <div class="carousel-caption d-none d-md-block">
            <h1 class="hero-title">{{ s.title }}</h1>
            <p class="hero-subtitle">{{ s.subtitle }}</p>
          </div>
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">上一張</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">下一張</span>
      </button>
    </section>

    <!-- 近期活動 (資料驅動重構) -->
    <section class="container my-5">
      <h2 class="section-title">近期活動</h2>
      <div class="row g-4">
        <div v-for="news in latestNews" :key="news.id" class="col-md-4">
          <div class="card h-100 border-0 shadow-sm news-card">
            <div class="position-relative overflow-hidden">
              <img :src="news.image" class="card-img-top lightbox-trigger" :alt="news.title" @click="openLightbox(news.image, news.title)" />
              <span class="badge bg-brand position-absolute top-0 start-0 m-3">{{ news.category }}</span>
            </div>
            <div class="card-body">
              <small class="text-muted d-block mb-2">{{ news.date }}</small>
              <h5 class="card-title fw-bold">{{ news.title }}</h5>
              <p class="card-text text-muted small">{{ news.summary }}</p>
              <RouterLink :to="`/news/${news.id}`" class="read-more">閱讀更多</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <RouterLink to="/news" class="btn btn-brand">更多活動</RouterLink>
      </div>
    </section>

    <!-- 視差滾動 -->
    <section class="parallax-section">
      <div class="parallax-content text-center">
        <h3>堅持手作的溫度</h3>
        <p class="lead">每一道工序，都蘊含著我們對美味的執著</p>
      </div>
    </section>

    <!-- 熱門商品 -->
    <section class="container my-5">
      <h2 class="section-title">熱門商品</h2>
      <div class="row g-4">
        <div v-for="p in hotProducts" :key="p.id" class="col-md-4 col-sm-6">
          <ProductCard :product="p" :show-add-cart="true" @add-to-cart="handleAddToCart" />
        </div>
      </div>
      <div class="text-center mt-5">
        <RouterLink to="/products" class="btn btn-outline-brand">查看全部商品</RouterLink>
      </div>
    </section>

    <!-- 標語 -->
    <section class="slogan-section">
      <div class="container">
        <h3 class="slogan-text">用烘焙拉近你我的關係</h3>
        <p class="slogan-sub">我們提供最好的、最美的、實在的味道給您與每一位顧客手中</p>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div class="modal fade" id="imageLightboxModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-transparent border-0">
          <div class="modal-body p-0 position-relative">
            <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3" data-bs-dismiss="modal" aria-label="Close"></button>
            <img :src="lightboxSrc" class="img-fluid w-100" :alt="lightboxAlt" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Modal } from 'bootstrap'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '@/stores/cartStore'
import { newsData } from '@/data/newsData'

const cartStore = useCartStore()

const slides = [
  { img: '/images/banner2.png', alt: '蒜香酥片', title: '蒜香酥片', subtitle: '— 每一口都是極致的酥脆享受 —' },
  { img: '/images/banner3.png', alt: '現烤麵包', title: '每日現烤', subtitle: '— 溫暖手作，新鮮出爐的幸福 —' },
  { img: '/images/banner1.png', alt: '精緻甜點', title: '法式甜點', subtitle: '— 享受午後的甜蜜時光 —' },
]

const hotProducts = [
  { id: 'h1', image: '/images/products1.png', alt: '草莓蛋糕', title: '莓果盒子 (銷售No.1)', price: 250, badge: 'HOT' },
  { id: 'h2', image: '/images/products2.png', alt: '手工餅乾', title: '英式伯爵手工餅乾', price: 120 },
  { id: 'h3', image: '/images/products3.png', alt: '手工蛋捲', title: '手工蛋捲 (原味)', price: 280 },
]

// 取得最新的三則消息
const latestNews = computed(() => {
  return [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})

const lightboxSrc = ref('')
const lightboxAlt = ref('')
let lightboxModal = null

onMounted(() => {
  const modalEl = document.getElementById('imageLightboxModal')
  if (modalEl) lightboxModal = new Modal(modalEl)
})

function openLightbox(src, alt = 'Image') {
  lightboxSrc.value = src
  lightboxAlt.value = alt
  lightboxModal?.show()
}

function handleAddToCart(product) {
  cartStore.addToCart(product)
}
</script>

<style scoped>
.section-title {
  color: var(--brand-color);
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background: var(--brand-color);
  margin: 15px auto 0;
}

.carousel-item img {
  height: 600px;
  object-fit: cover;
  filter: brightness(0.7);
}

.hero-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.parallax-section {
  background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1920&q=80');
  height: 400px;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 5rem 0;
}

.btn-brand {
  background-color: var(--brand-color);
  color: white;
  padding: 12px 40px;
  border-radius: 0;
  transition: all 0.3s;
}

.btn-brand:hover {
  background-color: var(--brand-hover);
  transform: translateY(-2px);
}

.btn-outline-brand {
  border: 1px solid var(--brand-color);
  color: var(--brand-color);
  padding: 12px 40px;
  border-radius: 0;
  transition: all 0.3s;
}

.btn-outline-brand:hover {
  background-color: var(--brand-color);
  color: white;
}

.slogan-section {
  background-color: #f9f9f9;
  padding: 6rem 0;
  text-align: center;
}

.slogan-text {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 1rem;
}

.read-more {
  color: var(--brand-color);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid var(--brand-color);
  transition: all 0.3s;
}

.read-more:hover {
  color: var(--brand-hover);
  padding-left: 5px;
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
</style>
