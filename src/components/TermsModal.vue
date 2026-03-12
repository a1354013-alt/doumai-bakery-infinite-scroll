<template>
  <div class="modal-backdrop fade show" @click.self="$emit('close')">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-light border-0 p-4">
          <h5 class="modal-title fw-bold serif-font">服務條款與隱私權政策</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body p-4 overflow-auto" style="max-height: 60vh;">
          <div class="terms-content">
            <h6 class="fw-bold mb-3">1. 訂購須知</h6>
            <p class="text-muted small mb-4">
              多麥健康烘焙（以下簡稱本公司）所販售之產品皆為每日現做，不含防腐劑。為確保產品品質，請於收到產品後依照包裝說明進行保存。
              若因個人保存不當導致產品變質，本公司恕不負責。
            </p>

            <h6 class="fw-bold mb-3">2. 配送說明</h6>
            <p class="text-muted small mb-4">
              我們委託專業物流公司進行配送。由於烘焙產品較為脆弱，配送過程中若有輕微碰撞導致外觀受損，在不影響食用的情況下，恕不接受退換貨。
              若產品有嚴重毀損，請於收到當下拍照存證並聯繫客服。
            </p>

            <h6 class="fw-bold mb-3">3. 退換貨政策</h6>
            <p class="text-muted small mb-4">
              依據消保法規定，烘焙產品屬於「易於腐敗、保存期限較短」之商品，不適用七天鑑賞期。
              除產品本身瑕疵或品項錯誤外，恕不接受退換貨。
            </p>

            <h6 class="fw-bold mb-3">4. 隱私權保護</h6>
            <p class="text-muted small mb-4">
              您所提供的個人資料（姓名、電話、地址）僅用於訂單處理與配送。我們承諾不會將您的資料提供給第三方機構，除非法律另有規定。
            </p>

            <div class="alert alert-warning small">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              點擊「我同意」即代表您已詳閱並接受上述所有條款。
            </div>
          </div>
        </div>
        <div class="modal-footer border-0 p-4">
          <button type="button" class="btn btn-brand px-5 rounded-pill" @click="$emit('close')">我同意並關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
}

.modal-content {
  border-radius: 20px;
}

.serif-font {
  font-family: 'Noto Serif TC', serif;
}

.btn-brand {
  background-color: var(--brand-color);
  color: white;
}

.terms-content p {
  line-height: 1.8;
}
</style>
