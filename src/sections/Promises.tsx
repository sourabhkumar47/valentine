import { useEffect, useRef, useState } from 'react';
import { Heart, Star, Moon, Sun, Sparkles } from 'lucide-react';

interface Promise {
  id: number;
  text: string;
  icon: React.ReactNode;
}

const promises: Promise[] = [
  {
    id: 1,
    text: 'I promise to always choose you, every single day',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 2,
    text: 'I promise to hold your hand through every storm',
    icon: <Star className="w-6 h-6" />,
  },
  {
    id: 3,
    text: 'I promise to keep falling in love with you, over and over',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 4,
    text: 'I promise to build a future as beautiful as our love',
    icon: <Sun className="w-6 h-6" />,
  },
];

const Promises = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visiblePromises, setVisiblePromises] = useState<Set<number>>(new Set());
  const [hoveredPromise, setHoveredPromise] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const promiseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    promiseRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisiblePromises((prev) => new Set([...prev, index]));
              observer.disconnect();
            }
          },
          { threshold: 0.3 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

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

      {/* Starfield Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-primary/20 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-lavender/25 rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-light/20 rounded-full blur-3xl animate-morph" style={{ animationDelay: '1.5s' }} />

        {/* Floating Stars */}
        {[...Array(25)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-pink-primary/40 animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 14 + 6}px`,
              height: `${Math.random() * 14 + 6}px`,
              color: i % 3 === 0 ? '#ff9ecd' : i % 3 === 1 ? '#e8d5f2' : '#e0b0ff',
              fill: i % 3 === 0 ? '#ff9ecd' : i % 3 === 1 ? '#e8d5f2' : '#e0b0ff',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}

        {/* Floating Hearts */}
        <Heart className="absolute top-20 left-20 w-8 h-8 text-pink-primary/30 fill-pink-light/30 animate-float-slow" />
        <Heart className="absolute bottom-32 right-24 w-6 h-6 text-lavender-dark/30 fill-lavender/30 animate-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute top-1/3 right-16 w-10 h-10 text-pink-deep/25 fill-pink-primary/25 animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0 animate-bounce-in' : 'opacity-0 translate-y-6'
            }`}
          >
            <Moon className="w-4 h-4 text-pink-deep" />
            <span className="text-sm text-gray-600 font-medium">Forever & Always</span>
          </div>

          <h2
            className={`text-5xl sm:text-6xl md:text-7xl font-script bg-gradient-to-r from-pink-hot via-pink-deep to-mauve bg-clip-text text-transparent mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            My Promises to You
          </h2>

          <p
            className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            For today, tomorrow, and all our forevers
          </p>

          <div
            className={`flex items-center justify-center gap-3 mt-6 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
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

        {/* Promises Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {promises.map((promise, index) => {
            const isVisible = visiblePromises.has(index);
            const isHovered = hoveredPromise === index;

            return (
              <div
                key={promise.id}
                ref={(el) => { promiseRefs.current[index] = el; }}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredPromise(index)}
                onMouseLeave={() => setHoveredPromise(null)}
              >
                <div className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-romantic hover:shadow-romantic-lg transition-all duration-500 ${isHovered ? '-translate-y-3' : ''}`}>
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r from-pink-primary to-lavender rounded-2xl opacity-0 group-hover:opacity-40 blur-lg transition-all duration-500 ${isHovered ? 'animate-pulse-glow' : ''}`} />

                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-pink-light to-lavender flex items-center justify-center text-pink-deep transition-all duration-300 ${isHovered ? 'scale-110 rotate-6' : 'group-hover:scale-110'}`}>
                      {promise.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">
                        {promise.text}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Heart className="w-5 h-5 text-pink-primary fill-pink-light animate-pulse-heart" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Quote */}
        <div
          className={`text-center transition-all duration-1000 ${
            visiblePromises.size >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative inline-block">
            {/* Quote Background */}
            <div className="absolute -inset-8 bg-gradient-to-r from-pink-primary/40 via-pink-hot/30 to-mauve/40 rounded-3xl blur-xl animate-pulse-glow" />

            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-10 sm:px-12 sm:py-12 shadow-romantic-lg">
              <Sparkles className="w-8 h-8 text-pink-primary mx-auto mb-4 animate-sparkle" />
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-script text-gray-800 leading-relaxed">
                "No matter where life takes us,
                <br />
                <span className="bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent">you will always be</span>
                <br />
                my favorite place."
              </blockquote>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-pink-primary" />
                <Heart className="w-4 h-4 text-pink-primary fill-pink-light animate-pulse-heart" />
                <Sparkles className="w-4 h-4 text-lavender-dark animate-sparkle" />
                <Heart className="w-4 h-4 text-pink-primary fill-pink-light animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-pink-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promises;
