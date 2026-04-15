<script setup lang="ts">
import { computed, inject, ref } from 'vue'
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
const draggedHabitId = ref<string | null>(null)
const dropTargetHabitId = ref<string | null>(null)

const selectHabit = (id: string) => {
  habitManager.setActive(id)
  emit('close')
}

const handleDragStart = (event: DragEvent, habitId: string) => {
  draggedHabitId.value = habitId

  if (!event.dataTransfer) return
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', habitId)
}

const handleDragOver = (event: DragEvent, targetId: string) => {
  event.preventDefault()

  if (draggedHabitId.value && draggedHabitId.value !== targetId) {
    dropTargetHabitId.value = targetId
  }
}

const handleDrop = (event: DragEvent, targetId: string) => {
  event.preventDefault()

  const draggedId = draggedHabitId.value
  if (!draggedId) return

  habitManager.reorder(draggedId, targetId)
  dropTargetHabitId.value = null
  draggedHabitId.value = null
}

const handleDragEnd = () => {
  dropTargetHabitId.value = null
  draggedHabitId.value = null
}
</script>
<template>
  <div class="space-y-3">
    <template v-for="habit in habits" :key="habit.id">
      <div
        v-if="dropTargetHabitId === habit.id"
        class="h-0.5 rounded-full bg-tahiti"
      />
      <div
        class="rounded-lg transition cursor-grab active:cursor-grabbing"
        draggable="true"
        @dragstart="(event: DragEvent) => handleDragStart(event, habit.id)"
        @dragover="(event: DragEvent) => handleDragOver(event, habit.id)"
        @drop="(event: DragEvent) => handleDrop(event, habit.id)"
        @dragend="handleDragEnd"
      >
        <HabitSidebarItem
          :habit="habit"
          :is-active="habitManager.activeHabitId.value === habit.id"
          :is-editing="habitManager.editingHabitId.value === habit.id"
          :is-resizing="habitManager.resizingHabitId.value === habit.id"
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
      </div>
    </template>

    <button class="button w-full mt-4" @click="habitManager.openCreate()">
      Create new habit
    </button>

    <HabitForm
      v-if="habitManager.showCreate.value"
      @submit="
        (title, count, color, shape, description) => {
          habitManager.add(title, count, color, shape, description ?? '')
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
