export default function Footer() {
  return (
    <footer className="bg-[#faf7f5] border-t border-gray-200 px-6 md:px-16 py-12 mt-20">

      <div className="grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-lg font-light mb-2">🌸 bloom Bouquet</h2>
          <p className="text-gray-600 text-sm">
            Crafting emotions through flowers. Every bouquet tells a story.
          </p>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-medium text-black">Explore</p>
          <p>Home</p>
          <p>Bouquets</p>
          <p>Custom Orders</p>
          <p>AI Stylist</p>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-medium text-black">Contact</p>
          <p>support@bloom.com</p>
          <p>+91 8883855177</p>
          <p>Chennai, India</p>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © 2026 bloom Bouquet Shop. All rights reserved.
      </div>

    </footer>
  )
}