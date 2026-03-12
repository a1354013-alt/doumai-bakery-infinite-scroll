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
