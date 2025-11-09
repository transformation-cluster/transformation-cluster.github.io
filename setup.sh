#!/bin/bash

# Setup script for Transformations Cluster Jekyll Website
# This script helps you set up the development environment

echo "🚀 Setting up Transformations Cluster Website..."
echo ""

# Check if Ruby is installed
if ! command -v ruby &> /dev/null; then
    echo "❌ Ruby is not installed. Please install Ruby first:"
    echo "   Visit: https://www.ruby-lang.org/en/documentation/installation/"
    exit 1
fi

echo "✅ Ruby version: $(ruby -v)"

# Check if Bundler is installed
if ! command -v bundle &> /dev/null; then
    echo "📦 Installing Bundler..."
    gem install bundler
fi

echo "✅ Bundler version: $(bundle -v)"

# Install dependencies
echo ""
echo "📦 Installing Jekyll and dependencies..."
bundle install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Start the development server:"
    echo "      bundle exec jekyll serve"
    echo ""
    echo "   2. Open your browser and visit:"
    echo "      http://localhost:4000"
    echo ""
    echo "   3. Read the documentation:"
    echo "      - CONTENT_GUIDE.md for adding content"
    echo "      - PLOTLY_GUIDE.md for adding visualizations"
    echo ""
    echo "   4. To enable live-reload during development:"
    echo "      bundle exec jekyll serve --livereload"
    echo ""
    echo "Happy coding! 🎉"
else
    echo ""
    echo "❌ Setup failed. Please check the error messages above."
    exit 1
fi
