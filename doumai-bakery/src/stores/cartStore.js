import { defineStore } from 'pinia'
import { addToCartLogic, removeFromCartLogic, updateQuantityLogic, calculateTotal } from '@/utils/cartLogic'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    toastMessage: '',
    showToast: false
  }),
  
  getters: {
    totalAmount: (state) => calculateTotal(state.items),
    totalCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0)
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
    
    triggerToast(message) {
      this.toastMessage = message
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
})
