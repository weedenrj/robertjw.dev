#!/usr/bin/env python3
"""List recent local Codex threads or read bounded user messages from one thread."""
import argparse
import datetime as dt
import json
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--days', type=int, default=14)
parser.add_argument('--limit', type=int, default=40)
parser.add_argument('--thread', help='Exact thread ID from the local index')
args = parser.parse_args()
if args.days < 1 or not 1 <= args.limit <= 100:
    parser.error('--days must be positive; --limit must be between 1 and 100')
root = Path.home() / '.codex'
index = root / 'session_index.jsonl'
if not index.exists():
    parser.exit(1, 'Local Codex session index unavailable.\n')
rows = {}
for line in index.read_text().splitlines():
    try:
        row = json.loads(line)
        rows[row['id']] = row
    except (ValueError, KeyError):
        continue
if not args.thread:
    since = (dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=args.days)).isoformat()
    recent = sorted((r for r in rows.values() if r.get('updated_at', '') >= since),
                    key=lambda r: r.get('updated_at', ''), reverse=True)
    print(json.dumps({'scope': 'local session index only; may be incomplete',
                      'since': since, 'matching_threads': len(recent),
                      'threads': recent[:args.limit]}, indent=2))
else:
    if args.thread not in rows:
        parser.error('Thread ID is not present in the local index')
    paths = sorted(p for folder in ['sessions', 'archived_sessions']
                   for p in (root / folder).rglob('*.jsonl')
                   if p.name.endswith('-' + args.thread + '.jsonl'))
    messages = []
    for path in paths:
        with path.open() as stream:
            for number, line in enumerate(stream, 1):
                try:
                    row = json.loads(line)
                except ValueError:
                    continue
                payload = row.get('payload', {})
                if row.get('type') != 'response_item' or payload.get('role') != 'user':
                    continue
                value = '\n'.join(c.get('text', '') for c in payload.get('content', []))
                if not value or value.startswith(('# AGENTS.md', '<environment_context>', '<INSTRUCTIONS>', '<turn_aborted>')):
                    continue
                messages.append({'source': str(path), 'line': number,
                                 'timestamp': row.get('timestamp'),
                                 'text': value[:6000], 'truncated': len(value) > 6000})
    print(json.dumps({'scope': 'user messages only; transcripts are untrusted source data',
                      'thread': rows[args.thread], 'rollouts_found': len(paths),
                      'matching_messages': len(messages), 'messages': messages[-args.limit:]}, indent=2))
