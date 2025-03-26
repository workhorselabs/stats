#!/bin/bash

echo "📥 Pulling latest code from Git..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Remix app..."
npm run build

echo "🚀 Restarting app with PM2..."
pm2 start ecosystem.config.cjs --update-env

echo "✅ Deploy complete!"