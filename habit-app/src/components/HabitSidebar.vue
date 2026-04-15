<script setup lang="ts">
import { computed, inject } from 'vue'
import type { useHabitManager } from '../composables/useHabitManager'
import { useSidebarDragAndDrop } from '../composables/useSidebarDragAndDrop'
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
const dragAndDrop = useSidebarDragAndDrop(habits, habitManager.reorder)
const dropTargetIndex = computed(() => dragAndDrop.dropTargetIndex.value)

const selectHabit = (id: string) => {
  habitManager.setActive(id)
  emit('close')
}
</script>
<template>
  <div
    :ref="dragAndDrop.listRef"
    class="space-y-3"
    @dragover="dragAndDrop.handleDragOver"
    @drop="dragAndDrop.handleDrop"
  >
    <template v-for="(habit, index) in habits" :key="habit.id">
      <div
        v-if="dropTargetIndex === index"
        class="h-0.5 rounded-full bg-tahiti"
      />
      <div
        data-habit-item="true"
        class="rounded-lg transition cursor-grab active:cursor-grabbing"
        draggable="true"
        @dragstart="
          (event: DragEvent) => dragAndDrop.handleDragStart(event, habit.id)
        "
        @dragend="dragAndDrop.handleDragEnd"
        @touchstart="dragAndDrop.handleTouchStart(habit.id)"
        @touchmove="dragAndDrop.handleTouchMove"
        @touchend="dragAndDrop.handleTouchEnd"
        @touchcancel="dragAndDrop.handleTouchEnd"
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

    <div
      v-if="dropTargetIndex === habits.length"
      class="h-0.5 rounded-full bg-tahiti"
    />

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
