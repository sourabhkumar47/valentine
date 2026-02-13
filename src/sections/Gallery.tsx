import { useEffect, useRef, useState } from 'react';
import { Heart, X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
}

const images: GalleryImage[] = [
  {
    id: 1,
    src: '/story-1.jpg',
    caption: 'Our first adventure together - where it all began',
  },
  {
    id: 2,
    src: '/gallery-1.jpg',
    caption: 'Walking hand in hand, dreaming of our future',
  },
  {
    id: 3,
    src: '/gallery-2.jpg',
    caption: 'That perfect moment when time stood still',
  },
  {
    id: 4,
    src: '/story-2.jpg',
    caption: 'Laughing until we cried, loving until we flew',
  },
  {
    id: 5,
    src: '/gallery-3.jpg',
    caption: 'Dancing like nobody is watching',
  },
  {
    id: 6,
    src: '/gallery-4.jpg',
    caption: 'Picnic days and sunny rays',
  },
  {
    id: 7,
    src: '/gallery-5.jpg',
    caption: 'Sunset dreams and whispered schemes',
  },
  {
    id: 8,
    src: '/gallery-6.jpg',
    caption: 'Baking memories and sweet discoveries',
  },
  {
    id: 9,
    src: '/story-3.jpg',
    caption: 'Under the stars, where love is ours',
  },
];

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      titleObserver.observe(sectionRef.current);
    }

    return () => titleObserver.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleImages((prev) => new Set([...prev, index]));
              observer.disconnect();
            }
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const newIndex =
      direction === 'prev'
        ? (currentIndex - 1 + images.length) % images.length
        : (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: 'linear-gradient(-45deg, #fff5f7, #ffe4ec, #f5e6fa, #e8d5f2)',
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-light/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-light/30 to-transparent" />
        <div className="absolute top-20 right-20 w-48 h-48 bg-lavender/30 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-pink-primary/25 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${
              isTitleVisible ? 'opacity-100 translate-y-0 animate-bounce-in' : 'opacity-0 translate-y-6'
            }`}
          >
            <Camera className="w-4 h-4 text-pink-deep" />
            <span className="text-sm text-gray-600 font-medium">Captured Moments</span>
          </div>

          <h2
            className={`text-5xl sm:text-6xl md:text-7xl font-script bg-gradient-to-r from-pink-hot via-pink-deep to-mauve bg-clip-text text-transparent mb-4 transition-all duration-700 ${
              isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Our Memories
          </h2>

          <p
            className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${
              isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Moments frozen in time, forever in my heart
          </p>

          <div
            className={`flex items-center justify-center gap-3 mt-6 transition-all duration-700 ${
              isTitleVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-primary" />
            <Heart className="w-4 h-4 text-pink-primary fill-pink-light animate-pulse-heart" />
            <Sparkles className="w-4 h-4 text-lavender-dark animate-sparkle" />
            <Heart className="w-4 h-4 text-pink-primary fill-pink-light animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-primary" />
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {images.map((image, index) => {
            const isVisible = visibleImages.has(index);
            const isLarge = index === 0 || index === 4 || index === 8;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={image.id}
                ref={(el) => { imageRefs.current[index] = el; }}
                className={`break-inside-avoid transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  onClick={() => openModal(image)}
                  className={`group relative overflow-hidden rounded-2xl shadow-romantic hover:shadow-romantic-lg cursor-pointer transition-all duration-500 ${
                    isLarge ? 'aspect-[3/4]' : 'aspect-square'
                  } ${isHovered ? 'scale-[1.02] -translate-y-2' : ''}`}
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute -inset-2 bg-gradient-to-r from-pink-primary to-lavender rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 ${isHovered ? 'animate-pulse-glow' : ''}`} />
                  
                  <img
                    src={image.src}
                    alt={image.caption}
                    className="relative w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-deep/70 via-pink-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm sm:text-base font-medium leading-relaxed drop-shadow-lg">
                      {image.caption}
                    </p>
                  </div>

                  {/* Heart Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <Heart className="w-6 h-6 text-white fill-pink-primary/70 animate-pulse-heart" />
                  </div>

                  {/* Sparkle decoration */}
                  <Sparkles className="absolute top-4 left-4 w-5 h-5 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-sparkle" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in-up"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300 z-10 group"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-primary to-lavender rounded-2xl opacity-40 blur-xl" />
              
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="relative max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
            <p className="text-white text-center mt-6 text-lg font-medium drop-shadow-lg">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
