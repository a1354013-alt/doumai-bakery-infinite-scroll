<template>
  <!-- Page Header -->
  <header class="page-header">
    <h1 class="page-title">聯絡我們</h1>
  </header>

  <!-- Breadcrumb -->
  <div class="breadcrumb-section">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">聯絡我們</li>
        </ol>
      </nav>
    </div>
  </div>

  <!-- Contact Info -->
  <section class="container py-5">
    <div class="text-center mb-5 reveal">
      <h3 class="fw-bold title-serif" style="color:#333;">聯絡資訊</h3>
      <p class="text-muted">歡迎透過以下方式與我們聯繫，或直接親臨門市選購。</p>
    </div>

    <div class="row g-4 justify-content-center">
      <div class="col-md-4 col-sm-6 reveal">
        <div class="contact-info-card">
          <div class="icon-box"><i class="bi bi-telephone-fill"></i></div>
          <h5 class="fw-bold mb-2">服務專線</h5>
          <p class="mb-0 text-muted">02-1234-5678</p>
          <small class="text-muted">( 週一至週日 09:00 - 21:00 )</small>
        </div>
      </div>

      <div class="col-md-4 col-sm-6 reveal">
        <div class="contact-info-card">
          <div class="icon-box"><i class="bi bi-envelope-fill"></i></div>
          <h5 class="fw-bold mb-2">電子信箱</h5>
          <p class="mb-0 text-muted">service@bakery.com</p>
          <small class="text-muted">( 歡迎各類合作提案 )</small>
        </div>
      </div>

      <div class="col-md-4 col-sm-6 reveal">
        <div class="contact-info-card">
          <div class="icon-box"><i class="bi bi-geo-alt-fill"></i></div>
          <h5 class="fw-bold mb-2">門市地址</h5>
          <p class="mb-0 text-muted">台北市信義區烘焙路 1 號</p>
          <small class="text-muted">( 近台北 101 )</small>
        </div>
      </div>
    </div>
  </section>

  <!-- Map -->
  <section class="container mb-5 reveal">
    <div class="map-wrapper">
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9334586221543!2d121.56193731500628!3d25.036329983971257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da9c9e1f%3A0x1206b5370d069d4e!2z5Y-w5YyXMTAx!5e0!3m2!1szh-TW!2stw!4v1628151234567!5m2!1szh-TW!2stw"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bg-light py-5">
    <div class="container reveal">
      <h3 class="text-center fw-bold mb-5 title-serif">常見問題</h3>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="accordion" id="faqAccordion">

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Q1. 請問產品需要冷藏嗎？
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body text-muted">
                  大部分的手工餅乾與常溫蛋糕建議放置於陰涼處保存即可。若是含鮮奶油的甜點（如生乳捲、莓果盒子）則必須冷藏，離開冰箱請勿超過 1 小時。
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Q2. 可以線上預訂店取嗎？
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body text-muted">
                  可以的！您可以在「線上訂購」頁面選擇商品，結帳時運送方式選擇「門市自取」，我們將會為您保留商品。
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Q3. 是否提供大量訂購或彌月禮盒優惠？
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div class="accordion-body text-muted">
                  有的，針對彌月禮盒、婚禮小物或企業送禮，滿 30 盒以上皆有專屬優惠折扣。歡迎透過電話洽詢。
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

let observer = null

onMounted(() => {
  const revealElements = document.querySelectorAll('.reveal')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active')
          }, index * 100)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  revealElements.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
:root {
  --brand-color: #cf2e5a;
  --brand-hover: #a81c42;
  --text-gray: #555;
  --bg-gray: #f9f9f9;
}

/* Page Header */
.page-header {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
}
.page-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.title-serif {
  font-family: 'Noto Serif TC', serif;
}

/* Breadcrumb */
.breadcrumb-section {
  background-color: #f0f0f0;
  padding: 10px 0;
}
.breadcrumb {
  margin-bottom: 0;
  font-size: 0.9rem;
}
.breadcrumb-item a {
  color: #777;
  text-decoration: none;
}
.breadcrumb-item.active {
  color: var(--brand-color);
}

/* Info Card */
.contact-info-card {
  background: white;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.03);
}
.contact-info-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  border-color: var(--brand-color);
}

.icon-box {
  width: 70px;
  height: 70px;
  background-color: rgba(207, 46, 90, 0.1);
  color: var(--brand-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s;
}
.contact-info-card:hover .icon-box {
  transform: scale(1.1) rotate(10deg);
  background-color: var(--brand-color);
  color: white;
}

/* Map */
.map-wrapper {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  height: 450px;
  width: 100%;
}

/* Scroll Reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Accordion */
.accordion-button:not(.collapsed) {
  color: var(--brand-color);
  background-color: rgba(207, 46, 90, 0.05);
  box-shadow: inset 0 -1px 0 rgba(0,0,0,.125);
}
.accordion-button:focus {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 0.25rem rgba(207, 46, 90, 0.25);
}
</style>
