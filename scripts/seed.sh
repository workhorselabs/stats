#!/bin/bash

# Go to the root of the project
cd "$(dirname "$0")/.."

# Load .env variables
set -o allexport
source .env
set +o allexport

# Run seed SQL using $DATABASE_URL
psql "$DATABASE_URL" <<EOF
-- Insert a test user
INSERT INTO "User" (id, email, password, "createdAt")
VALUES (
  'u_test_1',
  'w@h.com',
  '\$2b\$10\$7yJZg/9YJZuB6KQbl3t8xut12IlA6hUQ5swXuQ/kTlxaJ0X2dV2OO',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

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