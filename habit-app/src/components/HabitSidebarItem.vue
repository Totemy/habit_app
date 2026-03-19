<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Habit } from '../types/Habit'
import { vFocus } from '../directives/vFocus'

const props = defineProps<{
  habit: Habit
  isActive: boolean
  isEditing: boolean
  isResizing: boolean
}>()

const emit = defineEmits<{
  (e: 'resize', count: number): void
  (e: 'rename', title: string): void
  (e: 'open-menu', event: MouseEvent): void
}>()

const newTitle = ref(props.habit.title)
const newCount = ref(props.habit.items.length)

const save = () => {
  emit('rename', newTitle.value)
}
const saveResize = () => {
  emit('resize', Number(newCount.value))
}

const checked = computed(
  () => props.habit.items.filter((i) => i.isChecked).length,
)

const percent = computed(() => {
  const total = props.habit.items.length

  if (!total) return 0

  return (checked.value / total) * 100
})
</script>
<template>
  <div
    class="p-3 rounded-lg cursor-pointer transition"
    :class="isActive ? 'bg-[#21262d]' : 'hover:bg-[#21262d]'"
  >
    <div class="flex items-center gap-2">
      <div class="w-2 h-2 rounded-full" :style="{ background: habit.color }" />
      <template v-if="!isEditing">
        <span class="flex-1 text-sm font-medium">
          {{ habit.title }}
        </span>
      </template>
      <template v-else>
        <input
          class="input text-xs flex-1"
          v-model="newTitle"
          @keyup.enter="save"
          @blur="save"
          v-focus
        />
      </template>
      <template v-if="isResizing">
        <input
          class="input text-xs flex-1"
          type="number"
          v-model="newCount"
          @keyup.enter="saveResize"
          @blur="saveResize"
          v-focus
        />
      </template>
      <template v-else>
        <span class="text-xs text-gray-400">
          {{ checked }}/{{ habit.items.length }}
        </span>
      </template>
      <button
        class="md:hidden ml-1 text-gray-400 hover:text-white transition p-1"
        @click.stop="emit('open-menu', $event)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
    </div>

    <div class="mt-2 h-1 bg-[#30363d] rounded">
      <div
        class="h-full rounded"
        :style="{
          width: percent + '%',
          background: habit.color,
        }"
      />
    </div>
  </div>
</template>
