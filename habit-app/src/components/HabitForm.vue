<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    submit: [title: string, count: number, color: string]
}>()

const title = ref('')
const count = ref(1)
const color = ref('#ff0000')

const handleSubmit = () => {
    if (!title.value.trim()) return
    emit('submit', title.value, count.value, color.value)
    title.value = ''
    count.value = 1
}
</script>
<template>
    <div class="card p-6 max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create Habit</h3>

        <div class="space-y-3">
            <input
                v-model="title"
                type="text"
                placeholder="Habit name"
                class="input"
            />

            <input v-model="count" type="number" class="input" />

            <input
                type="color"
                v-model="color"
                class="w-full h-10 rounded cursor-pointer"
            />

            <button class="button w-full" @click="handleSubmit">Create</button>
        </div>
    </div>
</template>
