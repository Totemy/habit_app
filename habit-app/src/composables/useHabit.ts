import { ref, watch } from 'vue'
import type { HabitItem } from '../types/Habit'

export function useHabit() {
    const habit = ref<HabitItem[]>([
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
        { isChecked: false },
    ])

    const countItems = ref(habit.value.length)

    const handleClick = (item: HabitItem) => {
        item.isChecked = !item.isChecked
    }

    const done = () => {
        if (!habit.value.length) return

        let lastCheckedIndex = -1

        for (let i = habit.value.length - 1; i >= 0; i--) {
            if (habit.value[i].isChecked) {
                lastCheckedIndex = i
                break
            }
        }

        const nextIndex = lastCheckedIndex === -1 ? 0 : lastCheckedIndex + 1

        if (nextIndex < habit.value.length) {
            habit.value[nextIndex].isChecked = true
        }
    }

    watch(countItems, (newCount) => {
        const currentLength = habit.value.length

        if (newCount > currentLength) {
            for (let i = currentLength; i < newCount; i++) {
                habit.value.push({ isChecked: false })
            }
        } else if (newCount < currentLength) {
            habit.value.splice(newCount)
        }
    })

    return {
        habit,
        countItems,
        handleClick,
        done,
    }
}
