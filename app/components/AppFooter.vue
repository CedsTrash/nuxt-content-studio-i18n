<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const currentYear = new Date().getFullYear()

const quickLinks = computed(() => [
  { key: 'home', path: '/' },
  { key: 'projects', path: '/projects' },
  { key: 'team', path: '/team' },
  { key: 'donate', path: '/donate' },
  { key: 'contact', path: '/contact' }
])

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/khamlia' },
  { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/khamlia' },
  { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/khamlia' }
]
</script>

<template>
  <footer class="border-t" style="background-color: rgb(var(--bg-secondary)); border-color: rgb(var(--color-surface-200));">
    <div class="container-page py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- About -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
              K
            </div>
            <span class="font-semibold text-lg" style="color: rgb(var(--text-primary));">
              Khamlia Association
            </span>
          </div>
          <p class="max-w-md leading-relaxed" style="color: rgb(var(--text-secondary));">
            {{ t('footer.description') }}
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-4 mt-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-primary-100 hover:text-primary-600"
              style="background-color: rgb(var(--color-surface-200)); color: rgb(var(--text-secondary));"
              :aria-label="social.name"
            >
              <svg v-if="social.icon === 'facebook'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <svg v-else-if="social.icon === 'instagram'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <svg v-else-if="social.icon === 'twitter'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold mb-4" style="color: rgb(var(--text-primary));">
            {{ t('footer.quickLinks') }}
          </h3>
          <nav class="flex flex-col gap-2">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.key"
              :to="localePath(link.path)"
              class="transition-colors hover:text-primary-600"
              style="color: rgb(var(--text-secondary));"
            >
              {{ t(`nav.${link.key}`) }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="font-semibold mb-4" style="color: rgb(var(--text-primary));">
            {{ t('contact.info.title') }}
          </h3>
          <div class="flex flex-col gap-3" style="color: rgb(var(--text-secondary));">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Khamlia, Merzouga<br>Errachidia, Morocco</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@khamlia-association.org</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+212 5XX XX XX XX</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t text-center" style="border-color: rgb(var(--color-surface-300)); color: rgb(var(--text-muted));">
        {{ t('footer.copyright', { year: currentYear }) }}
      </div>
    </div>
  </footer>
</template>
