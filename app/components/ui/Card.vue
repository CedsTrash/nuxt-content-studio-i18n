<script setup lang="ts">
defineProps<{
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    class="rounded-xl overflow-hidden transition-shadow duration-200"
    :class="[
      hoverable ? 'hover:shadow-lg cursor-pointer' : '',
      {
        '': padding === 'none',
        'p-4': padding === 'sm',
        'p-6': padding === 'md' || !padding,
        'p-8': padding === 'lg'
      }
    ]"
    style="background-color: rgb(var(--bg-secondary));"
  >
    <slot />
  </div>
</template>
