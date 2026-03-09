<script setup lang="ts">
import type { Habit } from '../types/Habit'
import { useHabitItems } from '../composables/useHabitItems'
import HabitItem from './HabitItem.vue'
import HabitTitle from './HabitTitle.vue'

const props = defineProps<{
    habit: Habit
}>()

const emit = defineEmits<{
    (e: 'remove', id: string): void
    (e: 'rename', id: string, title: string): void
}>()

const {
    handleClick,
    progressCount,
    progressPercent,
    done,
    reset,
    resizeHabit,
} = useHabitItems(props.habit.items)
</script>
<template>
    <HabitTitle
        :title="habit.title"
        @rename="emit('rename', habit.id, $event)"
    />
    <button @click="emit('remove', habit.id)">Delete</button>
    <div class="habits">
        <input
            type="number"
            :value="habit.items.length"
            @input="resizeHabit(Number($event.target.value))"
        />
        <HabitItem
            v-for="(item, index) in habit.items"
            :key="index"
            :item="item"
            v-memo="[item.isChecked]"
            @click="handleClick(index)"
        />
        <!-- or using habit.id in :key? -->
    </div>
    <p>{{ progressCount }}</p>
    <div class="progress">
        <div class="progress-bar" :style="{ width: progressPercent + '%' }" />
    </div>
    <button @click="done">Done</button>
    <button @click="reset">Reset</button>
</template>
<style lang="css" scoped>
@import '../styles/progress';
.habits {
    display: flex;
    flex-wrap: wrap;
}
</style>
