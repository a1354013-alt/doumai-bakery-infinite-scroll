# 多麥健康烘焙 (Doumai Bakery) - 前端重構版

這是一個基於 **Vue 3 + Vite** 開發的烘焙電商前端專案。本版本經過深度重構，旨在展現專業的前端工程化實踐與效能優化技術。

## 🚀 重構亮點

### 1. 組件化開發 (Component-Based Architecture)
- **獨立 ProductCard 組件**：將產品卡片邏輯抽離，實現首頁與產品列表頁的高度複用。
- **佈局統一化**：利用 `AppLayout` 統一管理全站導覽列與頁尾，移除各頁面冗餘程式碼，符合 DRY 原則。

### 2. 效能優化 (Performance Optimization)
- **路由懶載入 (Lazy Loading)**：使用動態導入 `import()` 拆分代碼塊，大幅減少首屏載入時間。
- **圖片載入優化**：全面實作 `loading="lazy"` 並優化圖片容器比例，減少佈局偏移 (CLS)。
- **平滑滾動與狀態保持**：優化 `scrollBehavior`，確保頁面切換時的流暢體驗。

### 3. 工程化規範
- **路徑別名**：使用 `@` 指向 `src` 目錄，簡化導入路徑。
- **全域樣式管理**：集中管理 CSS 變數，確保品牌視覺一致性。

### 4. 非功能性需求 (Non-Functional Requirements)
- **可訪問性 (A11Y)**：遵循語義化 HTML 規範，為互動元件加入 `aria-label`，確保螢幕閱讀器友善。
- **單元測試 (Unit Testing)**：配置 **Vitest** 環境，並針對購物車核心邏輯編寫測試案例 (`src/utils/cartLogic.spec.js`)，展現對程式碼品質的嚴謹態度。
- **SEO 優化**：配置完整的 Meta Tags 與 Open Graph 協定，並實作動態頁面標題管理。
- **端到端測試 (E2E Testing)**：配置 **Playwright** 測試框架，並編寫完整購買流測試案例 (`e2e/checkout.spec.js`)，確保核心使用者旅程的穩定性。

### 5. 使用者體驗 (UX) 巧思
- **智慧免運進度條**：在購物車中實作動態進度條，即時計算免運門檻差額。這不僅提升了使用者體驗，更展現了開發者對商業指標（如提升客單價）的敏感度。
- **即時回饋系統**：整合 Pinia 與 Toast 元件，確保使用者的每個操作（如加入購物車）都有明確的視覺回饋。

## 🛠 技術棧
- **框架**: Vue 3 (Composition API)
- **構建工具**: Vite
- **路由**: Vue Router 4
- **UI 框架**: Bootstrap 5 + Bootstrap Icons

## 📦 安裝與運行

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 構建生產版本
npm run build
```

## 📝 未來展望
- 引入 **Pinia** 實作購物車狀態持久化。
- 遷移至 **TypeScript** 提升型別安全性。
- 實作 **VeeValidate** 進行表單驗證。
