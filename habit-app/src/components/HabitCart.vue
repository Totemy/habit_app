<script setup lang="ts">
import type { Habit } from '../types/Habit'
import { useHabitItems } from '../composables/useHabitItems'
import HabitItem from './HabitItem.vue'
import { ref } from 'vue'

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

const isEditing = ref(false)
const newName = ref(props.habit.title)

const save = () => {
    emit('rename', props.habit.id, newName.value)
    isEditing.value = false
}
</script>
<template>
    <div v-if="!isEditing">
        <h3>{{ habit.title }}</h3>
        <button @click="isEditing = true">Edit</button>
    </div>
    <div v-else>
        <input v-model="newName" />
        <button @click="save">Save</button>
    </div>
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
