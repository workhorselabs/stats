#!/bin/bash

# for cloud
# psql "postgresql://wonjae:fK28rDnWm93yXuLq0Zhv@5.161.58.25:5432/stats" <<EOF 
# for local
# using hashed password
psql "postgresql://secondbrain@localhost:5432/stats_local" <<EOF
-- Insert a test user
INSERT INTO "User" (id, email, password, "createdAt")
VALUES (
  'u_test_1',
  'w@h.com',
  '$2b$10$7yJZg/9YJZuB6KQbl3t8xut12IlA6hUQ5swXuQ/kTlxaJ0X2dV2OO',
  NOW()
)
ON CONFLICT (id) DO NOTHING;
EOF
-- Insert a dummy blog post
INSERT INTO "Post" (id, title, slug, content, published, "authorId", "createdAt", "updatedAt")
VALUES (
  'p_test_1',
  'Sample Blog Post',
  'sample-blog-post',
  'Lorem ipsum dolor sit amet, consectetur adipis.',
  true,
  'u_test_1',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;
EOF

