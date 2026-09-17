---
name: search-report
description: Produce Rob Weeden's daily website traffic, search ranking, and AI citation report with evidence-backed improvements and the existing contract opportunity watch.
---

# Search report

Run for https://www.robertjw.dev/. Read [configured sources](references/sources.md) first.
Private output root: `~/Documents/agent-artifacts/robertjw-discoverability/`.
Read its `strategy/brief.md` for current positioning and facts, and the most recent completed report.
Read `strategy/hiring-discovery.md` when doing hiring research. Private strategy is context, not public copy.

The objective is active discoverability management, not a dashboard recital. Use the evidence to identify meaningful changes, diagnose problems, and tell Rob exactly what deserves action. Routine metrics and collection details belong in the private report.

## Collect and interpret

1. Check for an active collection of the same period in automation run history before starting. Do not alter another run's output. Retried runs use separate timestamped directories.
2. Run `python3 .agents/skills/search-report/scripts/collect.py` from the repository root. Stdout names the report. Append dashboard observations and interpretation to that report; preserve `observations.json`.
3. Use configured access only. Read Google Search Console at https://search.google.com/search-console/ for property `https://www.robertjw.dev/`, and https://www.bing.com/webmasters/ for the same site. Use Rob's existing personal-account browser session. There are no configured Google/Bing API OAuth credentials. Load the available browser skill before browser control where required. Never substitute Vally analytics.
4. Record source URL, capture time, property, report filters, provider timezone, data-through date, and whether data is complete. Signed-out or inaccessible dashboards are unavailable; finish the other sources without an unattended sign-in loop.
5. Traffic uses complete UTC days because the configured Vince API uses UTC midnights. Search uses each provider's latest complete dates. Compare equal, non-overlapping 7-day periods and 28-day periods where historical coverage exists. The collector returns current windows only; use matching prior observations or dashboard exports for the comparison, otherwise report comparison unavailable.
6. Report clicks, impressions, CTR, and average position where available, plus query/page winners and declines. Lower average position is better; it is an aggregate, not a fixed rank. Separate branded queries from unbranded discovery. Show underlying counts and avoid strong conclusions from small samples or changing query mix.
7. Include Bing AI citations if the site's dashboard exposes them. AI referrals are visits, citations are mentions, and search rankings are separate measurements. Record zero, unavailable, failed, partial, and complete distinctly. Do not infer search volume from impressions or manufacture a universal SEO/AEO score.
8. Prioritize up to three improvements with the affected URL/query, evidence, expected benefit, effort, and a way to check the result. Suggest only what the evidence supports; repeated data should not create a new recommendation every day.

## Existing watch and periodic research

Preserve the daily bounded web-contract watch in private `strategy/opportunity-watch.md`. Follow its qualification and deduplication rules, update its private opportunity log, and report at most three new worthwhile original requests. Do not apply, contact people, create profiles, or buy credits.

On Mondays review the existing query groups and a small available AI-search sample. Record exact prompts, date, provider, search mode, completed sample size, and cited URLs. Separate branded lookup/direct URL reading from unbranded discovery; samples are not population visibility or search volume.
On the first Monday of the month also review a bounded, cited sample of employer career pages and recruiting-provider updates against the private hiring strategy. Keep this secondary to the search report.

## Handoff

Save dated dashboard observations alongside the report. Mark it completed only after recording each source's outcome. Keep retries distinguishable and avoid duplicate notifications.
Return a short, plain-language briefing, normally under 100 words:

- If Rob needs to act, lead with `You need to:` followed by the specific action, why it matters, and the exact dashboard, settings, or source link needed to do it. Do not bury the ask under metrics.
- Otherwise lead with `No action needed today.` Include only meaningful changes, verified contact intent, a genuinely useful opportunity, or one evidence-backed next move.
- Omit routine source-by-source status, process narration, and unchanged metrics from the thread. Keep that detail in the private report.
- End with the private report link. Report even when nothing changed.

Proactive means investigating changes and turning them into a concrete action or a clear no-action result. It does not authorize sign-ins, outreach, purchases, publishing, commits, deployments, or public site changes.
Writing automation reads these reports as topic evidence; this skill does not edit the writing backlog.
Do not commit analytics, expose credentials, identify anonymous visitors, publish changes, or purchase services.
A missing source needs a precise access note, not repeated setup requests or fabricated metrics.
