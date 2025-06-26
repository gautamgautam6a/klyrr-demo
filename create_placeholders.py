#!/usr/bin/env python3
"""
Script to create placeholder images for the Revnew website demo
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(filename, width, height, text, bg_color=(230, 230, 230), text_color=(100, 100, 100)):
    """Create a placeholder image with text"""
    try:
        # Create image
        img = Image.new('RGB', (width, height), bg_color)
        draw = ImageDraw.Draw(img)
        
        # Try to use a decent font, fall back to default if not available
        try:
            font = ImageFont.truetype("arial.ttf", 24)
        except:
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
            except:
                font = ImageFont.load_default()
        
        # Calculate text position to center it
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (width - text_width) // 2
        y = (height - text_height) // 2
        
        # Draw text
        draw.text((x, y), text, font=font, fill=text_color)
        
        # Save image
        img.save(f'assets/{filename}')
        print(f"✅ Created: assets/{filename}")
        
    except Exception as e:
        print(f"❌ Error creating {filename}: {e}")

def main():
    """Create all placeholder images"""
    print("🎨 Creating placeholder images...")
    
    # Ensure assets directory exists
    os.makedirs('assets', exist_ok=True)
    
    # Create placeholder images
    placeholders = [
        ('placeholder-logo.png', 120, 40, 'REVNEW', (79, 70, 229), (255, 255, 255)),
        ('placeholder-it.jpg', 400, 250, 'IT Solutions', (52, 152, 219), (255, 255, 255)),
        ('placeholder-energy.jpg', 400, 250, 'Energy Sector', (46, 204, 113), (255, 255, 255)),
        ('placeholder-saas.jpg', 400, 250, 'SaaS Platform', (155, 89, 182), (255, 255, 255)),
        ('placeholder-finance.jpg', 400, 250, 'Finance Industry', (241, 196, 15), (255, 255, 255)),
        ('placeholder-blog-2.jpg', 400, 200, 'Blog Post Image', (231, 76, 60), (255, 255, 255)),
    ]
    
    for filename, width, height, text, bg_color, text_color in placeholders:
        create_placeholder(filename, width, height, text, bg_color, text_color)
    
    print("🎉 All placeholder images created successfully!")

if __name__ == "__main__":
    main() 