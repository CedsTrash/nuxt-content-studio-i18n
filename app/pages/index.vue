<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

// Fetch featured projects for the current locale
const { data: featuredProjects } = await useAsyncData(
  `featured-projects-${locale.value}`,
  () => queryCollection('projects')
    .where('featured', '=', true)
    .where('locale', '=', locale.value)
    .limit(3)
    .all(),
  { watch: [locale] }
)

// Impact stats
const impactStats = [
  { key: 'families', value: 250 },
  { key: 'projects', value: 15 },
  { key: 'volunteers', value: 45 },
  { key: 'years', value: 14 }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-10" />
      <UiContainer>
        <div class="relative max-w-3xl mx-auto text-center">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
            style="color: rgb(var(--text-primary));"
          >
            {{ t('home.hero.title') }}
          </h1>
          <p
            class="text-xl md:text-2xl mb-8 text-balance"
            style="color: rgb(var(--text-secondary));"
          >
            {{ t('home.hero.subtitle') }}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <NuxtLink :to="localePath('/projects')">
              <UiButton variant="primary" size="lg">
                {{ t('home.hero.cta') }}
              </UiButton>
            </NuxtLink>
            <NuxtLink :to="localePath('/donate')">
              <UiButton variant="outline" size="lg">
                {{ t('home.hero.donate') }}
              </UiButton>
            </NuxtLink>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- About Section -->
    <section class="section-spacing" style="background-color: rgb(var(--bg-secondary));">
      <UiContainer>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <UiSectionTitle>
              <template #title>{{ t('home.about.title') }}</template>
            </UiSectionTitle>
            <p
              class="mt-6 text-lg leading-relaxed"
              style="color: rgb(var(--text-secondary));"
            >
              {{ t('home.about.description') }}
            </p>
            <div class="mt-8">
              <NuxtLink :to="localePath('/team')">
                <UiButton variant="secondary">
                  {{ t('common.learnMore') }}
                </UiButton>
              </NuxtLink>
            </div>
          </div>
          <div class="relative">
            <img
              src="/images/khamlia-village.svg"
              alt="Khamlia Village"
              class="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
            >
            <div
              class="absolute -bottom-6 -start-6 w-32 h-32 rounded-xl flex items-center justify-center shadow-lg"
              style="background-color: rgb(var(--bg-primary));"
            >
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600">14+</div>
                <div class="text-sm" style="color: rgb(var(--text-secondary));">{{ t('home.impact.years') }}</div>
              </div>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Featured Projects -->
    <section class="section-spacing">
      <UiContainer>
        <div class="text-center mb-12">
          <UiSectionTitle centered>
            <template #title>{{ t('home.featured.title') }}</template>
            <template #subtitle>{{ t('home.featured.subtitle') }}</template>
          </UiSectionTitle>
        </div>

        <div
          v-if="featuredProjects?.length"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.slug"
            :project="project"
          />
        </div>

        <div class="text-center mt-12">
          <NuxtLink :to="localePath('/projects')">
            <UiButton variant="outline">
              {{ t('common.viewAll') }}
            </UiButton>
          </NuxtLink>
        </div>
      </UiContainer>
    </section>

    <!-- How to Help -->
    <section class="section-spacing" style="background-color: rgb(var(--bg-secondary));">
      <UiContainer>
        <div class="text-center mb-12">
          <UiSectionTitle centered>
            <template #title>{{ t('home.howToHelp.title') }}</template>
            <template #subtitle>{{ t('home.howToHelp.subtitle') }}</template>
          </UiSectionTitle>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Donate -->
          <UiCard padding="lg" class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3" style="color: rgb(var(--text-primary));">
              {{ t('home.howToHelp.donate.title') }}
            </h3>
            <p style="color: rgb(var(--text-secondary));">
              {{ t('home.howToHelp.donate.description') }}
            </p>
          </UiCard>

          <!-- Volunteer -->
          <UiCard padding="lg" class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3" style="color: rgb(var(--text-primary));">
              {{ t('home.howToHelp.volunteer.title') }}
            </h3>
            <p style="color: rgb(var(--text-secondary));">
              {{ t('home.howToHelp.volunteer.description') }}
            </p>
          </UiCard>

          <!-- Spread the word -->
          <UiCard padding="lg" class="text-center">
            <div class="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3" style="color: rgb(var(--text-primary));">
              {{ t('home.howToHelp.spread.title') }}
            </h3>
            <p style="color: rgb(var(--text-secondary));">
              {{ t('home.howToHelp.spread.description') }}
            </p>
          </UiCard>
        </div>
      </UiContainer>
    </section>

    <!-- Impact Stats -->
    <section class="section-spacing">
      <UiContainer>
        <div class="text-center mb-12">
          <UiSectionTitle centered>
            <template #title>{{ t('home.impact.title') }}</template>
          </UiSectionTitle>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in impactStats" :key="stat.key" class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              {{ stat.value }}+
            </div>
            <div class="text-lg" style="color: rgb(var(--text-secondary));">
              {{ t(`home.impact.${stat.key}`) }}
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-28 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <UiContainer>
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-balance">
            {{ t('home.cta.title') }}
          </h2>
          <p class="text-xl mb-8 opacity-90 text-balance">
            {{ t('home.cta.description') }}
          </p>
          <NuxtLink :to="localePath('/donate')">
            <UiButton
              variant="secondary"
              size="lg"
              class="!bg-white !text-primary-700 hover:!bg-primary-50"
            >
              {{ t('home.cta.button') }}
            </UiButton>
          </NuxtLink>
        </div>
      </UiContainer>
    </section>
  </div>
</template>
