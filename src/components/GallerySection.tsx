export default function GallerySection({ data }: { data: any[] }) {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 md:mb-16 text-center">
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold leading-tight text-primary">
            Dokumentasi
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Beberapa momen di balik layar dan dokumentasi kegiatan saya selama perkuliahan maupun pengembangan proyek.
          </p>
        </div>

        {/* Masonry Grid — using CSS columns */}
        {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {data.map((item, index) => (
            <div 
              key={item.id} 
              className="relative group break-inside-avoid overflow-hidden rounded-none shadow-sm cursor-zoom-in bg-muted"
            >
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Caption Overlay (visible on hover for desktop, always visible subtly on mobile) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-medium text-sm md:text-base transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
