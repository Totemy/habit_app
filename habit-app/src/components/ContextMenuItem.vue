<script setup lang="ts">
import { ref } from 'vue'
import type { ContextMenuItem } from '../types/ContextMenu'

const props = defineProps<{
  item: ContextMenuItem
}>()

const showSub = ref(false)
</script>
<template>
  <div
    class="relative group"
    @mouseenter="showSub = true"
    @mouseleave="showSub = false"
  >
    <button
      class="flex justify-between w-full px-4 py-2 hover:bg-surface-hover"
      @click="item.action && item.action()"
    >
      <span>{{ item.label }}</span>
      <span v-if="item.children">> </span>
    </button>
    <div
      class="absolute top-0 left-full ml-1 bg-surface border border-border rounded shadow-lg min-w-40"
      v-if="item.children && showSub"
    >
      <ContextMenuItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      />
    </div>
  </div>
</template>
