<script setup lang="ts">
import { computed, inject } from 'vue'
import type { useHabitManager } from '../composables/useHabitManager'
import HabitSidebarItem from './HabitSidebarItem.vue'
import HabitForm from './HabitForm.vue'
import { useContextMenu } from '../composables/useContextMenu'
import { getMenu } from '../utils/getHabitMenu'
import ContextMenu from './ContextMenu.vue'

const habitManager = inject<ReturnType<typeof useHabitManager>>('habitManager')
if (!habitManager) throw new Error('habitManager not provided')

const { state, open } = useContextMenu()

const habits = computed(() => habitManager.habits.value)
</script>
<template>
  <div class="space-y-3">
    <HabitSidebarItem
      v-for="habit in habits"
      :key="habit.id"
      :habit="habit"
      :is-active="habitManager.activeHabitId.value === habit.id"
      :is-editing="habitManager.editingHabitId.value === habit.id"
      @click="habitManager.setActive(habit.id)"
      @rename="(title: string) => habitManager.rename(habit.id, title)"
      @mark-as-editing="habitManager.markAsEditing(habit.id)"
      @contextmenu.prevent="
        (e) => {
          open(e, getMenu(habit, habitManager))
        }
      "
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
    <ContextMenu v-if="state.visible === true" :state="state" />
  </div>
</template>
