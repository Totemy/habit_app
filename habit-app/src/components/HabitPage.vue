<script setup lang="ts">
import { useHabitList } from '../composables/useHabitList'
import HabitDetails from './HabitDetails.vue'
import HabitSidebar from './HabitSidebar.vue'

const { habits, activeHabit, setActiveHabit, addHabit } = useHabitList()
addHabit('Workout', 7, 'red')
addHabit('English', 5, 'blue')
</script>
<template>
    <div>
        <HabitSidebar
            :habits="habits"
            :activeHabit="activeHabit"
            @select="setActiveHabit"
        />

        <HabitDetails
            v-if="activeHabit"
            :key="activeHabit.id"
            :habit="activeHabit"
        />

        <HabitForm @submit="addHabit" />
    </div>
</template>
