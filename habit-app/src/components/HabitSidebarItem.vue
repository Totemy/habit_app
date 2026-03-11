<script setup lang="ts">
import { computed } from 'vue'
import type { Habit } from '../types/Habit'

const props = defineProps<{
    habit: Habit
    active: boolean
}>()

const checked = computed(
    () => props.habit.items.filter((i) => i.isChecked).length,
)

const percent = computed(() => {
    const total = props.habit.items.length

    if (!total) return 0

    return (checked.value / total) * 100
})
</script>
<template>
    <div class="sidebar-item" :class="{ active }">
        <div class="row">
            <div class="habit-color" :style="{ background: habit.color }" />

            <span class="title">
                {{ habit.title }}
            </span>

            <span class="count"> {{ checked }}/{{ habit.items.length }} </span>
        </div>

        <div class="progress">
            <div
                class="progress-bar"
                :style="{
                    width: percent + '%',
                    background: habit.color,
                }"
            />
        </div>
    </div>
</template>
<style lang="css" scoped>
.sidebar-item {
    padding: 10px;
    cursor: pointer;
}

.row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.habit-color {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.progress {
    height: 4px;
    background: #ddd;
    border-radius: 4px;
    margin-top: 6px;
}

.progress-bar {
    height: 100%;
    border-radius: 4px;
}
</style>
