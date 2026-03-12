<template>
  <div class="about-page">
    <!-- Header -->
    <header class="page-header">
      <h1 class="page-title">品牌故事</h1>
    </header>

    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/">首頁</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">關於我們</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Section 1 -->
    <section class="content-section container">
      <div class="row align-items-center">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img src="/images/about2.png" alt="烘焙起源" class="img-fluid rounded-img" loading="lazy" />
        </div>
        <div class="col-lg-6 ps-lg-5">
          <h5 class="text-brand ls-2 mb-3">SINCE 1993</h5>
          <h2 class="serif-font mb-4">從一個小烤箱開始的堅持</h2>
          <p class="mb-4">
            多麥烘焙的故事，始於三十年前一個充滿麵粉香氣的小廚房。我們的創辦人林師傅，憑藉著對烘焙的熱愛，
            堅持不使用化學添加物，只為了烤出一顆讓家人也能安心食用的麵包。
          </p>
          <p>
            「蒜香酥片」是我們最驕傲的起點，選用在地蒜頭低溫烘烤，那份樸實卻濃郁的香氣，串起了鄰里之間的情感。
            這不僅僅是一份甜點，更是我們想傳遞的——家鄉的溫暖味道。
          </p>
        </div>
      </div>
    </section>

    <!-- Section 2 -->
    <section class="bg-light content-section">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="serif-font text-brand">我們的堅持</h2>
          <p class="text-muted">Simple ingredients, extraordinary taste.</p>
        </div>

        <div class="row text-center g-4">
          <div class="col-md-4">
            <div class="p-4 bg-white shadow-sm h-100 rounded">
              <i class="bi bi-flower1 feature-icon"></i>
              <h4 class="mb-3 serif-font">嚴選天然食材</h4>
              <p class="text-muted">
                拒絕人工香精與色素，堅持使用進口奶油、在地小農鮮乳與新鮮蔬果，還原食物最純粹的美味。
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="p-4 bg-white shadow-sm h-100 rounded">
              <i class="bi bi-clock-history feature-icon"></i>
              <h4 class="mb-3 serif-font">長時間低溫發酵</h4>
              <p class="text-muted">
                美味需要等待。我們採用老麵與天然酵母，經過12小時以上的低溫熟成，讓麵包組織更細緻、保濕。
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="p-4 bg-white shadow-sm h-100 rounded">
              <i class="bi bi-heart feature-icon"></i>
              <h4 class="mb-3 serif-font">職人手作溫度</h4>
              <p class="text-muted">
                機器無法取代雙手的觸感。每一顆麵團都經過師傅的揉捏、整型，注入了我們對烘焙的熱情與祝福。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Parallax -->
    <section class="parallax-about">
      <div class="parallax-overlay"></div>
      <div class="parallax-content">
        <h2 class="serif-font mb-4">「 用烘焙，拉近你我的關係 」</h2>
        <p class="lead">
          我們不只販售麵包，更販售一種生活的態度。<br />在每一個清晨與午後，為您帶來剛出爐的幸福。
        </p>
      </div>
    </section>

    <!-- Section 3 -->
    <section class="content-section container">
      <div class="row align-items-center flex-row-reverse">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img src="/images/about3.png" alt="舒適空間" class="img-fluid rounded-img" loading="lazy" />
        </div>

        <div class="col-lg-6 pe-lg-5">
          <h5 class="text-brand ls-2 mb-3">OUR SPACE</h5>
          <h2 class="serif-font mb-4">舒適溫馨的品味空間</h2>
          <p class="mb-4">
            走進多麥，映入眼簾的是木質調的溫暖裝潢與撲鼻而來的咖啡香。我們希望這裡不只是一個買麵包的地方，
            更是您暫時遠離塵囂、享受片刻寧靜的避風港。
          </p>
          <p>
            無論是享用一份剛烤好的厚片吐司，還是品嚐一杯手沖咖啡，我們都歡迎您隨時光臨，感受這份專屬於多麥的愜意。
          </p>

          <RouterLink to="/store" class="btn btn-outline-brand rounded-0 mt-3 px-4">
            查看門市資訊
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.about-page {
  color: var(--text-gray);
}

.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
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

.content-section {
  padding: 6rem 0;
}

.text-brand {
  color: var(--brand-color);
}

.serif-font {
  font-family: 'Noto Serif TC', serif;
}

.feature-icon {
  font-size: 3rem;
  color: var(--brand-color);
  margin-bottom: 1.5rem;
  display: block;
}

.parallax-about {
  background-image: url('/images/about.png');
  min-height: 450px;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}

.parallax-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  inset: 0;
}

.parallax-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
}

.rounded-img {
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.btn-outline-brand {
  border: 1px solid var(--brand-color);
  color: var(--brand-color);
  transition: all 0.3s;
}

.btn-outline-brand:hover {
  background-color: var(--brand-color);
  color: white;
}
</style>
