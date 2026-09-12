# Robert Weeden's website

Static HTML and CSS in `public/`, served by Caddy on Railway. Edit the HTML directly; no package install or build step is needed.

Preview with `python3 -m http.server 8765 --directory public`, then open http://localhost:8765.

To check the production server locally:

```sh
docker build -t robertjw-site .
docker run --rm -p 8080:8080 robertjw-site
```

The Railway `website` service builds the root `Dockerfile` automatically when `main` is pushed. It checks `/` before completing deployment. For a manual deployment, use `railway up --service website` from the linked project. Caddy handles static files, real 404s, and permanent redirects from old resume and index URLs. DNS is managed in the existing Vercel DNS account; web hosting is on Railway.

Project workflows live in [.agents/skills](.agents/skills). Use [search-report](.agents/skills/search-report/SKILL.md) for daily analytics and [writing-pipeline](.agents/skills/writing-pipeline/SKILL.md) for topic research, interviews, and blog drafts.
