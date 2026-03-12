<template>
  <footer class="footer mt-auto">
    <div class="container py-5">
      <div class="row g-4">
        <!-- 快速連結 -->
        <div class="col-lg-4 col-md-6">
          <h5 class="footer-title">快速連結</h5>
          <ul class="footer-links">
            <li v-for="link in quickLinks" :key="link.path">
              <RouterLink :to="link.path">{{ link.name }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- 聯絡資訊 -->
        <div class="col-lg-4 col-md-6">
          <h5 class="footer-title">聯絡資訊</h5>
          <ul class="footer-info">
            <li v-for="info in contactDetails" :key="info.icon">
              <i :class="['bi', info.icon, 'me-2']"></i>
              {{ info.text }}
            </li>
          </ul>
        </div>

        <!-- 營業時間 -->
        <div class="col-lg-4 col-md-6">
          <h5 class="footer-title">營業時間</h5>
          <p class="footer-text" v-html="openingHours"></p>
        </div>
      </div>
      
      <hr class="my-5 opacity-25">
      
      <!-- 底部品牌區塊：標語與 ICON -->
      <div class="footer-bottom text-center">
        <div class="brand-slogan mb-4">
          <h4 class="fw-bold text-white mb-2">{{ brandInfo.name }}</h4>
          <p class="footer-desc mb-0">{{ brandInfo.description }}</p>
        </div>
        
        <div class="social-links mb-4">
          <a v-for="social in socialLinks" :key="social.icon" :href="social.url" :title="social.name">
            <i :class="['bi', social.icon]"></i>
          </a>
        </div>
        
        <small class="copyright text-muted">© {{ new Date().getFullYear() }} {{ brandInfo.name }} All Rights Reserved.</small>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const brandInfo = {
  name: '多麥健康烘焙',
  description: '堅持手作的溫度，選用天然食材，為您帶來最純粹的幸福滋味。'
}

const quickLinks = [
  { name: '關於我們', path: '/about' },
  { name: '最新商品', path: '/products' },
  { name: '最新消息', path: '/news' },
  { name: '門市資訊', path: '/store' },
  { name: '聯絡我們', path: '/contact' },
]

const contactDetails = [
  { icon: 'bi-geo-alt', text: '台北市信義區烘焙路 1 號' },
  { icon: 'bi-telephone', text: '02-1234-5678' },
  { icon: 'bi-envelope', text: 'service@bakery.com' },
]

const socialLinks = [
  { name: 'Facebook', icon: 'bi-facebook', url: '#' },
  { name: 'Instagram', icon: 'bi-instagram', url: '#' },
  { name: 'Line', icon: 'bi-line', url: '#' },
]

const openingHours = '週一至週日<br>09:00 - 21:00'
</script>

<style scoped>
.footer {
  background-color: #222;
  color: #eee;
}

.footer-title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 30px;
  height: 2px;
  background-color: var(--brand-color);
}

.footer-desc {
  font-size: 1rem;
  color: #aaa;
  letter-spacing: 1px;
}

.footer-links, .footer-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li, .footer-info li {
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.footer-links a {
  color: #aaa;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--brand-color);
}

.social-links a {
  color: #fff;
  font-size: 1.5rem;
  margin: 0 1rem;
  transition: transform 0.3s, color 0.3s;
  display: inline-block;
}

.social-links a:hover {
  color: var(--brand-color);
  transform: translateY(-5px);
}

.footer-info i {
  color: var(--brand-color);
}

.brand-slogan h4 {
  font-family: 'Noto Serif TC', serif;
  letter-spacing: 2px;
}

.copyright {
  font-size: 0.8rem;
  letter-spacing: 1px;
}
</style>
