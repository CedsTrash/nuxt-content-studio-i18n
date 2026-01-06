<script setup lang="ts">
const { t } = useI18n()
const { themes, currentTheme, setTheme } = useTheme()

const isOpen = ref(false)

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.theme-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function selectTheme(themeId: string) {
  setTheme(themeId as any)
  isOpen.value = false
}

const themeIcons: Record<string, string> = {
  'desert-sand': '☀️',
  'oasis': '🌴',
  'night-sky': '🌙'
}
</script>

<template>
  <div class="theme-switcher relative">
    <button
      class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-surface-100"
      :style="{ color: 'rgb(var(--text-secondary))' }"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-label="t('theme.title')"
      @click.stop="isOpen = !isOpen"
    >
      <span class="text-lg">{{ themeIcons[currentTheme] }}</span>
      <svg class="w-4 h-4 transition-transform hidden sm:block" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-full mt-2 rounded-lg shadow-lg border overflow-hidden min-w-[160px] z-50"
        :class="[$i18n.locale === 'ar' ? 'left-0' : 'right-0']"
        style="background-color: rgb(var(--bg-primary)); border-color: rgb(var(--color-surface-200));"
        role="listbox"
      >
        <button
          v-for="theme in themes"
          :key="theme.id"
          role="option"
          :aria-selected="theme.id === currentTheme"
          class="w-full px-4 py-2.5 text-start text-sm font-medium transition-colors flex items-center gap-3"
          :class="theme.id === currentTheme ? 'bg-primary-100 text-primary-700' : 'hover:bg-surface-100'"
          :style="theme.id !== currentTheme ? { color: 'rgb(var(--text-primary))' } : {}"
          @click="selectTheme(theme.id)"
        >
          <span>{{ themeIcons[theme.id] }}</span>
          <span>{{ t(theme.name) }}</span>
          <svg v-if="theme.id === currentTheme" class="w-4 h-4 ms-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>
