import { createRouter, createWebHistory } from 'vue-router'

// 使用動態導入實作路由懶載入 (Lazy Loading)
// 這能減少首屏載入體積，提升效能
const Home = () => import('../pages/home.vue')
const About = () => import('../pages/about.vue')
const Products = () => import('../pages/products.vue')
const News = () => import('../pages/news.vue')
const Store = () => import('../pages/store.vue')
const Contact = () => import('../pages/contact.vue')
const Cart = () => import('../pages/cart.vue')
const NewsDetail = () => import('../pages/newsDetail.vue')
const Checkout = () => import('../pages/checkout.vue')

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: Home, 
    meta: { title: '多麥烘焙 | 首頁' } 
  },
  { 
    path: '/about', 
    name: 'about',
    component: About, 
    meta: { title: '關於我們 | 多麥烘焙' } 
  },
  { 
    path: '/products', 
    name: 'products',
    component: Products, 
    meta: { title: '最新商品 | 多麥烘焙' } 
  },
  { 
    path: '/news', 
    name: 'news',
    component: News, 
    meta: { title: '最新消息 | 多麥烘焙' } 
  },
  { 
    path: '/news/:id', 
    name: 'newsDetail',
    component: NewsDetail, 
    meta: { title: '活動詳情 | 多麥烘焙' } 
  },
  { 
    path: '/store', 
    name: 'store',
    component: Store, 
    meta: { title: '門市資訊 | 多麥烘焙' } 
  },
  { 
    path: '/contact', 
    name: 'contact',
    component: Contact, 
    meta: { title: '聯絡我們 | 多麥烘焙' } 
  },
  { 
    path: '/cart', 
    name: 'cart',
    component: Cart, 
    meta: { title: '購物車 | 多麥烘焙' } 
  },
  { 
    path: '/checkout', 
    name: 'checkout',
    component: Checkout, 
    meta: { title: '結帳 | 多麥烘焙' } 
  },
  // 處理 404 頁面 (建議面試加分項)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.afterEach((to) => {
  document.title = to.meta?.title || '多麥烘焙'
})

export default router
