<script setup lang="ts">
import { reactive, ref } from 'vue'

const countItems = ref(0)
const habit = reactive([
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
    { isChecked: false },
])
const handleClick = (item) => {
    item.isChecked = !item.isChecked
}
const createHabit = (count: number) => {
    habit.splice(0, habit.length)
    for (let i = 0; i < count; i++) {
        habit.push({ isChecked: false })
    }
}
const done = () => {
    if (!habit.length) return

    let lastCheckedIndex = -1

    for (let i = habit.length - 1; i >= 0; i--) {
        if (habit[i].isChecked) {
            lastCheckedIndex = i
            break
        }
    }

    const nextIndex = lastCheckedIndex === -1 ? 0 : lastCheckedIndex + 1

    if (nextIndex < habit.length) {
        habit[nextIndex].isChecked = true
    }
}
</script>
<template>
    <div>
        <h3>Habit</h3>
        <p>Here you need input how much habit you need</p>
        <input v-model="countItems" placeholder="Count items" />
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
