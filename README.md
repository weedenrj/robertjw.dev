# Robert Weeden's website

Static HTML and CSS in `public/`, served by Caddy on Railway. Edit the HTML directly; no package install or build step is needed.

Preview with `python3 -m http.server 8765 --directory public`, then open http://localhost:8765.

To check the production server locally:

```sh
docker build -t robertjw-site .
docker run --rm -p 8080:8080 robertjw-site
```

The Railway `website` service uses the root `Dockerfile`. Deploy with `railway up --service website` from the linked project. Caddy handles static files, real 404s, and permanent redirects from old resume and index URLs. DNS is managed in the existing Vercel DNS account; web hosting is on Railway.

See [discoverability operations](docs/discoverability.md) for analytics and the daily report.
