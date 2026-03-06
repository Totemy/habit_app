<script setup lang="ts">
import { useHabits } from '../composables/useHabits'
import HabitCart from './HabitCart.vue'

const { habits, addHabit } = useHabits()

addHabit('Workout', 7)
addHabit('English', 5)
</script>
<template>
    <div>
        <HabitCart v-for="habit in habits" :key="habit.id" :habit="habit" />
    </div>
</template>
