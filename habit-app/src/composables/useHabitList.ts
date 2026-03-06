import { ref } from 'vue'
import type { Habit } from '../types/Habit'
import { createHabit } from '../utils/createHabit'

export function useHabitList() {
    const habits = ref<Habit[]>([])

    const addHabit = (title: string, count: number) => {
        habits.value.push(createHabit(title, count))
    }

    const removeHabit = (id: string) => {
        habits.value = habits.value.filter((h) => h.id !== id)
    }
    const renameHabit = (id: string, title: string) => {
        const habit = habits.value.find((item) => item.id === id)

        if (!habit) return

        habit.title = title
    }
    return {
        habits,
        addHabit,
        removeHabit,
        renameHabit,
    }
}
