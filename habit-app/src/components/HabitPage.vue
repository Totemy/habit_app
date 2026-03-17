<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useHabitManager } from '../composables/useHabitManager'
import HabitDetails from './HabitDetails.vue'
import HabitSidebar from './HabitSidebar.vue'

const habitManager = useHabitManager()
provide('habitManager', habitManager)
habitManager.add('Workout', 7, 'red')
habitManager.add('English', 5, 'green')
const activeHabit = computed(() => habitManager.active.value)
</script>
<template>
  <div class="min-h-screen flex">
    <HabitSidebar class="sidebar" />
    <div class="flex-1 page">
      <HabitDetails v-if="activeHabit" :habit="activeHabit" />
    </div>
  </div>
</template>
