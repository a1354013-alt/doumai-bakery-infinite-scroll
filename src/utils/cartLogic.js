/**
 * 購物車核心邏輯 (進階版)
 * 包含邊界條件處理：庫存檢查、最小/最大數量限制
 */

export const calculateTotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) return 0;
  return items.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return total + (price * quantity);
  }, 0);
};

export const addToCartLogic = (currentCart, product, stockLimit = 99) => {
  const existingItem = currentCart.find(item => item.id === product.id);
  
  if (existingItem) {
    // 邊界檢查：是否超過庫存
    if (existingItem.quantity >= stockLimit) {
      return currentCart; // 超過庫存則不增加
    }
    
    return currentCart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
  }
  
  // 邊界檢查：庫存為 0 時不能加入
  if (stockLimit <= 0) return currentCart;

  return [...currentCart, { ...product, quantity: 1 }];
};

export const updateQuantityLogic = (currentCart, productId, newQuantity, stockLimit = 99) => {
  // 邊界檢查：數量不能小於 1，不能大於庫存
  const validatedQuantity = Math.max(1, Math.min(newQuantity, stockLimit));
  
  return currentCart.map(item => 
    item.id === productId 
      ? { ...item, quantity: validatedQuantity } 
      : item
  );
};

export const removeFromCartLogic = (currentCart, productId) => {
  return currentCart.filter(item => item.id !== productId);
};
