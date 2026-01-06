<script setup lang="ts">
defineProps<{
  centered?: boolean
}>()
</script>

<template>
  <div :class="centered ? 'text-center' : ''">
    <h2
      class="text-3xl md:text-4xl font-bold mb-4"
      style="color: rgb(var(--text-primary));"
    >
      <slot name="title" />
    </h2>
    <p
      v-if="$slots.subtitle"
      class="text-lg max-w-2xl"
      :class="centered ? 'mx-auto' : ''"
      style="color: rgb(var(--text-secondary));"
    >
      <slot name="subtitle" />
    </p>
  </div>
</template>
