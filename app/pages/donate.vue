<script setup lang="ts">
import type { DonationForm } from '~/types/project'

const { t, locale } = useI18n()
const route = useRoute()

// Get project from query param (for direct links)
const initialProjectSlug = computed(() => route.query.project as string | undefined)

// Fetch projects for the current locale (for the dropdown)
const { data: allProjects } = await useAsyncData(
  `donate-projects-${locale.value}`,
  () => queryCollection(`projects_${locale.value}`)
    .all(),
  { watch: [locale] }
)

// Selected project slug (from dropdown or query param)
const selectedProjectSlug = ref<string | null>(initialProjectSlug.value || null)

// Get the selected project details
const project = computed(() => {
  if (!selectedProjectSlug.value || !allProjects.value) return null
  return allProjects.value.find(p => p.slug === selectedProjectSlug.value) || null
})

// Form state
const form = reactive<DonationForm>({
  amount: 50,
  frequency: 'one-time',
  projectSlug: initialProjectSlug.value,
  dedication: ''
})

// Update form when project selection changes
watch(selectedProjectSlug, (newSlug) => {
  form.projectSlug = newSlug || undefined
})

const customAmount = ref('')
const isSubmitting = ref(false)
const error = ref<string | null>(null)
const success = ref<{ reference: string } | null>(null)

// Preset amounts
const presetAmounts = [20, 50, 100, 200, 500]

function selectAmount(amount: number) {
  form.amount = amount
  customAmount.value = ''
}

function handleCustomAmount() {
  const value = parseInt(customAmount.value)
  if (!isNaN(value) && value > 0) {
    form.amount = value
  }
}

async function submitDonation() {
  error.value = null

  // Validation
  if (form.amount < 1) {
    error.value = t('donate.error.minAmount')
    return
  }

  isSubmitting.value = true

  try {
    const endpoint = form.frequency === 'monthly'
      ? '/api/donations/recurring'
      : '/api/donations/one-time'

    const response = await $fetch<{ success: boolean; reference?: string; error?: string }>(endpoint, {
      method: 'POST',
      body: {
        amount: form.amount,
        projectSlug: selectedProjectSlug.value || null,
        dedication: form.dedication || null
      }
    })

    if (response.success && response.reference) {
      success.value = { reference: response.reference }
    } else {
      error.value = response.error || t('donate.error.message')
    }
  } catch (e) {
    error.value = t('donate.error.message')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  success.value = null
  form.amount = 50
  form.frequency = 'one-time'
  form.dedication = ''
  customAmount.value = ''
  selectedProjectSlug.value = null
}
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
            {{ t('donate.title') }}
          </h1>
          <p
            class="text-xl"
            style="color: rgb(var(--text-secondary));"
          >
            {{ t('donate.subtitle') }}
          </p>
        </div>
      </UiContainer>
    </section>

    <!-- Donation Form -->
    <section class="section-spacing">
      <UiContainer size="md">
        <!-- Success State -->
        <div v-if="success" class="text-center py-12">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2
            class="text-2xl font-bold mb-4"
            style="color: rgb(var(--text-primary));"
          >
            {{ t('donate.success.title') }}
          </h2>
          <p
            class="text-lg mb-6"
            style="color: rgb(var(--text-secondary));"
          >
            {{ t('donate.success.message') }}
          </p>
          <p class="text-sm mb-8" style="color: rgb(var(--text-muted));">
            {{ t('donate.success.reference') }}: <strong>{{ success.reference }}</strong>
          </p>
          <UiButton variant="outline" @click="resetForm">
            {{ t('donate.title') }}
          </UiButton>
        </div>

        <!-- Form -->
        <div v-else class="grid lg:grid-cols-5 gap-12">
          <!-- Main Form -->
          <div class="lg:col-span-3">
            <form @submit.prevent="submitDonation">
              <!-- Project Selection -->
              <div class="mb-8">
                <label class="label">{{ t('donate.projectSelection.title') }}</label>
                <select
                  v-model="selectedProjectSlug"
                  class="input"
                >
                  <option :value="null">
                    {{ t('donate.projectSelection.general') }}
                  </option>
                  <option
                    v-for="p in allProjects"
                    :key="p.slug"
                    :value="p.slug"
                  >
                    {{ p.title }}
                  </option>
                </select>

                <!-- Selected Project Info -->
                <div v-if="project" class="mt-4">
                  <UiCard padding="sm" class="flex items-center gap-4">
                    <img
                      :src="project.coverImage || '/images/projects/placeholder.svg'"
                      :alt="project.title"
                      class="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    >
                    <div class="min-w-0 flex-1">
                      <h3
                        class="font-semibold truncate"
                        style="color: rgb(var(--text-primary));"
                      >
                        {{ project.title }}
                      </h3>
                      <UiProgressBar
                        :value="project.raisedAmount || 0"
                        :max="project.goalAmount || 0"
                        size="sm"
                        class="mt-2"
                      />
                      <div class="text-sm mt-1" style="color: rgb(var(--text-secondary));">
                        {{ formatAmount(project.raisedAmount || 0, locale) }}€ / {{ formatAmount(project.goalAmount || 0, locale) }}€
                      </div>
                    </div>
                  </UiCard>
                </div>
              </div>

              <!-- Amount Selection -->
              <div class="mb-8">
                <label class="label">{{ t('donate.amount.title') }}</label>
                <div class="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  <button
                    v-for="amount in presetAmounts"
                    :key="amount"
                    type="button"
                    class="py-3 px-4 rounded-lg font-semibold transition-colors border-2"
                    :class="form.amount === amount && !customAmount
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-transparent hover:bg-surface-100'"
                    :style="form.amount !== amount || customAmount ? { backgroundColor: 'rgb(var(--color-surface-100))', color: 'rgb(var(--text-primary))' } : {}"
                    @click="selectAmount(amount)"
                  >
                    {{ amount }}€
                  </button>
                </div>
                <div class="relative">
                  <input
                    v-model="customAmount"
                    type="number"
                    min="1"
                    :placeholder="t('donate.amount.placeholder')"
                    class="input pe-12"
                    @input="handleCustomAmount"
                  >
                  <span class="absolute end-4 top-1/2 -translate-y-1/2 font-medium" style="color: rgb(var(--text-muted));">€</span>
                </div>
              </div>

              <!-- Frequency -->
              <div class="mb-8">
                <label class="label">{{ t('donate.frequency.title') }}</label>
                <div class="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    class="py-4 px-6 rounded-lg font-medium transition-colors border-2 flex items-center justify-center gap-3"
                    :class="form.frequency === 'one-time'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-transparent hover:bg-surface-100'"
                    :style="form.frequency !== 'one-time' ? { backgroundColor: 'rgb(var(--color-surface-100))', color: 'rgb(var(--text-primary))' } : {}"
                    @click="form.frequency = 'one-time'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ t('donate.frequency.oneTime') }}
                  </button>
                  <button
                    type="button"
                    class="py-4 px-6 rounded-lg font-medium transition-colors border-2 flex items-center justify-center gap-3"
                    :class="form.frequency === 'monthly'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-transparent hover:bg-surface-100'"
                    :style="form.frequency !== 'monthly' ? { backgroundColor: 'rgb(var(--color-surface-100))', color: 'rgb(var(--text-primary))' } : {}"
                    @click="form.frequency = 'monthly'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {{ t('donate.frequency.monthly') }}
                  </button>
                </div>
              </div>

              <!-- Dedication -->
              <div class="mb-8">
                <label class="label">{{ t('donate.dedication.title') }}</label>
                <textarea
                  v-model="form.dedication"
                  rows="3"
                  :placeholder="t('donate.dedication.placeholder')"
                  class="input resize-none"
                />
              </div>

              <!-- Error -->
              <div v-if="error" class="mb-6 p-4 rounded-lg bg-red-50 text-red-700">
                {{ error }}
              </div>

              <!-- Submit -->
              <UiButton
                type="submit"
                variant="primary"
                size="lg"
                class="w-full"
                :loading="isSubmitting"
                :disabled="isSubmitting"
              >
                {{ t('donate.submit') }}
              </UiButton>
            </form>
          </div>

          <!-- Summary Sidebar -->
          <div class="lg:col-span-2">
            <div class="sticky top-24">
              <UiCard padding="lg">
                <h3
                  class="text-lg font-semibold mb-6"
                  style="color: rgb(var(--text-primary));"
                >
                  {{ t('donate.summary.title') }}
                </h3>

                <dl class="space-y-4">
                  <div class="flex justify-between">
                    <dt style="color: rgb(var(--text-secondary));">
                      {{ t('donate.summary.amount') }}
                    </dt>
                    <dd class="font-semibold text-primary-600">
                      {{ form.amount }}€
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt style="color: rgb(var(--text-secondary));">
                      {{ t('donate.summary.frequency') }}
                    </dt>
                    <dd style="color: rgb(var(--text-primary));">
                      {{ t(`donate.frequency.${form.frequency === 'monthly' ? 'monthly' : 'oneTime'}`) }}
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt style="color: rgb(var(--text-secondary));">
                      {{ t('donate.summary.project') }}
                    </dt>
                    <dd class="text-end truncate max-w-[150px]" style="color: rgb(var(--text-primary));">
                      {{ project ? project.title : t('donate.generalDonation') }}
                    </dd>
                  </div>
                </dl>

                <div class="mt-6 pt-6 border-t" style="border-color: rgb(var(--color-surface-200));">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold" style="color: rgb(var(--text-primary));">
                      Total
                    </span>
                    <span class="text-2xl font-bold text-primary-600">
                      {{ form.amount }}€
                      <span v-if="form.frequency === 'monthly'" class="text-sm font-normal" style="color: rgb(var(--text-muted));">
                        /{{ t('donate.frequency.monthly').toLowerCase() }}
                      </span>
                    </span>
                  </div>
                </div>
              </UiCard>

              <!-- Security Note -->
              <div class="mt-6 flex items-start gap-3 text-sm" style="color: rgb(var(--text-muted));">
                <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p>
                  Vos informations de paiement sont sécurisées. Ce formulaire utilise un mode démo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>
  </div>
</template>
