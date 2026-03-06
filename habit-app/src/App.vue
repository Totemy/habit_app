<script setup lang="ts">
import HabitList from './components/HabitList.vue'
</script>

<template>
    <div class="app">
        <div class="container">
            <HabitList />
        </div>
    </div>
</template>
<style lang="css" scoped>
.app {
    background-color: #0d1117;
    color: #f0efdb;
}
.container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
}
@media (max-width: 768px) {
    .container {
        padding: 0 16px;
    }
}
</style>
