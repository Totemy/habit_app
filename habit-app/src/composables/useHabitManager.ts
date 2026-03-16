import { computed, ref } from 'vue'
import type { Habit } from '../types/Habit'
import { createHabit } from '../utils/createHabit'

export function useHabitManager() {
    //remove name "Habit"
    const habits = ref<Habit[]>([])
    const activeHabitId = ref<string | null>(null)

    const addHabit = (title: string, count: number, color: string) => {
        const habit = createHabit(title, count, color)

        habits.value.push(habit)

        if (!activeHabitId.value) {
            activeHabitId.value = habit.id
        }
    }

    const removeHabit = (id: string) => {
        habits.value = habits.value.filter((h) => h.id !== id)

        if (activeHabitId.value === id) {
            activeHabitId.value = habits.value[0]?.id ?? null
        }
    }
    const renameHabit = (id: string, title: string) => {
        const habit = habits.value.find((item) => item.id === id)

        if (!habit) return

        habit.title = title
    }

    const setActiveHabit = (id: string) => {
        activeHabitId.value = id
    }
    const activeHabit = computed(
        () => habits.value.find((h) => h.id === activeHabitId.value) || null,
    )

    return {
        habits,
        activeHabit,
        setActiveHabit,
        addHabit,
        removeHabit,
        renameHabit,
    }
}
