#!/usr/bin/env python3
"""Collect public site checks and Vince metrics. Uses only Python's standard library."""
import datetime as dt
import json
import pathlib
import urllib.error
import urllib.parse
import urllib.request

SITE = 'https://www.robertjw.dev'
CONFIG = pathlib.Path.home() / '.config/robertjw-discoverability/vince.json'
COLLECTION_START = dt.date(2026, 9, 11)
now = dt.datetime.now(dt.timezone.utc)
today = now.date()
out = pathlib.Path.home() / 'Documents/agent-artifacts/robertjw-discoverability' / now.strftime('%Y-%m-%dT%H%M%SZ')
out.mkdir(parents=True, exist_ok=False)
observations = {'collected_at': now.isoformat(), 'timezone': 'UTC', 'public': {}, 'traffic': {}}

# Failures remain explicit; a failed provider must never appear as zero traffic.
for path in ['/', '/resume/', '/robots.txt', '/sitemap.xml', '/assets/Robert-Weeden-Resume.pdf']:
    try:
        with urllib.request.urlopen(SITE + path, timeout=20) as response:
            body = response.read()
            item = {'status': response.status, 'url': response.url, 'bytes': len(body)}
            if path == '/':
                item['canonical_present'] = b'rel="canonical" href="https://www.robertjw.dev/"' in body
                item['tracker_present'] = b'vince-production-14fb.up.railway.app/js/' in body
            observations['public'][path] = item
    except (urllib.error.URLError, TimeoutError) as error:
        observations['public'][path] = {'error': str(error)}

if CONFIG.exists():
    config = json.loads(CONFIG.read_text())
    for days in [1, 7, 28]:
        start = today - dt.timedelta(days=days)
        params = {'site_id': config['site_id'], 'period': 'custom', 'from': str(start), 'to': str(today), 'metrics': 'visitors,pageviews'}
        # Vince v1.11.8 interprets custom endpoints as UTC midnights.
        queries = {'totals': ('aggregate', {}), 'sources': ('breakdown', {'property': 'visit:source'}),
                   'pages': ('breakdown', {'property': 'event:page'})}
        period = {'from': str(start), 'to': str(today), 'timezone': 'UTC', 'results': {}}
        period['coverage'] = 'unavailable' if today <= COLLECTION_START else 'partial' if start <= COLLECTION_START else 'complete'
        period['collection_started'] = str(COLLECTION_START)
        # v1.11.8 ignores event:name filters; do not label all events as contacts.
        period['results']['contact_clicks'] = {'status': 'unavailable', 'reason': 'Vince v1.11.8 event filtering failed verification'}
        for label, (endpoint, extra) in queries.items():
            url = config['url'] + '/api/v1/stats/' + endpoint + '?' + urllib.parse.urlencode(params | extra)
            request = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + config['api_key']})
            try:
                with urllib.request.urlopen(request, timeout=20) as response:
                    period['results'][label] = json.load(response)
            except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
                period['results'][label] = {'error': str(error)}
        observations['traffic'][str(days)] = period
else:
    observations['traffic'] = {'status': 'unavailable', 'reason': 'Vince configuration is missing'}

(out / 'observations.json').write_text(json.dumps(observations, indent=2) + '\n')
lines = ['# Daily discoverability report', '', f'Collected {now.isoformat()}. Traffic periods use UTC; the current day is excluded.', '',
         'Collection began September 11, 2026. Earlier dates have no historical coverage. Setup checks on launch day are not organic traffic.', '', '## Site']
for path, result in observations['public'].items():
    lines.append(f'- {path}: {result.get("status", result.get("error"))}')
lines += ['', '## Traffic']
for period, value in observations['traffic'].items():
    if not isinstance(value, dict) or 'results' not in value:
        continue
    totals = 'Unavailable: requested dates precede collection.' if value['coverage'] == 'unavailable' else json.dumps(value['results']['totals'])
    lines += [f'- Previous {period} complete UTC day(s), coverage {value["coverage"]}: {totals}',
              f'  Contact intent: {json.dumps(value["results"]["contact_clicks"])}']
lines += ['', 'A contact click means someone opened an email link; it is not a confirmed inquiry or hire.', '',
          '## Search and agent discovery', '', 'Google Search Console and Bing Webmaster Tools are separate sources. The scheduled agent checks their signed-in dashboards and appends data freshness and query observations here. No search rank or AI visibility score is inferred from website traffic.', '',
          'Raw source and page breakdowns: observations.json.']
(out / 'report.md').write_text('\n'.join(lines) + '\n')
print(out / 'report.md')
