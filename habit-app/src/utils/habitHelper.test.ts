import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { createHabit, createHabitItems } from './habitHelper'

describe('habitHelper', () => {
  beforeEach(() => {
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('habit-1')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates unchecked habit items with requested length', () => {
    const items = createHabitItems(3)

    expect(items).toHaveLength(3)
    expect(items.every((item) => item.isChecked === false)).toBe(true)
  })

  it('creates a habit with defaults and generated id', () => {
    const habit = createHabit('Read', 2, '#59c217', 'circle', 'Books')

    expect(habit.id).toBe('habit-1')
    expect(habit.title).toBe('Read')
    expect(habit.shape).toBe('circle')
    expect(habit.color).toBe('#59c217')
    expect(habit.description).toBe('Books')
    expect(habit.items).toHaveLength(2)
  })
})
