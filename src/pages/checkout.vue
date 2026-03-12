<template>
  <div class="checkout-page">
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">填寫結帳資訊</h1>
    </header>

    <AppBreadcrumb :items="[
      { name: '購物車', path: '/cart' },
      { name: '結帳', path: '/checkout' }
    ]" />

    <section class="container py-5">
      <div v-if="cartStore.items.length > 0" class="row g-5">
        <!-- 結帳表單 -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm p-4">
            <h4 class="fw-bold mb-4 title-serif">收件人資訊</h4>
            
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
              <div class="row g-3">
                <!-- 姓名 -->
                <div class="col-md-6">
                  <label for="name" class="form-label">收件人姓名</label>
                  <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" placeholder="請輸入姓名" />
                  <div class="invalid-feedback">{{ errors.name }}</div>
                </div>

                <!-- 電話 -->
                <div class="col-md-6">
                  <label for="phone" class="form-label">聯絡電話</label>
                  <Field name="phone" type="tel" class="form-control" :class="{ 'is-invalid': errors.phone }" placeholder="0912345678" />
                  <div class="invalid-feedback">{{ errors.phone }}</div>
                </div>

                <!-- Email -->
                <div class="col-12">
                  <label for="email" class="form-label">電子信箱</label>
                  <Field name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" placeholder="example@mail.com" />
                  <div class="invalid-feedback">{{ errors.email }}</div>
                </div>

                <!-- 地址 -->
                <div class="col-12">
                  <label for="address" class="form-label">收件地址</label>
                  <Field name="address" type="text" class="form-control" :class="{ 'is-invalid': errors.address }" placeholder="請輸入完整地址" />
                  <div class="invalid-feedback">{{ errors.address }}</div>
                </div>

                <!-- 付款方式 -->
                <div class="col-12 mt-4">
                  <h5 class="fw-bold mb-3">付款方式</h5>
                  <div class="payment-options">
                    <div class="form-check mb-2">
                      <Field name="payment" type="radio" value="credit_card" class="form-check-input" id="credit" />
                      <label class="form-check-label" for="credit">信用卡付款</label>
                    </div>
                    <div class="form-check mb-2">
                      <Field name="payment" type="radio" value="transfer" class="form-check-input" id="transfer" />
                      <label class="form-check-label" for="transfer">銀行轉帳</label>
                    </div>
                    <div class="form-check">
                      <Field name="payment" type="radio" value="cod" class="form-check-input" id="cod" />
                      <label class="form-check-label" for="cod">貨到付款</label>
                    </div>
                    <div class="text-danger small mt-1" v-if="errors.payment">{{ errors.payment }}</div>
                  </div>
                </div>

                <!-- 備註 -->
                <div class="col-12 mt-3">
                  <label for="note" class="form-label">訂單備註 (選填)</label>
                  <textarea class="form-control" rows="3" placeholder="有什麼想告訴我們的嗎？"></textarea>
                </div>

                <div class="col-12 mt-5">
                  <button type="submit" class="btn btn-brand w-100 py-3 fw-bold" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"></span>
                    確認下單
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <!-- 訂單摘要 -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm p-4 sticky-top" style="top: 100px;">
            <h4 class="fw-bold mb-4 title-serif">訂單摘要</h4>
            <div class="order-items mb-4">
              <div v-for="item in cartStore.items" :key="item.id" class="d-flex align-items-center mb-3">
                <img :src="item.image" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                <div class="flex-grow-1">
                  <h6 class="mb-0 small fw-bold">{{ item.title }}</h6>
                  <small class="text-muted">x {{ item.quantity }}</small>
                </div>
                <span class="fw-bold small">NT. {{ item.price * item.quantity }}</span>
              </div>
            </div>
            
            <hr>

            <!-- 優惠券輸入區 -->
            <div class="coupon-section mb-4">
              <div v-if="!cartStore.appliedCoupon" class="input-group input-group-sm">
                <input v-model="couponCode" type="text" class="form-control" placeholder="輸入折扣碼 (如: WELCOME50)">
                <button @click="handleApplyCoupon" class="btn btn-outline-brand" type="button">套用</button>
              </div>
              <div v-else class="applied-coupon d-flex justify-content-between align-items-center p-2 bg-light rounded">
                <span class="small text-success fw-bold">
                  <i class="bi bi-tag-fill me-1"></i>{{ cartStore.appliedCoupon.name }}
                </span>
                <button @click="cartStore.removeCoupon" class="btn btn-sm text-danger p-0"><i class="bi bi-x-circle"></i></button>
              </div>
              <div v-if="couponError" class="text-danger small mt-1">{{ couponError }}</div>
            </div>
            
            <div class="d-flex justify-content-between mb-2">
              <span>商品小計</span>
              <span>NT. {{ cartStore.subtotal }}</span>
            </div>
            <div v-if="cartStore.discountAmount > 0" class="d-flex justify-content-between mb-2 text-danger">
              <span>折扣金額</span>
              <span>- NT. {{ cartStore.discountAmount }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>運費</span>
              <span v-if="cartStore.totalAmount >= 1000" class="text-success">免運費</span>
              <span v-else>NT. 100</span>
            </div>
            <div class="d-flex justify-content-between mt-3 pt-3 border-top">
              <span class="h5 fw-bold">應付總額</span>
              <span class="h5 fw-bold text-brand">NT. {{ finalTotal }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 結帳成功狀態 -->
      <div v-else-if="isSuccess" class="text-center py-5">
        <div class="mb-4">
          <i class="bi bi-check-circle-fill display-1 text-success"></i>
        </div>
        <h2 class="fw-bold mb-3">訂單已成功送出！</h2>
        <p class="text-muted mb-5">感謝您的訂購，我們將盡快為您安排出貨。<br>訂單編號：#DM{{ Math.floor(Math.random() * 1000000) }}</p>
        <RouterLink to="/" class="btn btn-brand px-5 py-3">回到首頁</RouterLink>
      </div>

      <!-- 異常狀態 -->
      <div v-else class="text-center py-5">
        <h3 class="mb-4">購物車內尚無商品</h3>
        <RouterLink to="/products" class="btn btn-brand px-5 py-3">前往選購</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const cartStore = useCartStore()
const router = useRouter()
const isSubmitting = ref(false)
const isSuccess = ref(false)
const couponCode = ref('')
const couponError = ref('')

const finalTotal = computed(() => {
  return cartStore.totalAmount >= 1000 ? cartStore.totalAmount : cartStore.totalAmount + 100
})

const handleApplyCoupon = () => {
  couponError.ref = ''
  if (!couponCode.value) {
    couponError.value = '請輸入折扣碼'
    return
  }
  const result = cartStore.applyCoupon(couponCode.value)
  if (!result.success) {
    couponError.value = result.message
  } else {
    couponCode.value = ''
    couponError.value = ''
  }
}

// 定義驗證規則 (展現對資料嚴謹性的處理)
const schema = yup.object({
  name: yup.string().required('請輸入收件人姓名'),
  phone: yup.string().required('請輸入聯絡電話').matches(/^09\d{8}$/, '電話格式不正確 (需為 09 開頭 10 碼)'),
  email: yup.string().required('請輸入電子信箱').email('信箱格式不正確'),
  address: yup.string().required('請輸入收件地址'),
  payment: yup.string().required('請選擇付款方式')
})

const onSubmit = async (values) => {
  isSubmitting.value = true
  
  // 模擬 API 請求延遲
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  console.log('訂單資料：', {
    customer: values,
    items: cartStore.items,
    total: finalTotal.value
  })
  
  isSubmitting.value = false
  isSuccess.value = true
  
  // 結帳成功後清空購物車
  cartStore.items = []
  window.scrollTo(0, 0)
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80');
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

.title-serif {
  font-family: 'Noto Serif TC', serif;
}

.text-brand {
  color: var(--brand-color);
}

.btn-brand {
  background-color: var(--brand-color);
  color: white;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-brand:hover {
  background-color: var(--brand-hover);
  transform: translateY(-2px);
}

.form-control:focus {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 0.25rem rgba(207, 46, 90, 0.25);
}

.is-invalid {
  border-color: #dc3545;
}
</style>
