<script setup lang="ts">
import { useHabitList } from '../composables/useHabitList'
import HabitCart from './HabitCart.vue'
import HabitForm from './HabitForm.vue'

const { habits, addHabit, removeHabit, renameHabit } = useHabitList()

addHabit('Workout', 7)
addHabit('English', 5)
</script>
<template>
    <div>
        <HabitForm @submit="addHabit" />
        <HabitCart
            v-for="habit in habits"
            :key="habit.id"
            :habit="habit"
            @remove="removeHabit"
            @rename="renameHabit"
        />
    </div>
</template>
