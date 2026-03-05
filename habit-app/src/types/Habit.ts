export interface HabitItem {
    isChecked: boolean
}
export interface Habit {
    title: string
    items: HabitItem[]
}
