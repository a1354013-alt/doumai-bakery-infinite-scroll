<template>
  <div class="checkout-page">
    <header class="page-header">
      <h1 class="page-title">結帳付款</h1>
    </header>

    <AppBreadcrumb :items="[{ name: '購物車', path: '/cart' }, { name: '結帳', path: '/checkout' }]" />

    <section class="container py-5">
      <div class="row g-5">
        <!-- 左側：結帳表單 -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm p-4 p-md-5 rounded-4">
            <h4 class="fw-bold mb-4 serif-font">收件人資訊</h4>
            
            <form @submit="onSubmit">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">姓名</label>
                  <input v-model="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" placeholder="請輸入真實姓名">
                  <div class="invalid-feedback">{{ errors.name }}</div>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">電話</label>
                  <input v-model="phone" type="tel" class="form-control" :class="{ 'is-invalid': errors.phone }" placeholder="0912345678">
                  <div class="invalid-feedback">{{ errors.phone }}</div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">電子郵件</label>
                  <input v-model="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" placeholder="example@mail.com">
                  <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">配送地址</label>
                  <input v-model="address" type="text" class="form-control" :class="{ 'is-invalid': errors.address }" placeholder="請輸入詳細地址">
                  <div class="invalid-feedback">{{ errors.address }}</div>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">備註 (選填)</label>
                  <textarea class="form-control" rows="3" placeholder="有什麼想告訴我們的嗎？"></textarea>
                </div>
              </div>

              <hr class="my-4">

              <h4 class="fw-bold mb-4 serif-font">付款方式</h4>
              <div class="payment-options">
                <div class="form-check mb-3 p-3 border rounded-3" :class="{ 'border-brand bg-light-brand': paymentMethod === 'credit' }">
                  <input v-model="paymentMethod" class="form-check-input ms-0 me-3" type="radio" name="payment" id="credit" value="credit">
                  <label class="form-check-label fw-bold" for="credit">
                    信用卡付款 <i class="bi bi-credit-card ms-2"></i>
                  </label>
                </div>
                <div class="form-check mb-3 p-3 border rounded-3" :class="{ 'border-brand bg-light-brand': paymentMethod === 'transfer' }">
                  <input v-model="paymentMethod" class="form-check-input ms-0 me-3" type="radio" name="payment" id="transfer" value="transfer">
                  <label class="form-check-label fw-bold" for="transfer">
                    銀行轉帳 <i class="bi bi-bank ms-2"></i>
                  </label>
                </div>
              </div>

              <div class="form-check mt-4 mb-4">
                <input class="form-check-input" type="checkbox" id="terms" required>
                <label class="form-check-label small" for="terms">
                  我已閱讀並同意 <a href="#" @click.prevent="showTerms = true" class="text-brand text-decoration-underline">服務條款與隱私權政策</a>
                </label>
              </div>

              <button type="submit" class="btn btn-brand w-100 py-3 rounded-pill fw-bold" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                確認下單 (NT. {{ cartStore.totalAmount }})
              </button>
            </form>
          </div>
        </div>

        <!-- 右側：訂單摘要 -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm p-4 rounded-4 sticky-top" style="top: 100px;">
            <h4 class="fw-bold mb-4 serif-font">訂單摘要</h4>
            
            <div class="order-items mb-4">
              <div v-for="item in cartStore.items" :key="item.id" class="d-flex align-items-center mb-3">
                <img :src="item.image || item.img" class="rounded-3 me-3" style="width: 60px; height: 60px; object-fit: cover;">
                <div class="flex-grow-1">
                  <div class="fw-bold small">{{ item.title }}</div>
                  <div class="text-muted x-small">數量：{{ item.quantity }}</div>
                </div>
                <div class="fw-bold">NT. {{ item.price * item.quantity }}</div>
              </div>
            </div>

            <div class="summary-details bg-light p-3 rounded-3">
              <div class="d-flex justify-content-between mb-2">
                <span>商品小計</span>
                <span>NT. {{ cartStore.subtotal }}</span>
              </div>
              <div v-if="cartStore.discountAmount > 0" class="d-flex justify-content-between mb-2 text-danger">
                <span>優惠折抵 ({{ cartStore.couponCode }})</span>
                <span>- NT. {{ cartStore.discountAmount }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>運費</span>
                <span>{{ cartStore.shippingFee === 0 ? '免運費' : 'NT. ' + cartStore.shippingFee }}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between h5 fw-bold mb-0">
                <span>總計</span>
                <span class="text-brand">NT. {{ cartStore.totalAmount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 非同步載入的彈窗 (Code Splitting 展示) -->
    <TermsModal v-if="showTerms" @close="showTerms = false" />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'

// 非同步載入服務條款組件 (Code Splitting)
const TermsModal = defineAsyncComponent({
  loader: () => import('@/components/TermsModal.vue'),
  loadingComponent: { template: '<div class="text-center p-5"><div class="spinner-border text-brand"></div></div>' },
  delay: 200
})

const router = useRouter()
const cartStore = useCartStore()
const paymentMethod = ref('credit')
const showTerms = ref(false)
const isSubmitting = ref(false)

// 表單驗證規則
const schema = yup.object({
  name: yup.string().required('請輸入姓名'),
  phone: yup.string().required('請輸入電話').matches(/^09\d{8}$/, '請輸入正確的手機格式'),
  email: yup.string().required('請輸入電子郵件').email('請輸入正確的 Email 格式'),
  address: yup.string().required('請輸入配送地址')
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema
})

const { value: name } = useField('name')
const { value: phone } = useField('phone')
const { value: email } = useField('email')
const { value: address } = useField('address')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  
  // 模擬 API 請求
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  alert('訂單已成功建立！訂單編號：DM' + Date.now())
  cartStore.clearCart()
  router.push('/')
})
</script>

<style scoped>
.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1556742049-023b9f17bb7c?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.page-title {
  font-family: 'Noto Serif TC', serif;
  font-size: 2.5rem;
  font-weight: 700;
}

.serif-font {
  font-family: 'Noto Serif TC', serif;
}

.text-brand {
  color: var(--brand-color);
}

.btn-brand {
  background-color: var(--brand-color);
  color: white;
  transition: all 0.3s;
}

.btn-brand:hover {
  background-color: #8b4513;
  transform: translateY(-2px);
}

.border-brand {
  border-color: var(--brand-color) !important;
}

.bg-light-brand {
  background-color: rgba(139, 69, 19, 0.05);
}

.x-small {
  font-size: 0.75rem;
}

.form-control:focus {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 0.25rem rgba(139, 69, 19, 0.1);
}
</style>
