#!/bin/bash


echo "📥 Pulling latest code from Git..."
git pull origin main


echo "📦 Installing dependencies..."
npm install

echo "🛡️  Checking migrations for destructive operations..."
if grep -riE 'DROP TABLE|DROP COLUMN|ALTER TABLE .* DROP COLUMN' prisma/migrations/*.sql; then
  echo "⚠️  WARNING: Destructive SQL found in migrations!"
  echo "❌ Deployment aborted. Review migration SQL before proceeding."
  exit 1
else
  echo "✅ No destructive operations found in migrations. Continuing deployment."
fi


echo "🔨 Building Remix app..."
npm run build


echo "🚀 Restarting app with PM2..."
pm2 start ecosystem.config.cjs --update-env


echo "🧬 Applying Prisma migrations..."
npx prisma migrate deploy


echo "✅ Deploy complete!"