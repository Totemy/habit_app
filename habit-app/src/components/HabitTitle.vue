<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    title: string
}>()

const emit = defineEmits<{
    (e: 'rename', title: string): void
}>()

const isEditing = ref(false)
const newName = ref(props.title)

watch(
    () => props.title,
    (v) => {
        newName.value = v
    },
)

const save = () => {
    emit('rename', newName.value)
    isEditing.value = false
}
</script>
<template>
    <div>
        <template v-if="!isEditing">
            <h3 @dblclick="isEditing = true">{{ title }}</h3>
            <button @click="isEditing = true">Edit</button>
        </template>
        <template v-else>
            <input v-model="newName" @keyup.enter="save" @blur="save" />
            <button @click="save">Save</button>
        </template>
    </div>
</template>
