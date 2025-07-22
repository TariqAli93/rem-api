#!/bin/bash

cd ./ || exit

echo "🌀 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🔁 Restarting app..."
pm2 restart alnakheelApi
