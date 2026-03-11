<script setup lang="ts">
import { useHabitList } from '../composables/useHabitList'
import HabitDetails from './HabitDetails.vue'
import HabitSidebar from './HabitSidebar.vue'

const { habits, activeHabit, setActiveHabit, addHabit } = useHabitList()
addHabit('Workout', 7, 'red')
addHabit('English', 5, 'green')
</script>
<template>
    <div class="min-h-screen flex">
        <HabitSidebar
            class="sidebar"
            :habits="habits"
            :activeHabit="activeHabit"
            @select="setActiveHabit"
        />
        <div class="flex-1 page">
            <HabitDetails
                v-if="activeHabit"
                :key="activeHabit.id"
                :habit="activeHabit"
            />
        </div>
        <div class="mt-10">
            <HabitForm @submit="addHabit" />
        </div>
    </div>
</template>
