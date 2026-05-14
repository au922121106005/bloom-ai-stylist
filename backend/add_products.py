import os
import django

# ======================================================
# Django Setup
# ======================================================

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bloom_project.settings')
django.setup()

from apps.products.models import Product

# ======================================================
# Bouquet Product Data
# ======================================================

products_data = [
    # Romantic Collection
    ("Rose Whisper Bouquet", 1499, "Romantic Collection"),
    ("Crimson Love Arrangement", 1799, "Romantic Collection"),
    ("Eternal Rose Harmony", 1999, "Romantic Collection"),
    ("Blush Romance Bouquet", 1599, "Romantic Collection"),

    # Elegant Collection
    ("White Lily Grace", 1699, "Elegant Collection"),
    ("Ivory Serenity Bouquet", 1799, "Elegant Collection"),
    ("Pure Elegance Bloom", 1899, "Elegant Collection"),
    ("Soft Pearl Arrangement", 1599, "Elegant Collection"),

    # Fresh Collection
    ("Sunlight Meadow Bouquet", 1399, "Fresh Collection"),
    ("Golden Bloom Harmony", 1499, "Fresh Collection"),
    ("Spring Garden Delight", 1599, "Fresh Collection"),
    ("Morning Dew Florals", 1499, "Fresh Collection"),

    # Luxury Collection
    ("Velvet Noir Bouquet", 2499, "Luxury Collection"),
    ("Royal Orchid Essence", 2999, "Luxury Collection"),
    ("Midnight Bloom Luxe", 2799, "Luxury Collection"),
    ("Golden Prestige Arrangement", 3299, "Luxury Collection"),

    # Natural Collection
    ("Wildflower Meadow Mix", 1499, "Natural Collection"),
    ("Rustic Bloom Basket", 1699, "Natural Collection"),
    ("Forest Whisper Bouquet", 1799, "Natural Collection"),
    ("Earthy Garden Collection", 1899, "Natural Collection"),
]

# ======================================================
# Add Products
# ======================================================

for name, price, category in products_data:

    product, created = Product.objects.get_or_create(
        name=name,
        defaults={
            "price": price,
            "category": category,
            "description": f"A beautiful handcrafted floral arrangement from our {category.lower()}."
        }
    )

    if created:
        print(f"✓ Added: {name} - ₹{price}")
    else:
        print(f"• Already Exists: {name}")

# ======================================================
# Final Summary
# ======================================================

print("\n====================================")
print(f"🌸 Total Products: {Product.objects.count()}")
print("✅ Bouquet products successfully loaded!")
print("====================================")