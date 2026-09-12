# Project workflows

Apply `like-rob` for Rob's preferences. This personal website is not a Vally repository.

Keep reusable agent workflows in `.agents/skills/`, not a `docs/` folder.
Every automation for this project must explicitly link to an existing supporting `SKILL.md` in its prompt. Keep the workflow in that skill rather than duplicating it in the schedule.

- `search-report`: daily traffic, rankings, AI citations, and suggested improvements.
- `writing-pipeline`: discover topics from real work, interview Rob, and advance private drafts.
- `rob-writing`: Rob's voice, evidence, and editorial checks.

The public website is static HTML in `public/`. Files there are deployable content; keep interview notes, history excerpts, analytics, and unapproved drafts in the private artifact directory named by the skills.

## Hosting and deployment

Edit the static HTML and CSS directly; no package install or frontend build is needed.
The Railway `website` service builds the root `Dockerfile` on pushes to `main` and checks `/` before completing deployment. Manual deployment uses `railway up --service website` from the linked project.
Caddy serves static files, returns real 404s, and redirects old resume and index URLs. DNS is managed in the existing Vercel account; hosting is on Railway.
To check the production server locally, run `docker build -t robertjw-site .`, then `docker run --rm -p 8080:8080 robertjw-site`.

## ImprovMX email forwarding

`hello@robertjw.dev` forwards to Rob's personal inbox through ImprovMX's free plan. The account and destination are private; public HTML, structured data, `llms.txt`, and the PDF resume use the alias. DNS remains at Vercel, with MX priorities 10 and 20 pointing to `mx1.improvmx.com` and `mx2.improvmx.com`, and the root TXT record `v=spf1 include:spf.improvmx.com ~all`. There is no catch-all alias.

An external test on September 11, 2026 was accepted by ImprovMX and delivered to Gmail, confirmed by its SMTP success response. This does not establish inbox versus spam placement. Forwarding does not configure outgoing mail: replying from the personal Gmail address exposes it to the recipient. Sending as the domain has not been configured. Old repository history and downloaded copies can still contain the previous contact address.
