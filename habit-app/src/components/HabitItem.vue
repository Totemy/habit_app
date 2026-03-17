<script setup lang="ts">
import type { HabitItem } from '../types/Habit'

defineProps<{
  item: HabitItem
  color: string
}>()
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
<template>
  <div
    class="w-6 h-6 rounded-full m-2 cursor-pointer transition hover:scale-110"
    :class="{ 'habit-item__active': item.isChecked }"
    :style="{
      backgroundColor: item.isChecked ? color : '#30363d',
    }"
    @click="$emit('click')"
  />
</template>
