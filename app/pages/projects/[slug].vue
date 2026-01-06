<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const slug = computed(() => route.params.slug as string)

// Fetch project by slug and locale
const { data: project, error } = await useAsyncData(
  `project-${slug.value}-${locale.value}`,
  () => queryCollection('projects')
    .where('slug', '=', slug.value)
    .where('locale', '=', locale.value)
    .first(),
  { watch: [locale] }
)

// Handle 404
if (error.value || !project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found'
  })
}

const progress = computed(() => {
  if (!project.value?.goalAmount) return 0
  return Math.min(100, Math.round(((project.value.raisedAmount || 0) / project.value.goalAmount) * 100))
})

const statusClass = computed(() => {
  switch (project.value?.status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'planned':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-surface-100 text-surface-800'
  }
})

// Gallery lightbox
const selectedImage = ref<string | null>(null)
</script>

<template>
  <div v-if="project">
    <!-- Hero Section -->
    <section class="relative">
      <!-- Cover Image -->
      <div class="aspect-[21/9] overflow-hidden">
        <img
          :src="project.coverImage || '/images/projects/placeholder.svg'"
          :alt="project.title"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <!-- Title Overlay -->
      <div class="absolute bottom-0 inset-x-0 pb-8 md:pb-12">
        <UiContainer>
          <NuxtLink
            :to="localePath('/projects')"
            class="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg class="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ t('common.back') }}
          </NuxtLink>
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="statusClass"
            >
              {{ t(`projects.status.${project.status}`) }}
            </span>
            <span class="text-white/80 text-sm">
              {{ t(`projects.filter.${project.category}`) }}
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl">
            {{ project.title }}
          </h1>
        </UiContainer>
      </div>
    </section>

    <!-- Content Section -->
    <section class="section-spacing">
      <UiContainer>
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Description -->
            <div class="prose prose-lg max-w-none" style="color: rgb(var(--text-secondary));">
              <p class="text-xl leading-relaxed mb-8">
                {{ project.excerpt }}
              </p>
              <ContentRenderer v-if="project.body" :value="project" />
            </div>

            <!-- Gallery -->
            <div v-if="project.gallery?.length" class="mt-12">
              <h2 class="text-2xl font-bold mb-6" style="color: rgb(var(--text-primary));">
                Galerie
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button
                  v-for="(image, index) in project.gallery"
                  :key="index"
                  class="aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                  @click="selectedImage = image"
                >
                  <img
                    :src="image"
                    :alt="`${project.title} - Image ${index + 1}`"
                    class="w-full h-full object-cover"
                  >
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-6">
              <!-- Progress Card -->
              <UiCard padding="lg">
                <h3
                  class="text-lg font-semibold mb-4"
                  style="color: rgb(var(--text-primary));"
                >
                  {{ t('projects.progress') }}
                </h3>

                <UiProgressBar
                  :value="project.raisedAmount || 0"
                  :max="project.goalAmount"
                  size="lg"
                  show-label
                />

                <div class="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <div class="text-sm" style="color: rgb(var(--text-muted));">
                      {{ t('projects.raised') }}
                    </div>
                    <div class="text-xl font-bold text-primary-600">
                      {{ formatAmount(project.raisedAmount || 0, locale) }}€
                    </div>
                  </div>
                  <div>
                    <div class="text-sm" style="color: rgb(var(--text-muted));">
                      {{ t('projects.goal') }}
                    </div>
                    <div class="text-xl font-bold" style="color: rgb(var(--text-primary));">
                      {{ formatAmount(project.goalAmount, locale) }}€
                    </div>
                  </div>
                </div>

                <NuxtLink
                  :to="localePath(`/donate?project=${project.slug}`)"
                  class="block mt-6"
                >
                  <UiButton variant="primary" class="w-full">
                    {{ t('projects.donateToProject') }}
                  </UiButton>
                </NuxtLink>
              </UiCard>

              <!-- Info Card -->
              <UiCard padding="lg">
                <h3
                  class="text-lg font-semibold mb-4"
                  style="color: rgb(var(--text-primary));"
                >
                  Informations
                </h3>

                <dl class="space-y-4">
                  <div>
                    <dt class="text-sm" style="color: rgb(var(--text-muted));">
                      {{ t('projects.location') }}
                    </dt>
                    <dd style="color: rgb(var(--text-primary));">
                      {{ project.location }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-sm" style="color: rgb(var(--text-muted));">
                      Date
                    </dt>
                    <dd style="color: rgb(var(--text-primary));">
                      {{ formatDate(project.date, locale) }}
                    </dd>
                  </div>
                  <div v-if="project.tags?.length">
                    <dt class="text-sm mb-2" style="color: rgb(var(--text-muted));">
                      Tags
                    </dt>
                    <dd class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in project.tags"
                        :key="tag"
                        class="px-2 py-1 rounded text-sm"
                        style="background-color: rgb(var(--color-surface-200)); color: rgb(var(--text-secondary));"
                      >
                        {{ tag }}
                      </span>
                    </dd>
                  </div>
                </dl>
              </UiCard>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedImage"
          class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          @click="selectedImage = null"
        >
          <button
            class="absolute top-4 end-4 text-white/80 hover:text-white"
            @click="selectedImage = null"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            :src="selectedImage"
            :alt="project.title"
            class="max-w-full max-h-[90vh] object-contain"
            @click.stop
          >
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
