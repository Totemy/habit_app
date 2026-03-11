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
    <div>
        <input v-model="title" type="text" placeholder="Habit name" />
        <input v-model="count" type="number" placeholder="Habit count" />
        <input type="color" v-model="color" />
        <button @click="handleSubmit">Create</button>
    </div>
</template>
