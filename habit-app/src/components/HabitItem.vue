<script setup lang="ts">
import type { HabitItem } from '../types/Habit'

defineProps<{
    item: HabitItem
    color: string
}>()
const emit = defineEmits<{
    (e: 'click'): void
}>()
</script>
<template>
    <div
        class="habit-item"
        :class="{ 'habit-item__active': item.isChecked }"
        :style="item.isChecked ? { backgroundColor: color } : {}"
        @click="$emit('click')"
    />
</template>
<style lang="css" scoped>
.habit-item {
    margin: 10px;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: gray;
    flex-shrink: 0;
}
</style>
