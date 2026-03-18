<script setup lang="ts">
import { computed, ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', title: string, count: number, color: string): void
  (e: 'close'): void
}>()

const title = ref('')
const count = ref(1)
const color = ref('#59c217')

const handleSubmit = () => {
  if (error.value) return

  emit('submit', title.value, count.value, color.value)

  title.value = ''
  count.value = 1
  color.value = '#59c217'
}
const error = computed(() => {
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
      <input
        v-model="title"
        type="text"
        placeholder="Habit name"
        class="input"
        :class="error && 'border-red-500  animate-[shake_0.2s]'"
      />
      <p v-if="error" class="text-xs text-red-500 -mt-2">{{ error }}</p>

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
