<script setup lang="ts">
import type { HabitItem } from '../types/Habit'

defineProps<{
    item: HabitItem
}>()
defineEmits(['click'])
</script>
<template>
    <div
        class="habit-item"
        :class="{ 'habit-item__active': item.isChecked }"
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
.habit-item__active {
    background-color: greenyellow;
}
</style>
