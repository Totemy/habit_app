import { computed, ref, watch } from 'vue'
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

    const handleClick = (index: number) => {
        habit.value[index].isChecked = !habit.value[index]?.isChecked
    }

    // with checked after last checked
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

    // checked all habit in pull
    const doneAll = () => {
        const index = habit.value.findIndex((i) => !i.isChecked)

        if (index !== -1) {
            habit.value[index].isChecked = true
        }
    }

    const checkedCount = computed(() => {
        return habit.value.filter((i) => i.isChecked).length
    })

    const progressCount = computed(() => {
        return `${checkedCount.value}/${habit.value.length}`
    })

    const progressPercent = computed(() => {
        return (checkedCount.value / habit.value.length) * 100
    })

    const reset = () => {
        habit.value.forEach((element) => (element.isChecked = false))
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
        progressPercent,
        progressCount,
        reset,
        doneAll,
    }
}
