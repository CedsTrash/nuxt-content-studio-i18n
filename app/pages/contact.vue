<script setup lang="ts">
import type { ContactForm } from '~/types/project'

const { t } = useI18n()

// Form state
const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

// Validation
const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validateForm(): boolean {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = t('validation.required')
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t('validation.required')
    isValid = false
  } else if (!validateEmail(form.email)) {
    errors.email = t('validation.email')
    isValid = false
  }

  if (!form.subject.trim()) {
    errors.subject = t('validation.required')
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = t('validation.required')
    isValid = false
  } else if (form.message.length < 10) {
    errors.message = t('validation.minLength', { min: 10 })
    isValid = false
  }

  return isValid
}

async function submitForm() {
  error.value = null

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch<{ success: boolean; error?: string }>('/api/contact', {
      method: 'POST',
      body: form
    })

    if (response.success) {
      success.value = true
      // Reset form
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
    } else {
      error.value = response.error || t('contact.error.message')
    }
  } catch (e) {
    error.value = t('contact.error.message')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  success.value = false
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
            {{ t('contact.title') }}
          </h1>
          <p
            class="text-xl"
            style="color: rgb(var(--text-secondary));"
          >
            {{ t('contact.subtitle') }}
          </p>
        </div>
      </UiContainer>
    </section>

    <!-- Contact Section -->
    <section class="section-spacing">
      <UiContainer size="lg">
        <div class="grid lg:grid-cols-5 gap-12">
          <!-- Form -->
          <div class="lg:col-span-3">
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
                {{ t('contact.success.title') }}
              </h2>
              <p
                class="text-lg mb-8"
                style="color: rgb(var(--text-secondary));"
              >
                {{ t('contact.success.message') }}
              </p>
              <UiButton variant="outline" @click="resetForm">
                {{ t('contact.form.submit') }}
              </UiButton>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="submitForm">
              <div class="space-y-6">
                <!-- Name -->
                <div>
                  <label for="name" class="label">{{ t('contact.form.name') }}</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    :placeholder="t('contact.form.namePlaceholder')"
                    class="input"
                    :class="{ 'border-red-500': errors.name }"
                  >
                  <p v-if="errors.name" class="mt-1 text-sm text-red-500">
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="label">{{ t('contact.form.email') }}</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    :placeholder="t('contact.form.emailPlaceholder')"
                    class="input"
                    :class="{ 'border-red-500': errors.email }"
                  >
                  <p v-if="errors.email" class="mt-1 text-sm text-red-500">
                    {{ errors.email }}
                  </p>
                </div>

                <!-- Subject -->
                <div>
                  <label for="subject" class="label">{{ t('contact.form.subject') }}</label>
                  <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    :placeholder="t('contact.form.subjectPlaceholder')"
                    class="input"
                    :class="{ 'border-red-500': errors.subject }"
                  >
                  <p v-if="errors.subject" class="mt-1 text-sm text-red-500">
                    {{ errors.subject }}
                  </p>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="label">{{ t('contact.form.message') }}</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    rows="6"
                    :placeholder="t('contact.form.messagePlaceholder')"
                    class="input resize-none"
                    :class="{ 'border-red-500': errors.message }"
                  />
                  <p v-if="errors.message" class="mt-1 text-sm text-red-500">
                    {{ errors.message }}
                  </p>
                </div>

                <!-- Error -->
                <div v-if="error" class="p-4 rounded-lg bg-red-50 text-red-700">
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
                  {{ t('contact.form.submit') }}
                </UiButton>
              </div>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="lg:col-span-2">
            <UiCard padding="lg">
              <h3
                class="text-lg font-semibold mb-6"
                style="color: rgb(var(--text-primary));"
              >
                {{ t('contact.info.title') }}
              </h3>

              <div class="space-y-6">
                <!-- Address -->
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium mb-1" style="color: rgb(var(--text-primary));">
                      {{ t('contact.info.address') }}
                    </h4>
                    <p style="color: rgb(var(--text-secondary));">
                      Khamlia, Merzouga<br>
                      Errachidia, Morocco
                    </p>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium mb-1" style="color: rgb(var(--text-primary));">
                      {{ t('contact.info.email') }}
                    </h4>
                    <a
                      href="mailto:contact@khamlia-association.org"
                      class="text-primary-600 hover:underline"
                    >
                      contact@khamlia-association.org
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium mb-1" style="color: rgb(var(--text-primary));">
                      {{ t('contact.info.phone') }}
                    </h4>
                    <a
                      href="tel:+212500000000"
                      class="text-primary-600 hover:underline"
                    >
                      +212 5XX XX XX XX
                    </a>
                  </div>
                </div>

                <!-- Hours -->
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium mb-1" style="color: rgb(var(--text-primary));">
                      {{ t('contact.info.hours') }}
                    </h4>
                    <p style="color: rgb(var(--text-secondary));">
                      Lundi - Vendredi: 9h - 18h<br>
                      Samedi: 9h - 13h
                    </p>
                  </div>
                </div>
              </div>
            </UiCard>

            <!-- Map placeholder -->
            <div class="mt-6 aspect-video rounded-xl overflow-hidden bg-surface-200 flex items-center justify-center">
              <div class="text-center p-4" style="color: rgb(var(--text-muted));">
                <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p>Khamlia, Merzouga</p>
                <p class="text-sm">31°01'N, 4°00'W</p>
              </div>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>
  </div>
</template>
