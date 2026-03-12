import { describe, it, expect } from 'vitest';
import { calculateTotal, calculateDiscount, addToCartLogic, updateQuantityLogic } from './cartLogic';

describe('購物車進階邏輯與邊界條件測試', () => {
  
  // 測試案例 1: 基礎計算
  it('1. 應該能正確計算多個項目的總金額', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 250, quantity: 1 }
    ];
    expect(calculateTotal(items)).toBe(450);
  });

  // 測試案例 2: 空值處理 (邊界條件)
  it('2. 當購物車為空或資料異常時，總金額應回傳 0', () => {
    expect(calculateTotal([])).toBe(0);
    expect(calculateTotal(null)).toBe(0);
    expect(calculateTotal([{ price: 'invalid', quantity: 1 }])).toBe(0);
  });

  // 測試案例 3: 庫存限制 (邊界條件)
  it('3. 加入商品時不應超過庫存限制', () => {
    const stockLimit = 5;
    const cart = [{ id: 'p1', title: '麵包', price: 50, quantity: 5 }];
    const product = { id: 'p1', title: '麵包', price: 50 };
    
    const newCart = addToCartLogic(cart, product, stockLimit);
    expect(newCart[0].quantity).toBe(5); // 數量應維持 5，不應變 6
  });

  // 測試案例 4: 零庫存處理 (邊界條件)
  it('4. 當庫存為 0 時，不應允許將商品加入購物車', () => {
    const cart = [];
    const product = { id: 'p1', title: '麵包', price: 50 };
    const newCart = addToCartLogic(cart, product, 0);
    
    expect(newCart).toHaveLength(0);
  });

  // 測試案例 5: 最小數量限制 (邊界條件)
  it('5. 更新數量時，不應允許數量小於 1', () => {
    const cart = [{ id: 'p1', title: '麵包', price: 50, quantity: 3 }];
    const newCart = updateQuantityLogic(cart, 'p1', 0); // 嘗試設為 0
    
    expect(newCart[0].quantity).toBe(1); // 應自動修正為 1
  });

  // 測試案例 6: 最大數量限制 (邊界條件)
  it('6. 更新數量時，不應允許超過庫存上限', () => {
    const stockLimit = 10;
    const cart = [{ id: 'p1', title: '麵包', price: 50, quantity: 5 }];
    const newCart = updateQuantityLogic(cart, 'p1', 99, stockLimit); // 嘗試設為 99
    
    expect(newCart[0].quantity).toBe(10); // 應自動修正為庫存上限 10
  });

  // --- 優惠券折扣測試 (新增) ---
  describe('優惠券折扣邏輯測試', () => {
    it('7. 應正確計算固定金額折扣', () => {
      const subtotal = 500;
      const coupon = { type: 'fixed', value: 100 };
      expect(calculateDiscount(subtotal, coupon)).toBe(100);
    });

    it('8. 應正確計算百分比折扣並處理四捨五入', () => {
      const subtotal = 1000;
      const coupon = { type: 'percent', value: 12 }; // 88折 = 12% off
      expect(calculateDiscount(subtotal, coupon)).toBe(120);
      
      // 測試不整除的情況
      const subtotal2 = 125;
      expect(calculateDiscount(subtotal2, coupon)).toBe(15); // 125 * 0.12 = 15
    });

    it('9. 邊界條件：當折扣金額大於小計時，折扣金額應等於小計 (總價歸零，不為負數)', () => {
      const subtotal = 50;
      const coupon = { type: 'fixed', value: 100 };
      // 折扣 100 但總價只有 50，折扣應限制在 50
      expect(calculateDiscount(subtotal, coupon)).toBe(50);
    });

    it('10. 邊界條件：當小計為 0 時，折扣金額應為 0', () => {
      const subtotal = 0;
      const coupon = { type: 'fixed', value: 100 };
      expect(calculateDiscount(subtotal, coupon)).toBe(0);
    });
  });
});
