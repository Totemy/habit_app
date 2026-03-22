<script setup lang="ts">
import { inject, ref, Teleport, watch } from 'vue'
import { useHabitItems } from '../composables/useHabitItems'
import type { Habit, HabitShape } from '../types/Habit'
import HabitItem from './HabitItem.vue'
import type { useHabitManager } from '../composables/useHabitManager'
import HabitEditModal from './HabitEditModal.vue'
import ConfettiCanvas from './ConfettiCanvas.vue'

const props = defineProps<{
  habit: Habit
}>()

const habitManager = inject<ReturnType<typeof useHabitManager>>('habitManager')
const { handleClick, progressCount, progressPercent, done, undo, reset } =
  useHabitItems(props.habit.items)

const showSuccess = ref(false)
const showEdit = ref(false)

watch(progressPercent, (value) => {
  if (value === 100) showSuccess.value = true
})

const handleSave = (
  title: string,
  count: number,
  color: string,
  shape: HabitShape,
  description?: string,
) => {
  habitManager?.edit(
    props.habit.id,
    title,
    count,
    color,
    shape,
    description ?? '',
  )
  showEdit.value = false
}
</script>
<template>
  <div class="card p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">{{ habit.title }}</h2>
      <button
        class="text-gray-400 hover:text-white transition p-1"
        @click="showEdit = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
    <div class="flex flex-wrap">
      <p>{{ habit.description }}</p>
    </div>
    <div class="flex flex-wrap">
      <HabitItem
        v-for="(item, index) in habit.items"
        :key="index"
        :item="item"
        :color="habit.color"
        :shape="habit.shape"
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
      <button class="button m-1" @click="done">Check it</button>
      <button class="button m-1" @click="undo">Undo one</button>
      <button class="button m-1" @click="reset">Reset</button>
    </div>
    <HabitEditModal
      v-if="showEdit"
      :habit="habit"
      @save="handleSave"
      @close="showEdit = false"
    />
    <Teleport to="body">
      <div
        v-if="showSuccess"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <ConfettiCanvas />
        <div class="card p-8 flex flex-col items-center gap-4 z-[52]">
          <p class="text-2xl font-bold">All done!!!</p>
          <button class="button" @click="showSuccess = false">Ok</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style lang="css" scoped>
@import '../styles/progress';
</style>
