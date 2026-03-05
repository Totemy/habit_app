import type { HabitItem } from '../types/Habit'

export function createHabitItems(count: number): HabitItem[] {
    return Array.from({ length: count }, () => ({
        isChecked: false,
    }))
}
