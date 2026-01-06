<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}>()
</script>

<template>
  <div
    class="mx-auto px-4 sm:px-6 lg:px-8"
    :class="{
      'max-w-3xl': size === 'sm',
      'max-w-5xl': size === 'md',
      'max-w-6xl': size === 'lg',
      'max-w-7xl': !size || size === 'xl',
      '': size === 'full'
    }"
  >
    <slot />
  </div>
</template>
