import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useHabitManager } from './useHabitManager'

describe('useHabitManager', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(globalThis.crypto, 'randomUUID')
      .mockReturnValueOnce('habit-1')
      .mockReturnValueOnce('habit-2')
      .mockReturnValue('habit-x')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('loads habits and backfills missing description', () => {
    localStorage.setItem(
      'habits',
      JSON.stringify([
        {
          id: 'loaded-1',
          title: 'Loaded',
          items: [],
          color: '#111111',
          shape: 'circle',
        },
      ]),
    )

    const manager = useHabitManager()

    expect(manager.habits.value).toHaveLength(1)
    expect(manager.habits.value[0]?.description).toBe('')
  })

  it('adds habit, sets active id, and persists to localStorage', async () => {
    const manager = useHabitManager()

    manager.add('Workout', 2, '#59c217', 'circle', 'Daily')
    await nextTick()

    expect(manager.habits.value).toHaveLength(1)
    expect(manager.activeHabitId.value).toBe('habit-1')

    const saved = JSON.parse(localStorage.getItem('habits') ?? '[]')
    expect(saved).toHaveLength(1)
    expect(saved[0].title).toBe('Workout')
  })

  it('edits and resizes existing habit', () => {
    const manager = useHabitManager()
    manager.add('Run', 1, '#59c217', 'circle', '')

    manager.edit('habit-1', 'Run Fast', 3, '#3ab7bf', 'star', 'Evening')

    const habit = manager.habits.value[0]
    expect(habit?.title).toBe('Run Fast')
    expect(habit?.shape).toBe('star')
    expect(habit?.description).toBe('Evening')
    expect(habit?.items).toHaveLength(3)
  })

  it('duplicates habit with a new id and copied items', () => {
    const manager = useHabitManager()
    manager.add('Read', 2, '#59c217', 'circle', '')
    manager.habits.value[0]!.items[0]!.isChecked = true

    manager.duplicate('habit-1')

    expect(manager.habits.value).toHaveLength(2)
    const original = manager.habits.value[0]!
    const copy = manager.habits.value[1]!

    expect(copy.id).toBe('habit-2')
    expect(copy.title).toBe('Read (copy)')
    expect(copy.items).not.toBe(original.items)
    expect(copy.items[0]).not.toBe(original.items[0])
    expect(copy.items[0]?.isChecked).toBe(true)
  })

  it('removes active habit and falls back to first habit', () => {
    const manager = useHabitManager()
    manager.add('A', 1, '#59c217', 'circle', '')
    manager.add('B', 1, '#59c217', 'circle', '')

    expect(manager.activeHabitId.value).toBe('habit-2')

    manager.remove('habit-2')

    expect(manager.habits.value).toHaveLength(1)
    expect(manager.activeHabitId.value).toBe('habit-1')
  })

  it('reorders habits by ids', () => {
    const manager = useHabitManager()
    manager.add('A', 1, '#59c217', 'circle', '')
    manager.add('B', 1, '#59c217', 'circle', '')
    manager.add('C', 1, '#59c217', 'circle', '')

    const firstId = manager.habits.value[0]!.id
    const secondId = manager.habits.value[1]!.id
    const thirdId = manager.habits.value[2]!.id

    manager.reorder(firstId, thirdId)

    expect(manager.habits.value.map((habit) => habit.id)).toEqual([
      secondId,
      thirdId,
      firstId,
    ])
  })
})
