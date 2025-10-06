#!/bin/bash

cd ../public/

rm gallery/dist-images/images.zip
zip -r ./gallery/dist-images/images.zip ./gallery/images
cd gallery/dist-images



# Check if version argument was provided
if [ -z "$1" ]; then
  echo "Error: Version argument required"
  echo "Usage: ./deploy.sh <version>"
  exit 1
fi

VERSION=$1

echo "Creating release v$VERSION..."

gh release create "v$VERSION" \
  --title "Portfolio v$VERSION" \
  --notes "Testing" \
  images.zip

