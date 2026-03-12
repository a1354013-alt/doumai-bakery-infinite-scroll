# 多麥健康烘焙 (Doumai Bakery) - 前端作品

這是一個基於 **Vue 3 + Vite** 開發的烘焙電商前端專案。本專案經過多輪迭代與深度優化，旨在展現一個**工業級**前端應用所應具備的**架構設計、效能策略、測試覆蓋與產品思維**。

## 🚀 專案特色與技術亮點 (面試加分項)

本專案已從基礎原型進化為具備**工業級標準**的前端應用，整合了多項進階技術與工程實踐：

### 1. 核心技術棧
- **前端框架**：Vue 3 (Composition API)
- **構建工具**：Vite
- **狀態管理**：Pinia (實現購物車、優惠券、免運狀態管理)
- **表單驗證**：VeeValidate + Yup (實現結帳頁面嚴謹驗證)
- **測試套件**：Vitest (單元測試) + Playwright (E2E 測試)

### 2. 工程化與品質
- **程式碼分割**：實現路由級別 Lazy Loading 與組件級別 `defineAsyncComponent` (非同步載入服務條款彈窗)，優化 JS Bundle Size。
- **測試覆蓋**：具備單元測試（覆蓋購物車邊界條件）與 E2E 測試（覆蓋完整購買流）。
- **架構設計**：實作資料驅動的 Navbar/Footer，組件化重構 ProductCard，提升可維護性。

### 3. 效能與 UX 優化
- **圖片優化**：圖片延遲載入 (`loading="lazy"`) 搭配 **骨架屏 (Skeleton Screen)**，減少 CLS，提升感知性能。
- **互動體驗**：實作 **Intersection Observer** 驅動的無限捲動 (Infinite Scroll) 於產品與新聞頁面。
- **商業思維**：實作**智慧免運進度條**與**優惠券系統**，透過 UX 巧思提升平均客單價 (AOV)。
- **Web 標準**：基礎 A11Y 優化與 SEO Meta Tag 配置。

## 📦 安裝與運行

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 運行單元測試
npm run test:unit

# 運行 E2E 測試
npm run test:e2e

# 構建生產版本
npm run build
```
