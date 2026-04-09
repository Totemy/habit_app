import { describe, expect, it } from 'vitest'
import { useHabitItems } from './useHabitItems'

describe('useHabitItems', () => {
  it('computes progress and completion state', () => {
    const items = [
      { isChecked: true },
      { isChecked: false },
      { isChecked: true },
    ]
    const state = useHabitItems(items)

    expect(state.progressCount.value).toBe('2/3')
    expect(state.progressPercent.value).toBeCloseTo(66.666, 2)
    expect(state.isCompleted.value).toBe(false)
  })

  it('toggles an item by index', () => {
    const items = [{ isChecked: false }]
    const state = useHabitItems(items)

    state.handleClick(0)
    expect(items[0]?.isChecked).toBe(true)

    state.handleClick(0)
    expect(items[0]?.isChecked).toBe(false)
  })

  it('checks first unchecked with done and unchecks last checked with undo', () => {
    const items = [
      { isChecked: false },
      { isChecked: false },
      { isChecked: true },
    ]
    const state = useHabitItems(items)

    state.done()
    expect(items.map((i) => i.isChecked)).toEqual([true, false, true])

    state.undo()
    expect(items.map((i) => i.isChecked)).toEqual([true, false, false])
  })

  it('resets all items', () => {
    const items = [{ isChecked: true }, { isChecked: true }]
    const state = useHabitItems(items)

    state.reset()

    expect(items.every((item) => item.isChecked === false)).toBe(true)
  })
})
