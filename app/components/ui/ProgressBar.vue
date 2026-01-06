<script setup lang="ts">
const props = defineProps<{
  value: number
  max: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

const { locale } = useI18n()

const percentage = computed(() => {
  if (props.max === 0) return 0
  return Math.min(100, Math.round((props.value / props.max) * 100))
})
</script>

<template>
  <div class="w-full">
    <div
      v-if="showLabel"
      class="flex justify-between text-sm mb-2"
      style="color: rgb(var(--text-secondary));"
    >
      <span>{{ formatAmount(value, locale) }} / {{ formatAmount(max, locale) }}</span>
      <span class="font-medium">{{ percentage }}%</span>
    </div>
    <div
      class="rounded-full overflow-hidden"
      :class="{
        'h-1.5': size === 'sm',
        'h-2.5': size === 'md' || !size,
        'h-4': size === 'lg'
      }"
      style="background-color: rgb(var(--color-surface-200));"
    >
      <div
        class="h-full rounded-full transition-all duration-500 ease-out bg-primary-500"
        :style="{ width: `${percentage}%` }"
      />
    </div>
  </div>
</template>
