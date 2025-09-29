#!/bin/bash

# Photo Gallery WebP Converter
# Creates optimized images for web galleries covering all devices

# Configuration
INPUT_DIR="/media/deciob/T7/photos/darktable-exports/new/web/originals"
OUTPUT_DIR="/media/deciob/T7/photos/darktable-exports/new/web/gallery"

# Create output directories
mkdir -p "$OUTPUT_DIR/thumbnails-small"
mkdir -p "$OUTPUT_DIR/thumbnails-large"
mkdir -p "$OUTPUT_DIR/large"
mkdir -p "$OUTPUT_DIR/original"

# Process each image
for img in "$INPUT_DIR"/*.{jpg,jpeg,JPG,JPEG}; do
    # Skip if no matches found
    [ -e "$img" ] || continue
    
    # Get filename without path and extension
    filename=$(basename "$img")
    basename="${filename%.*}"
    
    echo "Processing: $filename"
    
    # 1. THUMBNAIL SMALL (300px) - for mobile phones
    # Tiny file size for slow connections
    convert "$img" \
        -resize 300x300\> \
        -quality 75 \
        -define webp:method=6 \
        "$OUTPUT_DIR/thumbnails-small/${basename}.webp"
    
    # 2. THUMBNAIL LARGE (600px) - for tablets and desktop retina
    # 2x resolution for crisp gallery grids on retina displays
    convert "$img" \
        -resize 600x600\> \
        -quality 80 \
        -define webp:method=6 \
        "$OUTPUT_DIR/thumbnails-large/${basename}.webp"
    
    # 3. LARGE (1920px wide) - for detail view on most displays
    # Covers 1080p and most retina displays at reasonable zoom
    convert "$img" \
        -resize 1920x1920\> \
        -quality 85 \
        -define webp:method=6 \
        "$OUTPUT_DIR/large/${basename}.webp"
    
    # 4. ORIGINAL (3840px max) - for high-res retina/4K displays
    # Higher quality for pixel peepers and zooming
    convert "$img" \
        -resize 3840x3840\> \
        -quality 90 \
        -define webp:method=6 \
        "$OUTPUT_DIR/original/${basename}.webp"
    
    echo "  ✓ Created all versions (small thumb, large thumb, large, original)"
done

echo ""
echo "Conversion complete!"
echo "Check $OUTPUT_DIR for results"

# Optional: Display file sizes
echo ""
echo "=== File Size Summary ==="
du -sh "$OUTPUT_DIR/thumbnails-small" | awk '{print "Thumbnails (small): " $1}'
du -sh "$OUTPUT_DIR/thumbnails-large" | awk '{print "Thumbnails (large): " $1}'
du -sh "$OUTPUT_DIR/large" | awk '{print "Large: " $1}'
du -sh "$OUTPUT_DIR/original" | awk '{print "Original: " $1}'
