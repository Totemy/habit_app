<script setup lang="ts">
import { useHabitItems } from '../composables/useHabitItems'
import type { Habit } from '../types/Habit'
import HabitItem from './HabitItem.vue'

const props = defineProps<{
  habit: Habit
}>()

const { handleClick, progressCount, progressPercent } = useHabitItems(
  () => props.habit.items,
)
</script>
<template>
  <div class="card p-6">
    <h2 class="text-2xl font-bold mb-6">{{ habit.title }}</h2>
    <div class="flex flex-wrap">
      <HabitItem
        v-for="(item, index) in habit.items"
        :key="index"
        :item="item"
        :color="habit.color"
        @click="handleClick(index)"
      />
    </div>
    <div class="mt-6">
      <div class="w-full h-3 bg-[#30363d] rounded-full overflow-hidden">
        <div
          class="h-full transition-all duration-300"
          :style="{
            width: progressPercent + '%',
            backgroundColor: habit.color,
          }"
        />
      </div>
      <p class="text-sm text-gray-400 mt-2">{{ progressCount }} completed</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import '../styles/progress';
</style>
