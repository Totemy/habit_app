import type { Habit } from '../types/Habit'
import { createHabitItems } from './createHabitItems'

export const createHabit = (title: string, count: number): Habit => ({
    id: crypto.randomUUID(),
    title,
    items: createHabitItems(count),
})
