<script setup lang="ts">
const { t, locale } = useI18n()

// Filter state
const selectedCategory = ref<string>('all')
const selectedStatus = ref<string>('all')

// Fetch projects for the current locale
const { data: allProjects } = await useAsyncData(
  `projects-${locale.value}`,
  () => queryCollection('projects').where('locale', '=', locale.value).all(),
  { watch: [locale] }
)

// Filter projects
const filteredProjects = computed(() => {
  if (!allProjects.value) return []

  return allProjects.value.filter(project => {
    const categoryMatch = selectedCategory.value === 'all' || project.category === selectedCategory.value
    const statusMatch = selectedStatus.value === 'all' || project.status === selectedStatus.value
    return categoryMatch && statusMatch
  })
})

const categories = ['all', 'education', 'women', 'water', 'culture', 'health']
const statuses = ['all', 'planned', 'active', 'completed']
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-16 md:py-24" style="background-color: rgb(var(--bg-secondary));">
      <UiContainer>
        <div class="max-w-3xl mx-auto text-center">
          <h1
            class="text-4xl md:text-5xl font-bold mb-6"
            style="color: rgb(var(--text-primary));"
          >
            {{ t('projects.title') }}
          </h1>
          <p
            class="text-xl"
            style="color: rgb(var(--text-secondary));"
          >
            {{ t('projects.subtitle') }}
          </p>
        </div>
      </UiContainer>
    </section>

    <!-- Filters & Projects -->
    <section class="section-spacing">
      <UiContainer>
        <!-- Filters -->
        <div class="flex flex-wrap gap-4 mb-12">
          <!-- Category Filter -->
          <div class="flex-1 min-w-[200px]">
            <label class="label">{{ t('common.filter') }} - {{ t('projects.filter.all') }}</label>
            <select
              v-model="selectedCategory"
              class="input"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ t(`projects.filter.${cat}`) }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div class="flex-1 min-w-[200px]">
            <label class="label">{{ t('projects.status.all') }}</label>
            <select
              v-model="selectedStatus"
              class="input"
            >
              <option v-for="status in statuses" :key="status" :value="status">
                {{ t(`projects.status.${status}`) }}
              </option>
            </select>
          </div>
        </div>

        <!-- Projects Grid -->
        <div
          v-if="filteredProjects.length"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.slug"
            :project="project"
          />
        </div>

        <!-- No Projects -->
        <div
          v-else
          class="text-center py-16"
          style="color: rgb(var(--text-secondary));"
        >
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg">{{ t('projects.noProjects') }}</p>
        </div>
      </UiContainer>
    </section>
  </div>
</template>
