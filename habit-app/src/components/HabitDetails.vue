<script setup lang="ts">
import { useHabitItems } from '../composables/useHabitItems'
import type { Habit } from '../types/Habit'
import HabitItem from './HabitItem.vue'

const props = defineProps<{
    habit: Habit
}>()

const { handleClick, progressCount, progressPercent } = useHabitItems(
    () => props.habit.items,
)
</script>
<template>
    <h2>{{ habit.title }}</h2>
    <div class="items">
        <HabitItem
            v-for="(item, index) in habit.items"
            :key="index"
            :item="item"
            :color="habit.color"
            @click="handleClick(index)"
        />
    </div>
    <div class="progress">
        <div class="progress-bar" :style="{ width: progressPercent + '%' }" />
    </div>
    <p>{{ progressCount }}</p>
</template>

<style lang="css" scoped>
@import '../styles/progress';
</style>
