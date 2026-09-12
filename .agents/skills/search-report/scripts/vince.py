"""Vince stats queries, including an event-filter control before reporting contacts."""
import json
import urllib.parse
import urllib.request


CONTACT_FILTER = json.dumps([['is', 'event:name', ['Contact']]])
CONTROL_FILTER = json.dumps([['is', 'event:name', ['DefinitelyNotARecordedEvent']]])


def query(config, endpoint, params):
    url = config['url'] + '/api/v1/stats/' + endpoint + '?' + urllib.parse.urlencode(params)
    request = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + config['api_key']})
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.load(response)


def contact_counts(config, params):
    params = params | {'metrics': 'events,visitors'}
    control = query(config, 'aggregate', params | {'filters': CONTROL_FILTER})
    if control != {'events': 0, 'visitors': 0}:
        return {'status': 'unavailable', 'reason': 'Event filter control did not return zero', 'control': control}
    counts = query(config, 'aggregate', params | {'filters': CONTACT_FILTER})
    if not isinstance(counts, dict) or any(
        type(counts.get(key)) not in (int, float) or counts[key] < 0
        for key in ('events', 'visitors')
    ):
        return {'status': 'unavailable', 'reason': 'Invalid contact metric response', 'response': counts}
    return {'status': 'available', **counts, 'filter_control': control}
