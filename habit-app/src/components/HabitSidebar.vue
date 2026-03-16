<script setup lang="ts">
import { computed, inject } from 'vue'
import type { useHabitManager } from '../composables/useHabitManager'
import HabitSidebarItem from './HabitSidebarItem.vue'

const habitManager = inject<ReturnType<typeof useHabitManager>>('habitManager')
if (!habitManager) throw new Error('habitManager not provided')

const habits = computed(() => habitManager.habits.value)
</script>
<template>
    <div class="space-y-3">
        <HabitSidebarItem
            v-for="habit in habits"
            :key="habit.id"
            :habit="habit"
            :active="habitManager.activeHabit.value?.id === habit.id"
            @click="habitManager.setActiveHabit(habit.id)"
            @delete="habitManager.removeHabit(habit.id)"
            @rename="
                (title: string) => habitManager.renameHabit(habit.id, title)
            "
        />
    </div>
</template>
