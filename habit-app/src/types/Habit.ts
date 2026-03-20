export type HabitShape = 'circle' | 'star' | 'heart' | 'fire' | 'lightning'

export interface HabitItem {
  isChecked: boolean
}
export interface Habit {
  id: string
  title: string
  items: HabitItem[]
  color: string
  shape: HabitShape
  description?: string
}
