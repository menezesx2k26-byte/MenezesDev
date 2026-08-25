CREATE TABLE IF NOT EXISTS studio_state (
  site_id TEXT PRIMARY KEY,
  draft_json TEXT NOT NULL CHECK (json_valid(draft_json)),
  draft_revision INTEGER NOT NULL DEFAULT 0 CHECK (draft_revision >= 0),
  published_version_number INTEGER CHECK (
    published_version_number IS NULL OR published_version_number > 0
  ),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS studio_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_id TEXT NOT NULL,
  version_number INTEGER NOT NULL UNIQUE CHECK (version_number > 0),
  source_revision INTEGER NOT NULL CHECK (source_revision >= 0),
  snapshot_json TEXT NOT NULL CHECK (json_valid(snapshot_json)),
  published_by TEXT,
  published_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL,
  r2_key TEXT NOT NULL UNIQUE,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
  width INTEGER CHECK (width IS NULL OR width > 0),
  height INTEGER CHECK (height IS NULL OR height > 0),
  alt_text TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS audit_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  actor_subject TEXT,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details_json TEXT CHECK (details_json IS NULL OR json_valid(details_json)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_studio_versions_site_version
  ON studio_versions (site_id, version_number DESC);

CREATE INDEX IF NOT EXISTS idx_media_assets_status
  ON media_assets (site_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_events_created_at
  ON audit_events (site_id, created_at DESC);
