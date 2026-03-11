<script setup lang="ts">
import type { Habit } from '../types/Habit'
import HabitSidebarItem from './HabitSidebarItem.vue'

defineProps<{
    habits: Habit[]
    activeHabit: Habit | null
}>()

const emit = defineEmits<{
    (e: 'select', id: string): void
}>()
</script>
<template>
    <div>
        <HabitSidebarItem
            v-for="habit in habits"
            :key="habit.id"
            :habit="habit"
            :active="activeHabit?.id === habit.id"
            @click="emit('select', habit.id)"
        />
    </div>
</template>
