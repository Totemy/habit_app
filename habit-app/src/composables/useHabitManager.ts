import { computed, ref } from 'vue'
import type { Habit } from '../types/Habit'
import { createHabit } from '../utils/createHabit'

export function useHabitManager() {
    //remove name "Habit"
    const habits = ref<Habit[]>([])
    const activeHabitId = ref<string | null>(null)

    const add = (title: string, count: number, color: string) => {
        const habit = createHabit(title, count, color)

        habits.value.push(habit)

        if (!activeHabitId.value) {
            activeHabitId.value = habit.id
        }
    }

    const remove = (id: string) => {
        habits.value = habits.value.filter((h) => h.id !== id)

        if (activeHabitId.value === id) {
            activeHabitId.value = habits.value[0]?.id ?? null
        }
    }
    const rename = (id: string, title: string) => {
        const habit = habits.value.find((item) => item.id === id)

        if (!habit) return

        habit.title = title
    }

    const setActive = (id: string) => {
        activeHabitId.value = id
    }
    const active = computed(
        () => habits.value.find((h) => h.id === activeHabitId.value) || null,
    )

    return {
        habits,
        active,
        setActive,
        add,
        remove,
        rename,
    }
}
