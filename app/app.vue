<script setup lang="ts">
const { locale } = useI18n()
const { currentTheme } = useTheme()

// Set RTL direction for Arabic
const dir = computed(() => locale.value === 'ar' ? 'rtl' : 'ltr')

// Apply theme and direction to html element
useHead({
  htmlAttrs: {
    dir,
    lang: locale,
    'data-theme': currentTheme
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
