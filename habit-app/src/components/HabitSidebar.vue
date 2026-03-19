<script setup lang="ts">
import { computed, inject } from 'vue'
import type { useHabitManager } from '../composables/useHabitManager'
import HabitSidebarItem from './HabitSidebarItem.vue'
import HabitForm from './HabitForm.vue'
import { useContextMenu } from '../composables/useContextMenu'
import { getMenu } from '../utils/getHabitMenu'
import ContextMenu from './ContextMenu.vue'

const emit = defineEmits<{ (e: 'close'): void }>()

const habitManager = inject<ReturnType<typeof useHabitManager>>('habitManager')
if (!habitManager) throw new Error('habitManager not provided')

const { state, open } = useContextMenu()

const habits = computed(() => habitManager.habits.value)

const selectHabit = (id: string) => {
  habitManager.setActive(id)
  emit('close')
}
</script>
<template>
  <div class="space-y-3">
    <HabitSidebarItem
      v-for="habit in habits"
      :key="habit.id"
      :habit="habit"
      :is-active="habitManager.activeHabitId.value === habit.id"
      :is-editing="habitManager.editingHabitId.value === habit.id"
      :is-resizing="habitManager.resizeHabitId.value === habit.id"
      @click="selectHabit(habit.id)"
      @rename="(title: string) => habitManager.rename(habit.id, title)"
      @resize="(count: number) => habitManager.resize(habit.id, count)"
      @contextmenu.prevent="
        (e: MouseEvent) => {
          open(e, getMenu(habit, habitManager))
        }
      "
      @open-menu="(e: MouseEvent) => open(e, getMenu(habit, habitManager))"
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
    <Teleport to="body">
      <ContextMenu v-if="state.visible" :state="state" />
    </Teleport>
  </div>
</template>
