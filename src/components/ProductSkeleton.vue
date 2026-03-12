<template>
  <div class="skeleton-card card border-0 shadow-sm h-100">
    <!-- 圖片佔位 -->
    <div class="skeleton-img"></div>
    
    <div class="card-body p-4">
      <!-- 分類標籤佔位 -->
      <div class="skeleton-badge mb-2"></div>
      
      <!-- 標題佔位 -->
      <div class="skeleton-title mb-3"></div>
      
      <!-- 價格與按鈕佔位 -->
      <div class="d-flex justify-content-between align-items-center mt-auto">
        <div class="skeleton-price"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  overflow: hidden;
  background: white;
  border-radius: 12px;
}

.skeleton-img {
  width: 100%;
  height: 240px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.skeleton-badge {
  width: 60px;
  height: 20px;
  background: #f0f0f0;
  border-radius: 10px;
}

.skeleton-title {
  width: 80%;
  height: 24px;
  background: #f0f0f0;
  border-radius: 4px;
}

.skeleton-price {
  width: 80px;
  height: 28px;
  background: #f0f0f0;
  border-radius: 4px;
}

.skeleton-button {
  width: 100px;
  height: 38px;
  background: #f0f0f0;
  border-radius: 20px;
}

/* 呼吸燈動畫 */
.skeleton-img::after,
.skeleton-badge::after,
.skeleton-title::after,
.skeleton-price::after,
.skeleton-button::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
