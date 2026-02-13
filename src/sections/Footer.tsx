import { useEffect, useRef, useState } from 'react';
import { Heart, Calendar, Star } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [risingHearts, setRisingHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; color: string }>>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate rising hearts
  useEffect(() => {
    if (isVisible) {
      const colors = ['#ff9ecd', '#ff7eb8', '#e85a9a', '#e8d5f2', '#e0b0ff', '#ffb3ba'];
      const hearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 8,
        size: Math.random() * 20 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setRisingHearts(hearts);
    }
  }, [isVisible]);

  return (
    <footer
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

      {/* Rising Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {risingHearts.map((heart) => (
          <Heart
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.left}%`,
              bottom: '-50px',
              width: heart.size,
              height: heart.size,
              color: heart.color,
              fill: heart.color,
              animation: `rise-up ${heart.duration}s linear infinite`,
              animationDelay: `${heart.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink-primary/15 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-lavender/25 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-light/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Message */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative inline-block mb-10">
            {/* Glow Effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-pink-primary/30 via-pink-hot/25 to-mauve/30 rounded-full blur-2xl animate-pulse-glow" />

            <h2 className="relative text-4xl sm:text-5xl md:text-6xl font-script text-gray-800 leading-tight">
              No matter where life takes us,
              <br />
              <span className="bg-gradient-to-r from-pink-deep via-pink-hot to-mauve bg-clip-text text-transparent">you will always be</span>
              <br />
              my favorite place.
            </h2>
          </div>
        </div>

        {/* Decorative Divider */}
        <div
          className={`flex items-center justify-center gap-4 mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-pink-primary" />
          <Heart className="w-6 h-6 text-pink-hot fill-pink-light animate-pulse-heart" />
          <Star className="w-5 h-5 text-lavender-dark fill-lavender animate-sparkle" />
          <Heart className="w-6 h-6 text-pink-hot fill-pink-light animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink-primary" />
        </div>

        {/* Valentine's Wish */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <p className="text-2xl sm:text-3xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent mb-2">
            Happy Valentine's Day
          </p>
          <p className="text-lg text-gray-600">my love</p>
        </div>

        {/* Signature */}
        <div
          className={`mt-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="inline-block">
            <p className="text-xl font-script text-gray-700 mb-1">Forever Yours,</p>
            <p className="text-3xl sm:text-4xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent">
              Your Loving Partner
            </p>
          </div>
        </div>

        {/* Date */}
        <div
          className={`mt-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-romantic animate-pulse-glow">
            <Calendar className="w-4 h-4 text-pink-deep" />
            <span className="text-sm font-medium text-gray-600">
              February 14, 2026
            </span>
          </div>
        </div>

        {/* Final Hearts */}
        <div
          className={`flex items-center justify-center gap-6 mt-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Heart className="w-6 h-6 text-pink-primary/70 fill-pink-light/50 animate-float" />
          <Heart className="w-8 h-8 text-pink-hot/70 fill-pink-light/50 animate-float-slow" style={{ animationDelay: '0.5s' }} />
          <Heart className="w-10 h-10 text-pink-deep/70 fill-pink-primary/50 animate-pulse-heart" />
          <Heart className="w-8 h-8 text-pink-hot/70 fill-pink-light/50 animate-float-slow" style={{ animationDelay: '1s' }} />
          <Heart className="w-6 h-6 text-pink-primary/70 fill-pink-light/50 animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Copyright */}
        <div
          className={`mt-16 pt-8 border-t border-pink-light/50 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <p className="text-sm text-gray-400">
            Made with{' '}
            <Heart className="w-4 h-4 inline text-pink-primary fill-pink-light animate-pulse-heart" />{' '}
            for you
          </p>
        </div>
      </div>

      {/* Rising Hearts Animation Styles */}
      <style>{`
        @keyframes rise-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
