import { createRouter, createWebHistory } from 'vue-router'

// 使用動態導入實作路由懶載入 (Lazy Loading)
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
    meta: { title: '首頁 | 多麥健康烘焙 - 堅持手作的溫度' } 
  },
  { 
    path: '/about', 
    name: 'about',
    component: About, 
    meta: { title: '關於我們 | 多麥健康烘焙' } 
  },
  { 
    path: '/products', 
    name: 'products',
    component: Products, 
    meta: { title: '最新商品 | 多麥健康烘焙' } 
  },
  { 
    path: '/news', 
    name: 'news',
    component: News, 
    meta: { title: '最新消息 | 多麥健康烘焙' } 
  },
  { 
    path: '/news/:id', 
    name: 'newsDetail',
    component: NewsDetail, 
    meta: { title: '活動詳情 | 多麥健康烘焙' } 
  },
  { 
    path: '/store', 
    name: 'store',
    component: Store, 
    meta: { title: '門市資訊 | 多麥健康烘焙' } 
  },
  { 
    path: '/contact', 
    name: 'contact',
    component: Contact, 
    meta: { title: '聯絡我們 | 多麥健康烘焙' } 
  },
  { 
    path: '/cart', 
    name: 'cart',
    component: Cart, 
    meta: { title: '購物車 | 多麥健康烘焙' } 
  },
  { 
    path: '/checkout', 
    name: 'checkout',
    component: Checkout, 
    meta: { title: '結帳 | 多麥健康烘焙' } 
  },
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

/**
 * SEO 優化：全域路由守衛，動態更新頁面標題與 Meta Tags
 */
router.afterEach((to) => {
  const title = to.meta?.title || '多麥健康烘焙'
  document.title = title

  // 更新 Meta Description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    document.head.appendChild(metaDescription)
  }
  metaDescription.content = `多麥健康烘焙 - ${title}。我們堅持手作的溫度，選用天然食材，為您帶來最純粹的幸福滋味。`
})

export default router
