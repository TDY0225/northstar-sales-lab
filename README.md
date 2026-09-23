# Northstar Sales Lab

Northstar Sales Lab is a fictional, portfolio-quality B2B webinar lead-generation site. It demonstrates a premium editorial marketing experience, accessible conversion forms, safe server-side validation, and a provider-neutral path toward a future production integration.

## Routes

- `/` — webinar landing page
- `/follow-up-frameworks` — lead-magnet page
- `/thank-you` — conversion confirmation shell
- `/privacy` — supporting privacy notice
- `/robots.txt` — crawl policy
- `/sitemap.xml` — public route map

## Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when you need to override the local defaults. `NEXT_PUBLIC_SITE_URL` is required for a real deployment so canonical, sitemap, robots, and social URLs use the production origin. Keep `LEAD_PROVIDER=demo` for the portfolio deployment. `HUBSPOT_PRIVATE_APP_TOKEN` is server-only and is only needed for a separately approved HubSpot integration. `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` are optional and must be configured together when anti-spam verification is enabled. `HUBSPOT_PORTAL_ID` is reserved and is not currently read by the provider boundary.

In demo mode, form submissions are validated and accepted through `DemoLeadProvider`; no personal data is stored, no email is sent, no PDF is delivered, and no CRM record is created. The thank-you pages disclose this behavior. A real HubSpot or email activation would require separate privacy, consent, retention, unsubscribe, credential, and deployment review.

## Validation

```bash
npm run lint
npm run build
npm start
git diff --check
```

The app uses Next.js App Router, React, TypeScript, Zod, Manrope, and Newsreader. The public pages are designed for keyboard use, visible focus, responsive layouts, native FAQ disclosure, and reduced-motion preferences. Deployment targets a standard Node.js/Vercel Next.js build; do not add real provider credentials or deploy from this demo repository without the release review.
