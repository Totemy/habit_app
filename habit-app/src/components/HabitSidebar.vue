<script setup lang="ts">
import { computed, inject } from 'vue'
import type { useHabitManager } from '../composables/useHabitManager'
import HabitSidebarItem from './HabitSidebarItem.vue'
import HabitForm from './HabitForm.vue'

const habitManager = inject<ReturnType<typeof useHabitManager>>('habitManager')
if (!habitManager) throw new Error('habitManager not provided')

const habits = computed(() => habitManager.habits.value)
</script>
<template>
  <div class="space-y-3">
    <HabitSidebarItem
      v-for="habit in habits"
      :key="habit.id"
      :habit="habit"
      :active="habitManager.active.value?.id === habit.id"
      @click="habitManager.setActive(habit.id)"
      @delete="habitManager.remove(habit.id)"
      @rename="(title: string) => habitManager.rename(habit.id, title)"
    />

    <button class="button w-full mt-4" @click="habitManager.openCreate()">
      Create new habit
    </button>

    <HabitForm
      v-if="habitManager.showCreate.value"
      @submit="
        (title, count, color) => {
          habitManager.add(title, count, color)
          habitManager.closeCreate()
        }
      "
      @close="habitManager.closeCreate()"
    />
  </div>
</template>
