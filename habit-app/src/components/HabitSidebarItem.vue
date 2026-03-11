<script setup lang="ts">
import { computed } from 'vue'
import type { Habit } from '../types/Habit'

const props = defineProps<{
    habit: Habit
    active: boolean
}>()

const checked = computed(
    () => props.habit.items.filter((i) => i.isChecked).length,
)

const percent = computed(() => {
    const total = props.habit.items.length

    if (!total) return 0

    return (checked.value / total) * 100
})
</script>
<template>
    <div
        class="p-3 rounded-lg cursor-pointer transition"
        :class="active ? 'bg-[#21262d]' : 'hover:bg-[#21262d]'"
    >
        <div class="flex items-center gap-2">
            <div
                class="w-2 h-2 rounded-full"
                :style="{ background: habit.color }"
            />

            <span class="flex-1 text-sm font-medium">
                {{ habit.title }}
            </span>

            <span class="text-xs text-gray-400">
                {{ checked }}/{{ habit.items.length }}
            </span>
        </div>

        <div class="mt-2 h-1 bg-[#30363d] rounded">
            <div
                class="h-full rounded"
                :style="{
                    width: percent + '%',
                    background: habit.color,
                }"
            />
        </div>
    </div>
</template>
