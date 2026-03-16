<script setup lang="ts">
import { computed, provide } from 'vue'
import { useHabitManager } from '../composables/useHabitManager'
import HabitDetails from './HabitDetails.vue'
import HabitSidebar from './HabitSidebar.vue'
//import HabitForm from './HabitForm.vue'

const habitManager = useHabitManager()
provide('habitManager', habitManager)
habitManager.addHabit('Workout', 7, 'red')
habitManager.addHabit('English', 5, 'green')
const activeHabit = computed(() => habitManager.activeHabit.value)
</script>
<template>
    <div class="min-h-screen flex">
        <HabitSidebar class="sidebar" />
        <div class="flex-1 page">
            <HabitDetails v-if="activeHabit" :habit="activeHabit" />
        </div>
        <div class="mt-10">
            <HabitForm @submit="habitManager.addHabit" />
        </div>
    </div>
</template>
