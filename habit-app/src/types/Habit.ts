export interface HabitItem {
    isChecked: boolean
}
export interface Habit {
    id: string
    title: string
    items: HabitItem[]
}
