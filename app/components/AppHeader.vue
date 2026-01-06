<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navItems = computed(() => [
  { key: 'home', path: '/' },
  { key: 'team', path: '/team' },
  { key: 'projects', path: '/projects' },
  { key: 'donate', path: '/donate' },
  { key: 'contact', path: '/contact' }
])

const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b backdrop-blur-md" style="background-color: rgb(var(--bg-primary) / 0.9); border-color: rgb(var(--color-surface-200));">
    <div class="container-page">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group" @click="closeMobileMenu">
          <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
            K
          </div>
          <span class="font-semibold text-lg hidden sm:block" style="color: rgb(var(--text-primary));">
            Khamlia
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.key"
            :to="localePath(item.path)"
            class="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-surface-100"
            :style="{ color: 'rgb(var(--text-secondary))' }"
            active-class="!bg-primary-100 !text-primary-700"
          >
            {{ t(`nav.${item.key}`) }}
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeSwitcher />

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            @click="toggleMobileMenu"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav v-if="mobileMenuOpen" class="md:hidden py-4 border-t" style="border-color: rgb(var(--color-surface-200));">
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.key"
              :to="localePath(item.path)"
              class="px-4 py-3 rounded-lg font-medium transition-colors hover:bg-surface-100"
              :style="{ color: 'rgb(var(--text-secondary))' }"
              active-class="!bg-primary-100 !text-primary-700"
              @click="closeMobileMenu"
            >
              {{ t(`nav.${item.key}`) }}
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
