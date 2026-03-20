<script setup lang="ts">
import { ref } from 'vue'
import type { Habit } from '../types/Habit'

const props = defineProps<{
  habit: Habit
}>()

const emit = defineEmits<{
  (e: 'save', title: string, count: number, color: string): void
  (e: 'close'): void
}>()

const title = ref(props.habit.title)
const count = ref(props.habit.items.length)
const color = ref(props.habit.color)

const handleSave = () => {
  if (!title.value.trim()) return
  emit('save', title.value, count.value, color.value)
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
