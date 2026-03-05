<script setup lang="ts">
import { useHabit } from '../composables/useHabit'

const { habit, countItems, handleClick, createHabit, done } = useHabit()
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
