<script setup lang="ts">
import { ref, Teleport, watch } from 'vue'
import { useHabitItems } from '../composables/useHabitItems'
import type { Habit } from '../types/Habit'
import HabitItem from './HabitItem.vue'

const props = defineProps<{
  habit: Habit
}>()

const { handleClick, progressCount, progressPercent, done, undo, reset } =
  useHabitItems(() => props.habit.items)

const showSuccess = ref(false)

watch(progressPercent, (value) => {
  if (value === 100) showSuccess.value = true
})
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
    <div>
      <button class="button" @click="done">Done</button>
      <button class="button" @click="undo">Undo</button>
      <button class="button" @click="reset">Reset</button>
    </div>
    <Teleport to="body">
      <div
        v-if="showSuccess"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="card p-8 flex flex-col items-center gap-4">
          <p class="text-2x1 font-bold">All done!!!</p>
          <button class="button" @click="showSuccess = false">Ok</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="css" scoped>
@import '../styles/progress';
</style>
