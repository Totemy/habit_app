import type { useHabitManager } from '../composables/useHabitManager'
import type { ContextMenuItem } from '../types/ContextMenu'
import type { Habit } from '../types/Habit'

export const getMenu = (
  habit: Habit,
  manager: ReturnType<typeof useHabitManager>,
): ContextMenuItem[] => [
  {
    label: 'Rename',
    action: () => manager.markAsEditing(habit.id),
  },
  {
    label: 'Resize',
    action: () => manager.markAsResizing(habit.id),
  },
  {
    label: 'Delete',
    action: () => manager.remove(habit.id),
  },
  {
    label: 'Duplicate',
    action: () => manager.duplicate(habit.id),
  },
]
