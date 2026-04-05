<script setup lang="ts">
import type { HabitItem, HabitShape } from '../types/Habit'
import { defaultShapes } from '../utils/shapes'

defineProps<{
  item: HabitItem
  color: string
  shape: HabitShape
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
<template>
  <div
    v-if="shape === 'circle'"
    class="w-6 h-6 rounded-full m-2 cursor-pointer transition hover:scale-110"
    :style="{ backgroundColor: item.isChecked ? color : '#30363d' }"
    @click="$emit('click')"
  />
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    class="w-6 h-6 m-2 cursor-pointer transition hover:scale-110"
    viewBox="0 0 24 24"
    style="overflow: visible"
    @click="$emit('click')"
  >
    <g
      :style="{
        fill: item.isChecked ? color : '#30363d',
        filter: item.isChecked ? `drop-shadow(0 0 4px ${color})` : 'none',
      }"
      v-html="defaultShapes.find((i) => i.type === shape)?.svgIcon"
    />
  </svg>
</template>
