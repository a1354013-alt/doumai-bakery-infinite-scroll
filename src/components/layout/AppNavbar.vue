<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <RouterLink class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi bi-shop me-2 brand-icon"></i>
        <span>多麥健康烘焙</span>
      </RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <!-- 使用 v-for 渲染導覽項目，展現資料驅動的開發思維 -->
          <li v-for="item in navItems" :key="item.path" class="nav-item">
            <RouterLink 
              class="nav-link px-3" 
              :to="item.path"
              @click="closeNavbar"
            >
              {{ item.name }}
            </RouterLink>
          </li>
          
          <!-- 購物車圖示 -->
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
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

// 導覽列資料配置：未來增加頁面只需在此修改，不需動到 HTML
const navItems = [
  { name: '關於我們', path: '/about' },
  { name: '最新商品', path: '/products' },
  { name: '最新消息', path: '/news' },
  { name: '門市資訊', path: '/store' },
  { name: '聯絡我們', path: '/contact' },
]

// 滾動監聽：增加互動感 (面試加分項)
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 點擊連結後自動收合手機版選單
const closeNavbar = () => {
  const navbarCollapse = document.getElementById('navbarNav')
  if (navbarCollapse.classList.contains('show')) {
    const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse)
    bsCollapse?.hide()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px); /* 現代感毛玻璃效果 */
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  transition: all 0.3s ease;
}

/* 滾動後的樣式變化 */
.navbar-scrolled {
  padding: 0.6rem 0;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  position: relative;
  transition: color 0.3s;
}

/* 利用 Vue Router 自動產生的類別來判斷 Active 狀態 */
/* 不需要寫 JS 判斷，這是最優雅的做法 */
.router-link-active {
  color: var(--brand-color) !important;
}

/* Active 狀態的底線動畫 (面試加分細節) */
.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background-color: var(--brand-color);
  border-radius: 2px;
}

.nav-link:hover {
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

@media (max-width: 991.98px) {
  .router-link-active::after {
    display: none; /* 手機版隱藏底線 */
  }
  .nav-link {
    padding: 0.8rem 1rem !important;
  }
}
</style>
