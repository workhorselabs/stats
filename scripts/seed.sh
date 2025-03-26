#!/bin/bash

psql "postgresql://wonjae:fK28rDnWm93yXuLq0Zhv@5.161.58.25:5432/stats" <<EOF
INSERT INTO "User" (id, email, password, "createdAt")
VALUES (
  'u_test_1',
  'test@example.com',
  'hashedpassword123',
  NOW()
)
ON CONFLICT (id) DO NOTHING;
EOF