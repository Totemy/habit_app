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
const sidebarOpen = ref(false)
</script>
<template>
  <div class="min-h-screen flex">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 z-20 md:hidden"
      @click="sidebarOpen = false"
    />
    <HabitSidebar
      class="sidebar fixed top-0 left-0 h-full z-30 transition-transform duration-300 md:static md:h-auto md:z-auto md:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      @close="sidebarOpen = false"
    />
    <div class="flex-1 page">
      <header
        class="flex items-center gap-3 p-4 border-b border-[#30363d] md:hidden"
      >
        <button
          class="text-gray-400 hover:text-white transition"
          @click="sidebarOpen = !sidebarOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span class="font-semibold">{{ activeHabit?.title ?? 'Habits' }}</span>
      </header>
      <div class="page">
        <HabitDetails
          v-if="activeHabit"
          :habit="activeHabit"
          :key="activeHabit.id"
        />
      </div>
    </div>
  </div>
</template>
