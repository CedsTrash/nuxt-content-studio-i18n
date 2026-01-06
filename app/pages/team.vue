<script setup lang="ts">
import type { TeamMember } from '~/types/project'

const { t } = useI18n()

// Team members data
const teamMembers: TeamMember[] = [
  {
    name: 'Hassan Boulam',
    role: 'Président / Founder',
    bio: 'Né à Khamlia, Hassan a fondé l\'association en 2010 pour préserver la culture Gnawa et améliorer les conditions de vie de sa communauté. Musicien traditionnel, il est aussi guide du désert.',
    image: '/images/team/hassan.svg'
  },
  {
    name: 'Fatima Ouali',
    role: 'Vice-Présidente',
    bio: 'Fatima coordonne les projets d\'autonomisation des femmes et gère les ateliers d\'artisanat. Elle est engagée pour l\'éducation des jeunes filles du village.',
    image: '/images/team/fatima.svg'
  },
  {
    name: 'Mohamed Ait Brahim',
    role: 'Trésorier',
    bio: 'Comptable de formation, Mohamed assure la gestion financière transparente de l\'association et supervise les rapports aux donateurs.',
    image: '/images/team/mohamed.svg'
  },
  {
    name: 'Aicha Gnaoui',
    role: 'Coordinatrice des Projets',
    bio: 'Aicha coordonne les projets sur le terrain et fait le lien entre l\'association et les familles bénéficiaires. Elle parle français, arabe et berbère.',
    image: '/images/team/aicha.svg'
  },
  {
    name: 'Youssef El Fadili',
    role: 'Responsable Éducation',
    bio: 'Enseignant de profession, Youssef supervise les programmes éducatifs et le soutien scolaire pour les enfants de Khamlia.',
    image: '/images/team/youssef.svg'
  },
  {
    name: 'Marie Dupont',
    role: 'Responsable Communication',
    bio: 'Basée en France, Marie gère la communication internationale et les relations avec les partenaires européens. Elle visite Khamlia plusieurs fois par an.',
    image: '/images/team/marie.svg'
  }
]
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
            {{ t('team.title') }}
          </h1>
          <p
            class="text-xl"
            style="color: rgb(var(--text-secondary));"
          >
            {{ t('team.subtitle') }}
          </p>
        </div>
      </UiContainer>
    </section>

    <!-- Team Grid -->
    <section class="section-spacing">
      <UiContainer>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard
            v-for="member in teamMembers"
            :key="member.name"
            padding="none"
          >
            <!-- Photo -->
            <div class="aspect-square overflow-hidden">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover"
              >
            </div>

            <!-- Info -->
            <div class="p-6">
              <h3
                class="text-xl font-semibold mb-1"
                style="color: rgb(var(--text-primary));"
              >
                {{ member.name }}
              </h3>
              <p class="text-primary-600 font-medium mb-3">
                {{ member.role }}
              </p>
              <p
                class="text-sm leading-relaxed"
                style="color: rgb(var(--text-secondary));"
              >
                {{ member.bio }}
              </p>
            </div>
          </UiCard>
        </div>
      </UiContainer>
    </section>

    <!-- Join Us CTA -->
    <section class="section-spacing" style="background-color: rgb(var(--bg-secondary));">
      <UiContainer>
        <div class="max-w-2xl mx-auto text-center">
          <h2
            class="text-3xl font-bold mb-4"
            style="color: rgb(var(--text-primary));"
          >
            {{ t('home.howToHelp.volunteer.title') }}
          </h2>
          <p
            class="text-lg mb-8"
            style="color: rgb(var(--text-secondary));"
          >
            {{ t('home.howToHelp.volunteer.description') }}
          </p>
          <NuxtLink :to="useLocalePath()('/contact')">
            <UiButton variant="primary" size="lg">
              {{ t('nav.contact') }}
            </UiButton>
          </NuxtLink>
        </div>
      </UiContainer>
    </section>
  </div>
</template>
