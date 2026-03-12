import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Products from '@/pages/Products.vue'
import News from '@/pages/News.vue'
import Store from '@/pages/Store.vue'
import Contact from '@/pages/Contact.vue'

const routes = [
  { path: '/', component: Home, meta: { title: '多麥烘焙 | 首頁' } },
  { path: '/about', component: About, meta: { title: '關於我們 | 多麥烘焙' } },
  { path: '/products', component: Products, meta: { title: '最新商品 | 多麥烘焙' } },
  { path: '/news', component: News, meta: { title: '最新消息 | 多麥烘焙' } },
  { path: '/store', component: Store, meta: { title: '門市資訊 | 多麥烘焙' } },
  { path: '/contact', component: Contact, meta: { title: '聯絡我們 | 多麥烘焙' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta?.title || '多麥烘焙'
})

export default router
