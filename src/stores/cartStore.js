import { defineStore } from 'pinia'
import { addToCartLogic, removeFromCartLogic, updateQuantityLogic, calculateTotal } from '@/utils/cartLogic'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    appliedCoupon: null, // 儲存目前套用的優惠券資訊
    toastMessage: '',
    showToast: false
  }),
  
  getters: {
    // 商品原始小計
    subtotal: (state) => calculateTotal(state.items),
    
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    
    // 折扣金額計算
    discountAmount: (state) => {
      if (!state.appliedCoupon) return 0
      if (state.appliedCoupon.type === 'fixed') {
        return state.appliedCoupon.value
      } else if (state.appliedCoupon.type === 'percent') {
        return Math.round(calculateTotal(state.items) * (state.appliedCoupon.value / 100))
      }
      return 0
    },
    
    // 折扣後的小計 (不可小於 0)
    totalAmount: (state) => {
      const result = calculateTotal(state.items) - (state.appliedCoupon ? (state.appliedCoupon.type === 'fixed' ? state.appliedCoupon.value : Math.round(calculateTotal(state.items) * (state.appliedCoupon.value / 100))) : 0)
      return result > 0 ? result : 0
    }
  },
  
  actions: {
    addToCart(product) {
      this.items = addToCartLogic(this.items, product)
      this.triggerToast(`已將 ${product.title} 加入購物車`)
    },
    
    removeFromCart(productId) {
      this.items = removeFromCartLogic(this.items, productId)
    },
    
    updateQuantity(productId, quantity) {
      this.items = updateQuantityLogic(this.items, productId, quantity)
    },
    
    // 優惠券驗證邏輯 (模擬後端驗證)
    applyCoupon(code) {
      const coupons = {
        'WELCOME50': { code: 'WELCOME50', name: '新會員折價券', type: 'fixed', value: 50 },
        'DOUMAI100': { code: 'DOUMAI100', name: '多麥開幕慶', type: 'fixed', value: 100 },
        'HAPPY88': { code: 'HAPPY88', name: '限時 88 折', type: 'percent', value: 12 }
      }
      
      const coupon = coupons[code.toUpperCase()]
      if (coupon) {
        this.appliedCoupon = coupon
        this.triggerToast(`成功套用：${coupon.name}`)
        return { success: true, message: `已套用：${coupon.name}` }
      }
      return { success: false, message: '無效的折扣碼' }
    },
    
    removeCoupon() {
      this.appliedCoupon = null
      this.triggerToast('已移除優惠券')
    },
    
    triggerToast(message) {
      this.toastMessage = message
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    },
    
    clearCart() {
      this.items = []
      this.appliedCoupon = null
    }
  }
})
