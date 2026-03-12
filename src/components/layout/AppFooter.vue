<template>
  <footer class="footer mt-auto">
    <div class="container py-5">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <h5 class="footer-title">多麥健康烘焙</h5>
          <p class="footer-desc">
            堅持手作的溫度，選用天然食材，為您帶來最純粹的幸福滋味。
          </p>
          <div class="social-links">
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-line"></i></a>
          </div>
        </div>
        
        <div class="col-lg-2 col-md-6">
          <h5 class="footer-title">快速連結</h5>
          <ul class="footer-links">
            <li><RouterLink to="/about">關於我們</RouterLink></li>
            <li><RouterLink to="/products">最新商品</RouterLink></li>
            <li><RouterLink to="/store">門市資訊</RouterLink></li>
            <li><RouterLink to="/contact">聯絡我們</RouterLink></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h5 class="footer-title">聯絡資訊</h5>
          <ul class="footer-info">
            <li><i class="bi bi-geo-alt me-2"></i>台北市信義區烘焙路 1 號</li>
            <li><i class="bi bi-telephone me-2"></i>02-1234-5678</li>
            <li><i class="bi bi-envelope me-2"></i>service@bakery.com</li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h5 class="footer-title">營業時間</h5>
          <p class="footer-text">
            週一至週日<br>
            09:00 - 21:00
          </p>
        </div>
      </div>
      
      <hr class="my-4 opacity-25">
      
      <div class="text-center">
        <small class="copyright">© 2023 多麥烘焙 All Rights Reserved.</small>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
  background-color: #333;
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
  font-size: 0.9rem;
  color: #bbb;
}

.footer-links, .footer-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li, .footer-info li {
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
}

.footer-links a {
  color: #bbb;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--brand-color);
}

.social-links a {
  color: #fff;
  font-size: 1.2rem;
  margin-right: 1rem;
  transition: color 0.3s;
}

.social-links a:hover {
  color: var(--brand-color);
}

.copyright {
  color: #888;
}

.footer-info li {
    display: flex;
    align-items: center;
}
</style>
