# Khamlia Association Website

A modern, multilingual website for Khamlia Association, a non-profit supporting the Gnawa community in the Sahara desert of Morocco.

Built with **Nuxt 4**, **TypeScript**, **Tailwind CSS**, **Nuxt Content**, and **Nuxt i18n**.

## Features

- **Multilingual Support**: French (default), Spanish, Arabic (RTL), Italian, German
- **Theme System**: 3 beautiful themes (Desert Sand, Oasis, Night Sky)
- **Content Management**: Markdown-based content with Nuxt Content
- **Donation System**: One-time and recurring donations (demo mode)
- **Contact Form**: With server-side validation and logging
- **Fully Responsive**: Mobile-first design
- **Accessible**: Semantic HTML, proper labels, focus states

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The site will be available at `http://localhost:3000`.

## Project Structure

```
khamlia/
├── assets/
│   └── css/
│       └── main.css          # Tailwind + theme variables
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   ├── Container.vue
│   │   ├── ProgressBar.vue
│   │   └── SectionTitle.vue
│   ├── AppHeader.vue
│   ├── AppFooter.vue
│   ├── LocaleSwitcher.vue
│   ├── ThemeSwitcher.vue
│   └── ProjectCard.vue
├── composables/
│   └── useTheme.ts           # Theme management
├── content/
│   ├── fr/projects/          # French project content
│   │   ├── ecole-khamlia.md
│   │   ├── cooperative-femmes.md
│   │   ├── puits-solaire.md
│   │   ├── festival-gnawa.md
│   │   ├── centre-sante.md
│   │   └── alphabetisation-adultes.md
│   ├── es/projects/          # Spanish translations
│   ├── ar/projects/          # Arabic translations (RTL)
│   ├── it/projects/          # Italian translations
│   └── de/projects/          # German translations
├── layouts/
│   └── default.vue
├── i18n/
│   └── locales/              # Translation files
│       ├── fr.json           # French (default)
│       ├── es.json           # Spanish
│       ├── ar.json           # Arabic
│       ├── it.json           # Italian
│       └── de.json           # German
├── pages/
│   ├── index.vue             # Homepage
│   ├── team.vue              # Team page
│   ├── contact.vue           # Contact page
│   ├── donate.vue            # Donation page
│   └── projects/
│       ├── index.vue         # Projects list
│       └── [slug].vue        # Project details
├── public/
│   └── images/               # Static images
├── server/
│   ├── api/
│   │   ├── contact.post.ts   # Contact form endpoint
│   │   └── donations/
│   │       ├── one-time.post.ts
│   │       └── recurring.post.ts
│   └── services/
│       └── donations/
│           ├── DonationProvider.ts      # Interface
│           └── MockDonationProvider.ts  # Demo implementation
├── types/
│   └── project.ts            # TypeScript types
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

## Configuration

### nuxt.config.ts

Key configuration options:

```typescript
export default defineNuxtConfig({
  // Enable Nuxt 4 compatibility
  future: {
    compatibilityVersion: 4
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/eslint'
  ],

  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json', dir: 'ltr' },
      { code: 'es', name: 'Español', file: 'es.json', dir: 'ltr' },
      { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'it', name: 'Italiano', file: 'it.json', dir: 'ltr' },
      { code: 'de', name: 'Deutsch', file: 'de.json', dir: 'ltr' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default'
  }
})
```

### tailwind.config.ts

The theme system uses CSS variables integrated with Tailwind:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          // ... other shades
        },
        surface: {
          // ... surface colors
        },
        accent: {
          // ... accent colors
        }
      }
    }
  }
}
```

## Content Management

### Adding/Editing Projects

Projects are stored as Markdown files organized by locale in `content/<locale>/projects/`. Each locale folder (fr, es, ar, it, de) contains the same projects translated into that language.

Each project file should have the following frontmatter:

```yaml
---
title: "Project Title"
slug: "project-slug"
excerpt: "Short description of the project"
category: "education"  # education, women, water, culture, health
status: "active"       # planned, active, completed
location: "Khamlia, Morocco"
goalAmount: 50000
raisedAmount: 25000
featured: true
tags:
  - tag1
  - tag2
coverImage: "/images/projects/project-cover.jpg"
gallery:
  - "/images/projects/project-1.jpg"
  - "/images/projects/project-2.jpg"
date: "2024-01-01"
---

## Project content in Markdown

Your detailed project description here...
```

### Adding Translations

1. Add new keys to all locale files in `i18n/locales/`
2. Use the `$t()` function in templates:

```vue
<template>
  <h1>{{ $t('home.hero.title') }}</h1>
</template>
```

3. For new locales, create a new JSON file and add it to `nuxt.config.ts`:

```typescript
locales: [
  // ... existing locales
  { code: 'pt', name: 'Português', file: 'pt.json', dir: 'ltr' }
]
```

## Theme System

### Available Themes

1. **Desert Sand** (`desert-sand`): Warm, earthy tones
2. **Oasis** (`oasis`): Cool, calm greens and blues
3. **Night Sky** (`night-sky`): Dark mode with indigo accents

### Using Themes

Themes are managed via the `useTheme()` composable:

```typescript
const { currentTheme, setTheme, themes } = useTheme()

// Change theme
setTheme('oasis')
```

### Customizing Themes

Edit the CSS variables in `assets/css/main.css`:

```css
[data-theme="your-theme"] {
  --color-primary-500: 232 121 47;
  --color-surface-500: 176 150 115;
  --color-accent-500: 228 91 91;
  --bg-primary: 250 247 243;
  --text-primary: 49 39 30;
}
```

## Donation System

### Demo Mode

The current implementation uses a mock provider that:
- Simulates payment processing
- Stores donations in `.data/donations.json`
- Returns fake payment intent/subscription IDs

### Replacing with a Real Provider

1. **Create a new provider** implementing `DonationProvider` interface:

```typescript
// server/services/donations/StripeDonationProvider.ts
import Stripe from 'stripe'
import type { DonationProvider, DonationRequest, OneTimePaymentResult } from './DonationProvider'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const stripeDonationProvider: DonationProvider = {
  async processOneTimePayment(request: DonationRequest): Promise<OneTimePaymentResult> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.amount * 100, // Stripe uses cents
      currency: request.currency || 'eur',
      metadata: {
        projectSlug: request.projectSlug || '',
        dedication: request.dedication || ''
      }
    })

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      reference: `DON-${paymentIntent.id.substring(3, 11).toUpperCase()}`
    }
  },

  async createRecurringDonation(request: DonationRequest): Promise<RecurringPaymentResult> {
    // Implement Stripe subscription logic
  },

  // ... other methods
}
```

2. **Update API endpoints** to use your new provider:

```typescript
// server/api/donations/one-time.post.ts
import { stripeDonationProvider } from '~/server/services/donations/StripeDonationProvider'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await stripeDonationProvider.processOneTimePayment(body)
})
```

3. **Add environment variables**:

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## RTL Support

Arabic content automatically switches to RTL layout:

- The `dir="rtl"` attribute is set on `<html>`
- Tailwind utilities use logical properties (`ms-`, `me-`, `ps-`, `pe-`)
- The Arabic font stack includes "IBM Plex Sans Arabic"

## API Endpoints

### POST /api/contact

Contact form submission.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question",
  "message": "Your message here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received successfully"
}
```

### POST /api/donations/one-time

Process a one-time donation.

**Request:**
```json
{
  "amount": 50,
  "currency": "EUR",
  "projectSlug": "ecole-khamlia",
  "dedication": "In memory of..."
}
```

**Response:**
```json
{
  "success": true,
  "paymentIntentId": "pi_mock_xxx",
  "reference": "DON-ABC123-XYZ"
}
```

### POST /api/donations/recurring

Create a recurring monthly donation.

**Request:**
```json
{
  "amount": 25,
  "currency": "EUR",
  "projectSlug": null,
  "dedication": null
}
```

**Response:**
```json
{
  "success": true,
  "subscriptionId": "sub_mock_xxx",
  "reference": "DON-DEF456-UVW"
}
```

## Development

### Type Checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

### Building for Production

```bash
pnpm build
```

## Environment Variables

Create a `.env` file for production:

```env
# Required for real payment processing
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# Optional
NUXT_PUBLIC_SITE_URL=https://khamlia-association.org
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - See LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions or issues, please contact: contact@khamlia-association.org
