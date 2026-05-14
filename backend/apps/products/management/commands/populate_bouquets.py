from django.core.management.base import BaseCommand
from apps.products.models import Product


class Command(BaseCommand):
    help = 'Populate database with Bloom bouquet products'

    def handle(self, *args, **options):

        products_data = [

            # 🌹 AMOUR
            {
                'name': 'Rose Whisper Bouquet',
                'description': 'Soft romantic rose arrangement with delicate elegance',
                'price': 199,
                'image': 'src/assets/images/roseWhisperBouquet.jpg'
            },
            {
                'name': 'Crimson Love Arrangement',
                'description': 'Deep red luxury bouquet symbolizing passion and warmth',
                'price': 249,
                'image': 'src/assets/images/crimsonLoveArrangement.jpg'
            },
            {
                'name': 'Eternal Rose Harmony',
                'description': 'Classic rose composition designed for timeless beauty',
                'price': 224,
                'image': 'src/assets/images/eternalRoseHarmony.jpg'
            },
            {
                'name': 'Blush Romance Bouquet',
                'description': 'Soft pink floral arrangement for gentle romantic moments',
                'price': 224,
                'image': 'src/assets/images/blushRomanceBouquet.jpg'
            },

            # 🌷 ELEGANT
            {
                'name': 'White Lily Grace',
                'description': 'Pure white lilies representing peace and elegance',
                'price': 224,
                'image': 'src/assets/images/whiteLilyGrace.jpg'
            },
            {
                'name': 'Ivory Serenity Bouquet',
                'description': 'Minimal ivory floral design with calming aesthetic',
                'price': 249,
                'image': 'src/assets/images/ivorySerenityBouquet.jpg'
            },
            {
                'name': 'Pure Elegance bloom',
                'description': 'Clean and refined floral composition for luxury gifting',
                'price': 224,
                'image': 'src/assets/images/pureElegancebloom.jpg'
            },
            {
                'name': 'Soft Pearl Arrangement',
                'description': 'Elegant soft-toned bouquet with premium styling',
                'price': 274,
                'image': 'src/assets/images/softPearlArrangement.jpg'
            },

            # 🌼 FRESH
            {
                'name': 'Sunlight Meadow Bouquet',
                'description': 'Bright floral mix inspired by warm morning sunlight',
                'price': 224,
                'image': 'src/assets/images/sunlightMeadowBouquet.jpg'
            },
            {
                'name': 'Golden Bloom Harmony',
                'description': 'Golden-toned floral arrangement with vibrant energy',
                'price': 224,
                'image': 'src/assets/images/goldenbloomHarmony.jpg'
            },
            {
                'name': 'Spring Garden Delight',
                'description': 'Fresh seasonal flowers inspired by spring gardens',
                'price': 224,
                'image': 'src/assets/images/springGardenDelight.jpg'
            },
            {
                'name': 'Morning Dew Florals',
                'description': 'Soft fresh bouquet inspired by early morning dew',
                'price': 224,
                'image': 'src/assets/images/morningDewFlorals.jpg'
            },

            # 💜 LUXURY
            {
                'name': 'Velvet Noir Bouquet',
                'description': 'Dark luxury floral arrangement with dramatic elegance',
                'price': 249,
                'image': 'src/assets/images/velvetNoirBouquet.jpg'
            },
            {
                'name': 'Royal Orchid Essence',
                'description': 'Premium orchid-inspired elegant floral design',
                'price': 224,
                'image': 'src/assets/images/royalOrchidEssence.jpg'
            },
            {
                'name': 'Midnight Bloom Luxe',
                'description': 'Deep-toned luxury bouquet with artistic styling',
                'price': 224,
                'image': 'src/assets/images/midnightbloomLuxe.jpg'
            },
            {
                'name': 'Golden Prestige Arrangement',
                'description': 'High-end floral masterpiece for premium occasions',
                'price': 274,
                'image': 'src/assets/images/goldenPrestigeArrangement.jpg'
            },

            # 🌿 NATURAL
            {
                'name': 'Wildflower Meadow Mix',
                'description': 'A natural blend of seasonal wildflowers with soft rustic charm',
                'price': 249,
                'image': 'src/assets/images/wildflowerMeadowMix.jpg'
            },
            {
                'name': 'Rustic Bloom Basket',
                'description': 'Handcrafted rustic floral basket with earthy tones and textures',
                'price': 299,
                'image': 'src/assets/images/rusticbloomBasket.jpg'
            },
            {
                'name': 'Forest Whisper Bouquet',
                'description': 'Deep forest-inspired arrangement with calm natural elegance',
                'price': 279,
                'image': 'src/assets/images/forestWhisperBouquet.jpg'
            },
            {
                'name': 'Earthy Garden Collection',
                'description': 'Grounded floral arrangement inspired by natural garden beauty',
                'price': 329,
                'image': 'src/assets/images/earthyGardenCollection.jpg'
            }

        ]

        for product_data in products_data:

            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    'description': product_data['description'],
                    'price': product_data['price'],
                    'image': product_data['image'],
                }
            )

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Successfully created {product.name}'
                    )
                )
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f'{product.name} already exists'
                    )
                )