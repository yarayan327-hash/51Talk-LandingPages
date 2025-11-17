#!/bin/bash

# Supabase Deployment Script for 51Talk Landing Pages
# Usage: ./deploy-supabase.sh

echo "🚀 Starting Supabase Deployment for 51Talk Landing Pages"

# Configuration
PROJECT_REF="kksiyulhjfakzoxspfdz"
SUPABASE_URL="https://kksiyulhjfakzoxspfdz.supabase.co"
BUCKET_NAME="landing-pages"
LOCAL_DIR="public"

echo "📋 Configuration:"
echo "  - Project URL: $SUPABASE_URL"
echo "  - Bucket: $BUCKET_NAME"
echo "  - Local Directory: $LOCAL_DIR"

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "   brew install supabase/tap/supabase"
    exit 1
fi

echo ""
echo "📦 Step 1: Creating Supabase storage bucket..."
supabase storage create-bucket "$BUCKET_NAME" --public

echo ""
echo "📤 Step 2: Uploading files to storage..."
# Upload HTML files
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/SpeakUp.html" --path "SpeakUp.html"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/GradeUp.html" --path "GradeUp.html"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/ScoreBoost.html" --path "ScoreBoost.html"

# Upload assets folder
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/final-assets/js/i18n-final-enhanced.js" --path "final-assets/js/i18n-final-enhanced.js"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/final-assets/locales/en.json" --path "final-assets/locales/en.json"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/final-assets/locales/zh.json" --path "final-assets/locales/zh.json"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/final-assets/locales/ar.json" --path "final-assets/locales/ar.json"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/final-assets/content-mapping-SpeakUp.json" --path "final-assets/content-mapping-SpeakUp.json"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/final-assets/content-mapping-GradeUp.json" --path "final-assets/content-mapping-GradeUp.json"
supabase storage upload --bucket "$BUCKET_NAME" --file "$LOCAL_DIR/final-assets/content-mapping-ScoreBoost.json" --path "final-assets/content-mapping-ScoreBoost.json"

echo ""
echo "⚡ Step 3: Deploying Edge Function..."
supabase functions deploy www --no-verify-jwt

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Your landing pages are now available at:"
echo "  📍 SpeakUp:   $SUPABASE_URL/functions/v1/www/SpeakUp.html"
echo "  📍 GradeUp:   $SUPABASE_URL/functions/v1/www/GradeUp.html"
echo "  📍 ScoreBoost:$SUPABASE_URL/functions/v1/www/ScoreBoost.html"
echo ""
echo "🧪 To test the deployment, run:"
echo "  curl -I $SUPABASE_URL/functions/v1/www/SpeakUp.html"