# Project workflows

Apply `like-rob` for Rob's preferences. This personal website is not a Vally repository.

Keep reusable agent workflows in `.agents/skills/`, not a `docs/` folder.
Every automation for this project must explicitly link to an existing supporting `SKILL.md` in its prompt. Keep the workflow in that skill rather than duplicating it in the schedule.

- `search-report`: daily traffic, rankings, AI citations, and suggested improvements.
- `writing-pipeline`: discover topics from real work, interview Rob, and advance private drafts.
- `rob-writing`: Rob's voice, evidence, and editorial checks.

The public website is static HTML in `public/`. Files there are deployable content; keep interview notes, history excerpts, analytics, and unapproved drafts in the private artifact directory named by the skills.
