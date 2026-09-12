# Discoverability operations

The public site is static HTML/CSS served by Caddy on Railway. Vince runs as a separate service with persistent storage. There is no frontend build or application runtime.

- Website: https://www.robertjw.dev/
- Railway project: `37ec586d-0547-4af4-8c2d-b5787baa0c69`
- Website service: `5d0fbe5a-540d-4247-b4d4-e9d942aaf1d7`
- Deployments: GitHub `weedenrj/robertjw.dev`, branch `main`, automatic deploys enabled, Dockerfile builder, health check `/`.
- Vince service: `a479d07f-f963-4ce9-a7db-856e52cb7297`, volume mounted at `/data`, image `ghcr.io/vinceanalytics/vince:v1.11.8`, start command `/vince serve`.
- Private analytics dashboard: https://vince-production-14fb.up.railway.app/; site ID `robertjw.dev` (Vince normalizes away `www`).
- Google Search Console property: `https://www.robertjw.dev/`. Keep the verification tag in the homepage.
- Bing Webmaster Tools uses the same site URL and its own homepage verification tag.

Run `python3 .agents/skills/search-report/scripts/collect.py` to collect site checks and the previous 1, 7, and 28 complete UTC days of traffic. It requires Python 3.9+ and uses the standard library. API credentials belong in `~/.config/robertjw-discoverability/vince.json` (mode 600), with `url`, `site_id`, and `api_key` fields. Never put credentials or private reports in this repository.

Reports and private strategy notes live under `~/Documents/agent-artifacts/robertjw-discoverability/`. Data collection began September 11, 2026; earlier periods lack coverage. Launch-day visits and contact clicks include setup tests. Contact clicks measure intent, not received emails or successful hires. Vince v1.11.8 ignored event-name filters during verification, so contact totals are explicitly unavailable in reports until a provider fix passes a nonexistent-event control check. Scripted browser checks are normally excluded by the tracker.

Google and Bing ownership are verified. Google reports the sitemap successfully read with two pages; Bing accepted it and is processing it. DNS remains in the existing Vercel account; both apex and `www` route to Railway. The old Vercel deployment remains for rollback, with its Git connection removed. No Vercel build configuration is needed.

The Orca automation `58d8b4ab-9e7a-4084-b480-b4917138e8d4` runs at 08:00 America/Chicago. It collects Vince metrics, checks the signed-in Google and Bing dashboards when available, compares reports, and proposes one useful improvement. It needs this computer and Orca online. Search reporting can lag; missing access and processing delays must be reported as unavailable, never zero. There is no universal agent or recruiter discoverability score.

Google/Bing accounts use Rob's personal email. Do not substitute Vally analytics or Gmail. No job-board accounts, paid SEO subscriptions, automatic outreach, or tracking of named visitors is needed.
