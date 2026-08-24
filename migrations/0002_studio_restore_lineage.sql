ALTER TABLE studio_state
  ADD COLUMN draft_restored_from_version_id INTEGER
  CHECK (draft_restored_from_version_id IS NULL OR draft_restored_from_version_id > 0);

ALTER TABLE studio_versions
  ADD COLUMN restored_from_version_id INTEGER
  CHECK (restored_from_version_id IS NULL OR restored_from_version_id > 0);
