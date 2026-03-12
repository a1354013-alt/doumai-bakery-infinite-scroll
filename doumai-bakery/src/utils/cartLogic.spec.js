import { describe, it, expect } from 'vitest';
import { calculateTotal, addToCartLogic, updateQuantityLogic } from './cartLogic';

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

});
