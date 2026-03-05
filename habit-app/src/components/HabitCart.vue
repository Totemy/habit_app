<script setup lang="ts">
import { useHabit } from '../composables/useHabit'

const {
    habit,
    countItems,
    handleClick,
    progressCount,
    progressPercent,
    done,
    reset,
} = useHabit()
</script>
<template>
    <div>
        <h3>Habit</h3>
        <p>Here you need input how much habit you need</p>
        <input type="number" v-model="countItems" placeholder="Count items" />
        <div class="habits">
            <div
                v-for="item in habit"
                class="habit-item"
                :class="{ 'habit-item__active': item.isChecked }"
                @click="handleClick(item)"
            ></div>
            <button @click="reset">Reset</button>
        </div>
        <button @click="done">Done</button>
        <p>Progress: {{ progressCount }}</p>

        <div class="progress">
            <div
                class="progress-bar"
                :style="{ width: progressPercent + '%' }"
            ></div>
        </div>
    </div>
</template>
<style lang="css" scoped>
@import '../styles/progress';
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
