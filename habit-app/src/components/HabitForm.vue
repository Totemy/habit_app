<script setup lang="ts">
import { computed, ref } from 'vue'
import { defaultShapes } from '../utils/shapes'
import type { HabitShape } from '../types/Habit'

const emit = defineEmits<{
  (
    e: 'submit',
    title: string,
    count: number,
    color: string,
    shape: HabitShape,
    description: string,
  ): void
  (e: 'close'): void
}>()

const title = ref('')
const count = ref(8)
const color = ref('#59c217')
const shape = ref<HabitShape>('circle')
const description = ref('')
const submitted = ref(false)

const handleSubmit = () => {
  submitted.value = true
  if (error.value) return
  submitted.value = false

  emit(
    'submit',
    title.value,
    count.value,
    color.value,
    shape.value,
    description.value,
  )

  title.value = ''
  count.value = 1
  color.value = '#59c217'
  shape.value = 'circle'
  description.value = ''
}
const error = computed(() => {
  if (!submitted.value) return ''
  return title.value.trim() ? '' : 'Title is required'
})

const safeCount = computed({
  get: () => count.value,
  set: (v: number) => {
    count.value = v < 1 ? 1 : v
  },
})
</script>
<template>
  <form @submit.prevent="handleSubmit" class="card p-6 max-w-md">
    <h3 class="text-lg font-semibold mb-4">Create Habit</h3>

    <div class="space-y-3">
      <p class="text-sm mb-2 text-gray-400">Habit name:</p>
      <input
        v-model="title"
        type="text"
        placeholder="Habit name"
        class="input"
        :class="error && 'border-red-500  animate-[shake_0.2s]'"
      />
      <p v-if="error" class="text-xs text-red-500 -mt-2">{{ error }}</p>
      <p class="text-sm mb-2 text-gray-400">About this habit:</p>
      <input
        v-model="description"
        type="text"
        placeholder="description (optional)"
        class="input"
      />
      <p class="text-sm mb-2 text-gray-400">Daily goal:</p>
      <input
        v-model.number="safeCount"
        type="number"
        min="1"
        class="input"
        @keydown="
          (e) => {
            if (e.key === '-' || e.key === 'e') e.preventDefault()
          }
        "
      />

      <p class="text-sm mb-2 text-gray-400">Shape :</p>
      <div class="flex gap-2 flex-wrap">
        <button
          type="button"
          v-for="(defaultShape, key) in defaultShapes"
          :key="key"
          class="px-3 py-1 rounded text-sm border transition"
          :class="
            shape === defaultShape.type
              ? 'border-blue-500 bg-blue-500/20 text-white'
              : 'border-[#30363d] text-gray-400 hover:border-gray-500'
          "
          @click="shape = defaultShape.type"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 m-2 mx-auto cursor-pointer transition hover:scale-110"
            viewBox="0 0 24 24"
            style="overflow: visible"
          >
            <g
              :style="{
                fill: color,
                filter: `drop-shadow(0 0 4px ${color})`,
              }"
              v-html="defaultShape.svgIcon"
            />
          </svg>
          <div class="min-w-14">
            {{ defaultShape.label }}
          </div>
        </button>
      </div>
      <div class="row">
        <p>Color:</p>
        <input
          type="color"
          v-model="color"
          class="w-full h-10 rounded cursor-pointer"
        />
      </div>
      <button type="submit" class="button w-full">Create</button>
      <button type="button" class="button w-full" @click="emit('close')">
        Close
      </button>
    </div>
  </form>
</template>
