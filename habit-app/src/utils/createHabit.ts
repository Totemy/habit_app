import type { Habit } from '../types/Habit'
import { createHabitItems } from './createHabitItems'

export const createHabit = (
  title: string,
  count: number,
  color: string,
): Habit => ({
  id: crypto.randomUUID(),
  title,
  color,
  items: createHabitItems(count),
})
