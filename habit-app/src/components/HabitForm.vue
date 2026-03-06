<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    submit: [title: string, count: number]
}>()

const title = ref('')
const count = ref(1)

const handleSubmit = () => {
    if (!title.value.trim()) return
    emit('submit', title.value, count.value)
    title.value = ''
    count.value = 1
}
</script>
<template>
    <div>
        <input v-model="title" type="text" placeholder="Habit name" />
        <input v-model="count" type="number" placeholder="Habit count" />
        <button @click="handleSubmit">Create</button>
    </div>
</template>
