<script setup lang="ts">
import MenuItem from './ContextMenuItem.vue'
import type { ContextMenuItem } from '../types/ContextMenu'

defineProps<{
  state: {
    visible: boolean
    x: number
    y: number
    items: ContextMenuItem[]
  }
}>()
</script>

<template>
  <div
    v-if="state.visible"
    class="fixed bg-[#161b22] border border-[#30363d] rounded shadow-lg z-50 min-w-[160px]"
    :style="{ top: state.y + 'px', left: state.x + 'px' }"
  >
    <MenuItem v-for="(item, index) in state.items" :key="index" :item="item" />
  </div>
</template>
