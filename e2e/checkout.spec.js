import { test, expect } from '@playwright/test';

test.describe('電商完整購買流程 E2E 測試', () => {
  
  test('使用者應能從首頁加入商品並完成結帳流程', async ({ page }) => {
    // 1. 進入首頁
    await page.goto('/');
    await expect(page).toHaveTitle(/多麥烘焙/);

    // 2. 在首頁加入熱門商品
    const addToCartBtn = page.locator('button:has-text("加入購物車")').first();
    await addToCartBtn.click();
    
    // 驗證 Toast 提示是否出現
    await expect(page.locator('.toast-body')).toBeVisible();

    // 3. 進入購物車頁面
    await page.click('a[href="/cart"]');
    await expect(page).toHaveURL(/\/cart/);
    
    // 驗證商品是否在購物車中
    const cartItem = page.locator('.cart-item');
    await expect(cartItem).toBeVisible();

    // 4. 進入結帳頁面
    await page.click('text=前往結帳');
    await expect(page).toHaveURL(/\/checkout/);

    // 5. 填寫結帳表單
    await page.fill('input[name="name"]', '測試人員');
    await page.fill('input[name="phone"]', '0912345678');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="address"]', '台北市信義區測試路 100 號');
    await page.check('input[id="credit"]'); // 選擇信用卡

    // 6. 提交訂單
    await page.click('button:has-text("確認下單")');

    // 7. 驗證成功頁面
    await expect(page.locator('text=訂單已成功送出')).toBeVisible();
    
    // 驗證購物車是否已清空 (導覽列數字應消失)
    const cartBadge = page.locator('.cart-badge');
    await expect(cartBadge).not.toBeVisible();
  });

  test('免運進度條應根據金額動態更新', async ({ page }) => {
    await page.goto('/products');
    
    // 加入一個低價商品
    await page.locator('button:has-text("加入購物車")').first().click();
    await page.click('a[href="/cart"]');
    
    // 驗證進度條顯示「還差 NT.」
    await expect(page.locator('text=還差 NT.')).toBeVisible();
    await expect(page.locator('text=NT. 100')).toBeVisible(); // 應有運費

    // 回到產品頁加入更多商品以達免運 (1000元)
    await page.goto('/products');
    for(let i=0; i<5; i++) {
      await page.locator('button:has-text("加入購物車")').nth(1).click();
    }
    
    await page.goto('/cart');
    // 驗證進度條顯示「已達標」
    await expect(page.locator('text=恭喜！您已獲得免運優惠')).toBeVisible();
    await expect(page.locator('text=免運費')).toBeVisible();
  });
});
