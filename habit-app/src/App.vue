<script setup lang="ts">
import HabitPage from './components/HabitPage.vue'
</script>

<template>
  <div class="app">
    <div class="">
      <HabitPage />
    </div>
  </div>
</template>
<style lang="css" scoped>
.app {
  background-color: #0d1117;
  color: #f0efdb;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
</style>
