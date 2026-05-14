import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bloom_project.settings')
django.setup()

from apps.products.models import Product

print("All Products in Database:")
print("-" * 50)
for p in Product.objects.all().order_by('id'):
    print(f"{p.id}. {p.name} - ₹{p.price}")
print("-" * 50)
print(f"Total: {Product.objects.count()} products")
