<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Habit } from '../types/Habit'
import { vFocus } from '../directives/vFocus'

const props = defineProps<{
  habit: Habit
  isActive: boolean
  isEditing: boolean
}>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'rename', title: string): void
  (e: 'mark-as-editing'): void
}>()

const newTitle = ref(props.habit.title)

const save = () => {
  emit('rename', newTitle.value)
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
      <span class="text-xs text-gray-400">
        {{ checked }}/{{ habit.items.length }}
      </span>

      <div>
        <button
          class="text-xs p-1 rounded-sm transition text-amber-400 hover:text-amber-600 hover:bg-[#444649]"
          @click.stop="emit('mark-as-editing')"
        >
          Edit
        </button>
        <button
          class="text-xs p-1 rounded-sm transition text-red-500 hover:text-red-600 hover:bg-[#444649]"
          @click.stop="emit('delete')"
        >
          Delete
        </button>
      </div>
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
