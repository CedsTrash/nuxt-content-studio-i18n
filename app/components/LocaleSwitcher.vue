<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)

const availableLocales = computed(() =>
  locales.value.filter(l => typeof l !== 'string')
)

const currentLocale = computed(() =>
  availableLocales.value.find(l => l.code === locale.value)
)

function selectLocale(code: string) {
  setLocale(code as 'fr' | 'es' | 'ar' | 'it' | 'de')
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.locale-switcher')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="locale-switcher relative">
    <button
      class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-surface-100"
      :style="{ color: 'rgb(var(--text-secondary))' }"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click.stop="isOpen = !isOpen"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
      <span class="text-sm font-medium hidden sm:inline">{{ currentLocale?.code.toUpperCase() }}</span>
      <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        class="absolute top-full mt-2 rounded-lg shadow-lg border overflow-hidden min-w-[140px] z-50"
        :class="[$i18n.locale === 'ar' ? 'left-0' : 'right-0']"
        style="background-color: rgb(var(--bg-primary)); border-color: rgb(var(--color-surface-200));"
        role="listbox"
      >
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          role="option"
          :aria-selected="loc.code === locale"
          class="w-full px-4 py-2.5 text-start text-sm font-medium transition-colors flex items-center gap-2"
          :class="loc.code === locale ? 'bg-primary-100 text-primary-700' : 'hover:bg-surface-100'"
          :style="loc.code !== locale ? { color: 'rgb(var(--text-primary))' } : {}"
          @click="selectLocale(loc.code)"
        >
          <span>{{ loc.name }}</span>
          <svg v-if="loc.code === locale" class="w-4 h-4 ms-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>
