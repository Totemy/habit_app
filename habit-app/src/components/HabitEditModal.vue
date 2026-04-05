<script setup lang="ts">
import { ref } from 'vue'
import type { Habit, HabitShape } from '../types/Habit'
import { defaultShapes } from '../utils/shapes'

const props = defineProps<{
  habit: Habit
}>()

const emit = defineEmits<{
  (
    e: 'save',
    title: string,
    count: number,
    color: string,
    shape: HabitShape,
    description?: string,
  ): void
  (e: 'close'): void
}>()

const title = ref(props.habit.title)
const count = ref(props.habit.items.length)
const color = ref(props.habit.color)
const description = ref(props.habit.description)
const shape = ref<HabitShape>(props.habit.shape)

const handleSave = () => {
  if (!title.value.trim()) return
  emit(
    'save',
    title.value,
    count.value,
    color.value,
    shape.value,
    description.value,
  )
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="card p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Edit Habit</h3>

        <div class="space-y-3">
          <input
            v-model="title"
            type="text"
            placeholder="Habit name"
            class="input"
          />
          <input
            v-model="description"
            type="text"
            placeholder="description..."
            class="input"
          />
          <input
            v-model.number="count"
            type="number"
            min="1"
            class="input"
            @keydown="
              (e) => {
                if (e.key === '-' || e.key === 'e') e.preventDefault()
              }
            "
          />
          <p class="text-sm mb-2 text-gray-400">Shape</p>
          <div class="flex gap-2 flex-wrap">
            <button
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

          <div class="flex items-center gap-3">
            <p class="text-sm">Color:</p>
            <input
              type="color"
              v-model="color"
              class="w-full h-10 rounded cursor-pointer"
            />
          </div>

          <button class="button w-full" @click="handleSave">Save</button>
          <button
            class="button w-full bg-transparent border border-[#30363d] hover:bg-[#21262d]"
            @click="emit('close')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
