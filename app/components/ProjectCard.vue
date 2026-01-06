<script setup lang="ts">
const props = defineProps<{
  project: {
    title: string
    slug: string
    excerpt: string
    category: string
    status: string
    location?: string
    goalAmount: number
    raisedAmount?: number
    featured?: boolean
    tags?: string[]
    coverImage?: string
  }
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const progress = computed(() => {
  if (!props.project.goalAmount) return 0
  return Math.min(100, Math.round(((props.project.raisedAmount || 0) / props.project.goalAmount) * 100))
})

const statusClass = computed(() => {
  switch (props.project.status) {
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
</script>

<template>
  <NuxtLink
    :to="localePath(`/projects/${project.slug}`)"
    class="group block"
  >
    <UiCard hoverable padding="none">
      <!-- Cover Image -->
      <div class="relative aspect-[16/10] overflow-hidden">
        <img
          :src="project.coverImage || '/images/projects/placeholder.svg'"
          :alt="project.title"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        >
        <!-- Status Badge -->
        <span
          class="absolute top-3 start-3 px-2.5 py-1 rounded-full text-xs font-medium"
          :class="statusClass"
        >
          {{ t(`projects.status.${project.status}`) }}
        </span>
      </div>

      <!-- Content -->
      <div class="p-5">
        <!-- Category & Location -->
        <div class="flex items-center gap-2 text-sm mb-2" style="color: rgb(var(--text-muted));">
          <span class="capitalize">{{ t(`projects.filter.${project.category}`) }}</span>
          <span v-if="project.location">•</span>
          <span v-if="project.location">{{ project.location }}</span>
        </div>

        <!-- Title -->
        <h3
          class="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors"
          style="color: rgb(var(--text-primary));"
        >
          {{ project.title }}
        </h3>

        <!-- Excerpt -->
        <p
          class="text-sm line-clamp-2 mb-4"
          style="color: rgb(var(--text-secondary));"
        >
          {{ project.excerpt }}
        </p>

        <!-- Progress -->
        <div v-if="project.goalAmount" class="space-y-2">
          <UiProgressBar
            :value="project.raisedAmount || 0"
            :max="project.goalAmount"
            size="sm"
          />
          <div class="flex justify-between text-sm">
            <span style="color: rgb(var(--text-secondary));">
              {{ formatAmount(project.raisedAmount || 0, locale) }}€ / {{ formatAmount(project.goalAmount, locale) }}€
            </span>
            <span class="font-medium text-primary-600">
              {{ progress }}%
            </span>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="project.tags?.length" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in project.tags.slice(0, 3)"
            :key="tag"
            class="px-2 py-1 rounded text-xs"
            style="background-color: rgb(var(--color-surface-200)); color: rgb(var(--text-secondary));"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </UiCard>
  </NuxtLink>
</template>
