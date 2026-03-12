<template>
  <div class="breadcrumb-section">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/">首頁</RouterLink>
          </li>
          <li 
            v-for="(item, index) in items" 
            :key="index" 
            class="breadcrumb-item" 
            :class="{ active: index === items.length - 1 }"
            :aria-current="index === items.length - 1 ? 'page' : undefined"
          >
            <RouterLink v-if="index !== items.length - 1" :to="item.path">
              {{ item.name }}
            </RouterLink>
            <span v-else>{{ item.name }}</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  items: {
    type: Array,
    required: true,
    // 預期格式: [{ name: '最新商品', path: '/products' }]
  }
})
</script>

<style scoped>
.breadcrumb-section {
  background-color: #f8f9fa;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.breadcrumb {
  margin-bottom: 0;
  font-size: 0.9rem;
}

.breadcrumb-item a {
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb-item a:hover {
  color: var(--brand-color);
}

.breadcrumb-item.active {
  color: var(--brand-color);
  font-weight: 500;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  font-size: 1.2rem;
  line-height: 1;
  vertical-align: middle;
}
</style>
