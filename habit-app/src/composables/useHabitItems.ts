import { computed } from 'vue'
import type { HabitItem } from '../types/Habit'
import { createHabitItems } from '../utils/createHabitItems'

export function useHabitItems(habit: HabitItem[]) {
    /* ---------------- GETTERS ---------------- */

    const checkedCount = computed(() => {
        return habit.filter((i) => i.isChecked).length
    })

    const progressCount = computed(() => {
        return `${checkedCount.value}/${habit.length}`
    })

    const progressPercent = computed(() => {
        return (checkedCount.value / habit.length) * 100
    })

    const isCompleted = computed(() => {
        return checkedCount.value == habit.length
    })

    /* ---------------- ACTIONS ---------------- */

    const reset = () => {
        habit.forEach((element) => (element.isChecked = false))
    }

    const handleClick = (index: number) => {
        habit[index].isChecked = !habit[index].isChecked
    }

    // checked only after last checked
    const done = () => {
        if (!habit.length) return

        let lastCheckedIndex = -1

        for (let i = habit.length - 1; i >= 0; i--) {
            if (habit[i].isChecked) {
                lastCheckedIndex = i
                break
            }
        }

        const nextIndex = lastCheckedIndex === -1 ? 0 : lastCheckedIndex + 1

        if (nextIndex < habit.length) {
            habit[nextIndex].isChecked = true
        }
    }

    // checked all habit in pull
    const doneSuccessively = () => {
        const index = habit.findIndex((i) => !i.isChecked)

        if (index !== -1) {
            habit[index].isChecked = true
        }
    }

    const doneAll = () => {
        habit.forEach((item) => {
            item.isChecked = true
        })
    }

    const undo = () => {
        const index = habit.map((i) => i.isChecked).lastIndexOf(true)

        if (index !== -1) {
            habit[index].isChecked = false
        }
    }

    const resizeHabit = (newCount: number) => {
        const currentLength = habit.length

        if (newCount > currentLength) {
            habit.push(...createHabitItems(newCount - currentLength))
        }
        if (newCount < currentLength) {
            habit.splice(newCount)
        }
    }

    return {
        isCompleted,
        handleClick,
        done,
        doneAll,
        doneSuccessively,
        progressPercent,
        progressCount,
        reset,
        undo,
        resizeHabit,
    }
}
