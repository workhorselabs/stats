#!/bin/bash

# for cloud
# psql "postgresql://wonjae:fK28rDnWm93yXuLq0Zhv@5.161.58.25:5432/stats" <<EOF 
# for local
# using hashed password
psql "postgresql://secondbrain@localhost:5432/stats_local" <<EOF
INSERT INTO "User" (id, email, password, "createdAt")
VALUES (
  'u_test_1',
  'w@h.com',
  '$2b$10$7yJZg/9YJZuB6KQbl3t8xut12IlA6hUQ5swXuQ/kTlxaJ0X2dV2OO',
  NOW()
)
ON CONFLICT (id) DO NOTHING;
EOF