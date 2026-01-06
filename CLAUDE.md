You are Claude Code acting as a senior Nuxt engineer + UI designer. Build a complete Nuxt 4 website for a Moroccan non-profit association called “Khamlia Association”, located in Khamlia (south of Morocco, near the Sahara desert). The goal is to ship a clean, airy, content-driven website with multilingual support and a donation system (one-time + recurring, project-specific + general).

Hard requirements
- Nuxt 4 (latest stable)
- TypeScript everywhere
- Tailwind CSS (latest stable) with good defaults and clean typography
- Nuxt Content for pages + project content (Markdown)
- Nuxt I18n with these locales:
  - French (default)
  - Spanish
  - Arabic (RTL support required)
  - Italian
  - German
- Simple, spacious design (not “marketing heavy”), easy to read, accessible.
- Must generate fake content (projects, texts, images) for now.
- Provide multiple design themes and a theme selector to switch instantly.
- Provide clear setup and run instructions.

Constraints / principles
- Keep the codebase clean and idiomatic Nuxt 4.
- Use composables, components, and layouts properly.
- No external paid services required to run locally.
- Donations must work in “demo mode” (mock provider) and be easily replaceable later by a real provider (Stripe, PayPal, etc.).
- Arabic must display properly with RTL layout, direction switching, and font fallbacks.
- All pages must be i18n-ready. Content can be per-locale when it makes sense, but at minimum the UI must be translated.

Deliverables
1) A fully working Nuxt 4 repository with:
   - Nuxt Content content structure
   - i18n configuration
   - Tailwind setup
   - Theme system + selector
   - Pages and routes listed below
   - Demo donation flow (one-time + recurring)
   - Contact page with form + server endpoint (demo email handler / store to local log)
2) Documentation:
   - README with commands, architecture explanation, content editing, adding translations, and how to swap the donation provider
3) Seed content:
   - At least 6 fake projects with realistic descriptions + goals + images
   - Fake team members
   - Homepage sections describing the association + Khamlia location context
   - Contact info placeholders

Required pages / routes
- Home: /
  - Hero section with “Khamlia Association” + short mission statement
  - Sections: About, Featured Projects, How to help, Impact, CTA donate
- Team: /team
  - List team members (fake data), photos, roles, short bios
- Projects: /projects
  - Filterable list (by category / status), each card shows title, excerpt, location, tags
- Project details: /projects/[slug]
  - Full project content + gallery + goal/progress + donation CTA
- Donate: /donate
  - General donation (choose amount, currency displayed, one-time vs recurring)
  - Option to donate to a specific project via query param ?project=slug
- Contact: /contact
  - Form: name, email, subject, message
  - Server endpoint: /api/contact (demo: write to server console + store in a local file under .data or similar)

Content model (Nuxt Content)
- content/
  - pages/
    - home.<locale>.md (or one home.md with i18n frontmatter — choose the cleanest approach)
    - team.<locale>.md
    - donate.<locale>.md
    - contact.<locale>.md
  - projects/
    - <slug>/
      - index.<locale>.md (or locale folders)
      - images/ (fake images)
Frontmatter fields for projects:
- title
- slug
- excerpt
- category (e.g., education, women empowerment, water, culture, health)
- status (planned, active, completed)
- location (default “Khamlia, Morocco”)
- goalAmount (number)
- raisedAmount (number)
- featured (boolean)
- tags (array)
- coverImage (path)
- gallery (array of paths)
- date (ISO string)

Theme system (must-have)
- Provide at least 3 themes:
  1) Desert Sand (warm, earthy)
  2) Oasis (calm, green/blue)
  3) Night Sky (dark mode, starry feel but minimal)
- Implement theme tokens using CSS variables + Tailwind integration.
- Add a ThemeSwitcher component in the header.
- Persist theme in localStorage.
- Also provide a light/dark toggle if your theme approach supports it (optional if themes already cover it).

I18n / RTL requirements
- Use @nuxtjs/i18n (Nuxt 4 compatible).
- Provide translation keys for navigation, buttons, form labels, donation labels, validation messages.
- When locale is Arabic:
  - Set dir="rtl" on html/body
  - Ensure layout flips correctly (spacing, icons if needed)
  - Use suitable font stack with Arabic support
- Locale switcher in the header.
- Routes should be localized (prefix strategy is fine; French default can be no-prefix if you prefer).

Donation flow (demo but realistic)
- Create a donation UI that feels real:
  - amount selector (preset + custom)
  - one-time vs monthly recurring
  - optional dedication note
  - if project donation: show project name + cover + progress
- Implement a provider abstraction:
  - /server/services/donations/DonationProvider.ts (interface)
  - Mock provider implementation that returns a fake “payment intent” and “subscription id”
  - API endpoints:
    - POST /api/donations/one-time
    - POST /api/donations/recurring
- Add good validation and error handling (both server and client)
- Store demo donation “records” locally (json file) or in-memory with clear comments on replacement.

UI/UX requirements
- Simple, airy, spacious layout; strong typography; consistent spacing.
- Reusable components: Container, Button, Card, SectionTitle, LocaleSwitcher, ThemeSwitcher, ProjectCard, ProgressBar.
- Add subtle animations (optional) but keep it minimal.
- Accessibility: proper labels, focus states, semantic headings, contrast.

Implementation steps (do them, don’t just describe)
1) Scaffold Nuxt 4 app with TypeScript.
2) Install and configure Tailwind (latest).
3) Install and configure Nuxt Content.
4) Install and configure Nuxt i18n with the 5 locales + RTL.
5) Create layouts: default layout with header/nav/footer.
6) Create the pages and routes.
7) Create Content queries for projects list and project details.
8) Build the theme system + switcher.
9) Build donation UI + server endpoints + mock provider + record storage.
10) Build contact form + /api/contact endpoint.
11) Add seed content and placeholder images.
12) Add README with setup instructions, project structure, and “how to replace mock provider”.

Quality bar / acceptance checklist
- `pnpm dev` runs without errors (use pnpm by default unless you prefer npm; document it).
- All routes render.
- Locale switcher works and Arabic switches to RTL properly.
- Theme switcher works and persists.
- Projects list + detail pages work from Nuxt Content.
- Donation form can submit (mock) for one-time and recurring and shows a success state.
- Contact form submits and shows success/failure with validation.

Output format
- Create/modify files directly in the repo.
- When finished, print:
  - the final folder structure
  - key config snippets (nuxt.config, tailwind config, i18n config)
  - and a short “How to run” section.

Start now. If any Nuxt 4 module compatibility issue arises, choose the most compatible approach and clearly document the workaround in README.
