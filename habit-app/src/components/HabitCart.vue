<script setup lang="ts">
import { ref, watch } from 'vue'

interface HabitItem {
    isChecked: boolean
}

const habit = ref<HabitItem[]>([
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
])
const countItems = ref(habit.value.length)
const handleClick = (item) => {
    item.isChecked = !item.isChecked
}
const createHabit = (count: number) => {
    habit.value.splice(0, habit.length)
    for (let i = 0; i < count; i++) {
        habit.value.push({ isChecked: false })
    }
}
const done = () => {
    if (!habit.value.length) return

    let lastCheckedIndex = -1

    for (let i = habit.value.length - 1; i >= 0; i--) {
        if (habit.value[i].isChecked) {
            lastCheckedIndex = i
            break
        }
    }

    const nextIndex = lastCheckedIndex === -1 ? 0 : lastCheckedIndex + 1

    if (nextIndex < habit.value.length) {
        habit.value[nextIndex].isChecked = true
    }
}

watch(countItems, (newCount) => {
    const currentLength = habit.value.length

    if (newCount > currentLength) {
        for (let i = currentLength; i < newCount; i++) {
            habit.value.push({ isChecked: false })
        }
    } else if (newCount < currentLength) {
        habit.value.splice(newCount)
    }
})
</script>
<template>
    <div>
        <h3>Habit</h3>
        <p>Here you need input how much habit you need</p>
        <input type="number" v-model="countItems" placeholder="Count items" />
        <button @click="createHabit(countItems)">Create</button>
        <div class="habits">
            <div
                v-for="item in habit"
                class="habit-item"
                :class="{ 'habit-item__active': item.isChecked }"
                @click="handleClick(item)"
            ></div>
        </div>
        <button @click="done">Done</button>
    </div>
</template>
<style lang="css" scoped>
.habits {
    display: flex;
    flex-wrap: wrap;
}
.habit-item {
    margin: 10px;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: gray;
    flex-shrink: 0;
}
.habit-item__active {
    background-color: greenyellow;
}
</style>
