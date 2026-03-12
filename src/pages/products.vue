<template>
  <div>
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">全部商品</h1>
    </header>

    <!-- 使用全域麵包屑元件 -->
    <AppBreadcrumb :items="[{ name: '最新商品', path: '/products' }]" />

    <!-- Products -->
    <section class="container py-5">
      <!-- 優化後的分頁標籤 (Tabs) -->
      <div class="filter-buttons">
        <button 
          v-for="f in filters" 
          :key="f.key" 
          class="btn btn-filter" 
          :class="{ active: activeFilter === f.key }"
          type="button" 
          @click="handleFilterChange(f.key)"
          :aria-pressed="activeFilter === f.key"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- 用 TransitionGroup 做篩選動畫 -->
      <TransitionGroup name="fade-up" tag="div" class="row g-4">
        <div v-for="p in displayedProducts" :key="p.id" class="col-md-4 col-sm-6">
          <ProductCard :product="p" :show-add-cart="true" @add-to-cart="handleAddToCart" />
        </div>
      </TransitionGroup>

      <!-- 無限捲動觸發點與載入動畫 -->
      <div ref="loadMoreTrigger" class="text-center py-5 mt-4">
        <div v-if="isLoading" class="spinner-border text-brand" role="status">
          <span class="visually-hidden">載入中...</span>
        </div>
        <p v-else-if="isFinished && filteredProducts.length > 0" class="text-muted small">
          已經顯示所有商品了
        </p>
        <p v-else-if="filteredProducts.length === 0" class="text-muted">
          找不到相關商品
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

/** 篩選按鈕 */
const filters = [
  { key: 'all', label: '全部商品' },
  { key: 'bread', label: '手工麵包' },
  { key: 'dessert', label: '精緻甜點' },
  { key: 'gift', label: '伴手禮盒' },
]

const activeFilter = ref('all')

/** 商品資料庫 */
const allProducts = [
  { id: 'p001', category: 'bread', badge: '熱銷', title: '招牌蒜香酥片', price: 150, image: '/images/news1.png' },
  { id: 'p002', category: 'dessert', badge: '新品', title: '鮮奶油莓果盒子', price: 250, image: '/images/products1.png' },
  { id: 'p003', category: 'gift', badge: '熱銷', title: '英式手工餅乾禮盒', price: 280, image: '/images/products2.png' },
  { id: 'p004', category: 'bread', badge: '熱銷', title: '特濃牛奶生吐司', price: 180, image: '/images/products4.png' },
  { id: 'p005', category: 'dessert', badge: '新品', title: '宇治抹茶生乳捲', price: 320, image: '/images/products6.png' },
  { id: 'p006', category: 'gift', badge: '', title: '厚實手工蛋捲', price: 280, image: '/images/products3.png' },
  { id: 'p007', category: 'bread', badge: '', title: '黃金奶酥小餐包', price: 80, image: '/images/products5.png' },
  { id: 'p008', category: 'dessert', badge: '', title: '日式輕乳酪蛋糕', price: 199, image: '/images/products7.png' },
  { id: 'p009', category: 'bread', badge: '', title: '皇家奶酥酒種麵包', price: 69, image: '/images/products8.png' },
  { id: 'p010', category: 'dessert', badge: '', title: '熊本戚風莓果蛋糕', price: 129, image: '/images/products9.png' },
  { id: 'p011', category: 'dessert', badge: '', title: '草莓盒子', price: 99, image: '/images/products10.png' },
  { id: 'p012', category: 'dessert', badge: '', title: '檸檬磅蛋糕', price: 99, image: '/images/products11.png' },
  { id: 'p013', category: 'bread', badge: '', title: '北海道奶油小布利', price: 69, image: '/images/products12.png' },
  { id: 'p014', category: 'dessert', badge: '', title: '草莓生乳捲', price: 299, image: '/images/products13.png' },
  { id: 'p015', category: 'dessert', badge: '', title: '芒果生乳捲', price: 299, image: '/images/products14.png' },
  { id: 'p016', category: 'gift', badge: '', title: '鳳梨酥(盒)', price: 199, image: '/images/products15.png' },
  { id: 'p017', category: 'bread', badge: '', title: '肉鬆吐司', price: 99, image: '/images/products16.png' },
  { id: 'p018', category: 'bread', badge: '', title: '波蘿麵包', price: 49, image: '/images/products17.png' },
  { id: 'p019', category: 'bread', badge: '', title: '布丁麵包', price: 59, image: '/images/products18.png' },
  { id: 'p020', category: 'gift', badge: '', title: '紅櫻桃曲奇(罐)', price: 159, image: '/images/products19.png' },
  { id: 'p021', category: 'bread', badge: '', title: '咖哩麵包', price: 39, image: '/images/products20.png' },
  { id: 'p022', category: 'bread', badge: '', title: '紅豆燒餅', price: 45, image: '/images/products21.png' },
  { id: 'p023', category: 'gift', badge: '', title: '台式馬卡龍禮盒', price: 249, image: '/images/products22.png' },
  { id: 'p024', category: 'bread', badge: '', title: '炒麵麵包', price: 69, image: '/images/products23.png' },
  { id: 'p025', category: 'bread', badge: '', title: '蔥花肉鬆麵包', price: 49, image: '/images/products24.png' },
  { id: 'p026', category: 'bread', badge: '', title: '火腿三明治', price: 69, image: '/images/products25.png' },
  { id: 'p027', category: 'bread', badge: '', title: '葡萄乾奶酥吐司', price: 99, image: '/images/products26.png' },
  { id: 'p028', category: 'bread', badge: '', title: '半熟乳酪塔', price: 49, image: '/images/products27.png' },
  { id: 'p029', category: 'gift', badge: '', title: '夏威夷豆塔禮盒', price: 249, image: '/images/products28.png' },
  { id: 'p030', category: 'bread', badge: '', title: '台式草莓夾心麵包', price: 49, image: '/images/products29.png' },
  { id: 'p031', category: 'bread', badge: '特價', title: '台式紅豆夾心麵包', price: 39, image: '/images/products30.png' },
  { id: 'p032', category: 'bread', badge: '特價', title: '肉鬆燒餅', price: 59, image: '/images/products31.png' },
  { id: 'p033', category: 'bread', badge: '', title: '法棍麵包', price: 89, image: '/images/products32.png' },
  { id: 'p034', category: 'bread', badge: '', title: '紅酒歐包', price: 119, image: '/images/products33.png' },
  { id: 'p035', category: 'bread', badge: '', title: '粗糧麵包', price: 109, image: '/images/products34.png' },
  { id: 'p036', category: 'bread', badge: '', title: '原味可頌', price: 59, image: '/images/products35.png' },
  { id: 'p037', category: 'bread', badge: '', title: '肉鬆可頌', price: 79, image: '/images/products36.png' },
  { id: 'p038', category: 'bread', badge: '', title: '草莓奶油起司丹麥 pastry', price: 129, image: '/images/products37.png' },
  { id: 'p039', category: 'gift', badge: '', title: '奶油蝴蝶酥禮盒', price: 299, image: '/images/products38.png' },
  { id: 'p040', category: 'bread', badge: '', title: '沙拉麵包', price: 49, image: '/images/products39.png' },
  { id: 'p041', category: 'gift', badge: '', title: '蛋黃酥禮盒', price: 299, image: '/images/products40.png' },
  { id: 'p042', category: 'gift', badge: '', title: '小月餅禮盒', price: 239, image: '/images/products41.png' },
]

// 無限捲動相關狀態
const loadMoreTrigger = ref(null)
const displayedCount = ref(9) // 初始顯示 9 筆
const isLoading = ref(false)
const isFinished = ref(false)
const pageSize = 6 // 每次載入 6 筆

const filteredProducts = computed(() => {
  if (activeFilter.value === 'all') return allProducts
  return allProducts.filter((p) => p.category === activeFilter.value)
})

const displayedProducts = computed(() => {
  return filteredProducts.value.slice(0, displayedCount.value)
})

// 監聽篩選變化，重置計數
const handleFilterChange = (key) => {
  activeFilter.value = key
  displayedCount.value = 9
  isFinished.value = false
}

// 載入更多邏輯
const loadMore = async () => {
  if (isLoading.value || isFinished.value) return
  
  isLoading.value = true
  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 800))
  
  displayedCount.value += pageSize
  
  if (displayedCount.value >= filteredProducts.value.length) {
    isFinished.value = true
  }
  isLoading.value = false
}

// Intersection Observer 實作
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

function handleAddToCart(product) {
  cartStore.addItem(product)
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
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

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn-filter {
  border: 1px solid #ddd;
  padding: 10px 28px;
  border-radius: 30px;
  background: white;
  color: #555;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-filter.active {
  background-color: var(--brand-color);
  border-color: var(--brand-color);
  color: white;
  box-shadow: 0 4px 12px rgba(207, 46, 90, 0.3);
  transform: translateY(-2px);
}

.btn-filter:hover:not(.active) {
  background-color: #f8f9fa;
  border-color: var(--brand-color);
  color: var(--brand-color);
}

.text-brand {
  color: var(--brand-color);
}

/* 動畫 */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.5s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
