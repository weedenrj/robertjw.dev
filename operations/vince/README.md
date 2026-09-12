# Vince event-filter fix

Vince v1.11.8 translates `event:name` and custom `event:goal` filters to `name`,
but its storage field is `event`. The filter compiler treats `name` as unknown
and drops the filter, returning totals for unrelated events.

This image builds upstream commit `fc06f7a22f785e6e152cb72e3210fcc099b07fa5`
with `event-filter.patch`. It changes the event field translation and includes
query and storage regression tests. Visit-page goal translation stays intact.
The Docker build runs those tests before building the binary. The runtime base
is the original v1.11.8 image pinned by digest. No storage format changes.

Source: https://github.com/vinceanalytics/vince/tree/fc06f7a22f785e6e152cb72e3210fcc099b07fa5

Deploy only to the existing Vince service from the repository root:

```sh
railway up operations/vince --path-as-root \
  --project 37ec586d-0547-4af4-8c2d-b5787baa0c69 \
  --environment production \
  --service a479d07f-f963-4ce9-a7db-856e52cb7297
```

Keep its `/data` volume and existing environment settings. The public website
uses the root Dockerfile; this directory is a separate analytics-service build.
To roll back, redeploy the preceding successful v1.11.8 image deployment in
Railway. The collector's nonexistent-event control keeps contact counts
unavailable if a rollback restores broken filtering.

The API requires JSON filters, URL encoded in `filters`:

```json
[["is", "event:name", ["Contact"]]]
```

Run collector tests with:

```sh
python3 -m unittest discover -s .agents/skills/search-report/scripts -p 'test_*.py'
```

After deployment, compare `Contact`, an unrelated recorded event and
`DefinitelyNotARecordedEvent` over the same covered dates. The nonexistent event
must return zero. Confirm unfiltered historical pageviews and visitors are
unchanged. Keep any test events and resulting analytics in private artifacts.
