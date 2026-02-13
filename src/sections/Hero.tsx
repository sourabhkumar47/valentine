import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Heart, Sparkles, Star } from 'lucide-react';

// 3D Floating Heart Component
const FloatingHeart3D = ({ 
  size, 
  color, 
  delay, 
  duration, 
  initialX, 
  initialY,
  depth = 0 
}: { 
  size: number; 
  color: string; 
  delay: number; 
  duration: number;
  initialX: string;
  initialY: string;
  depth?: number;
}) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: initialX,
        top: initialY,
        transform: `translateZ(${depth}px)`,
        animation: `float-3d ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Heart 
        className="drop-shadow-lg"
        style={{ 
          width: size, 
          height: size, 
          color: color,
          fill: color,
          opacity: 0.8,
          filter: `drop-shadow(0 0 ${size/3}px ${color})`,
        }} 
      />
    </div>
  );
};

// 3D Orbiting Element
const OrbitingElement = ({ 
  children, 
  radius, 
  duration, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  radius: number; 
  duration: number;
  delay?: number;
}) => {
  return (
    <div 
      className="absolute left-1/2 top-1/2"
      style={{
        animation: `orbit ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        marginLeft: -radius,
        marginTop: -radius,
      }}
    >
      <div 
        className="absolute"
        style={{
          transform: `translateX(${radius}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Morphing Blob Background
const MorphingBlob = ({ 
  color, 
  size, 
  position,
  delay = 0 
}: { 
  color: string; 
  size: number; 
  position: { top?: string; left?: string; right?: string; bottom?: string };
  delay?: number;
}) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        ...position,
        width: size,
        height: size,
        background: color,
        animation: `morph 8s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        filter: 'blur(60px)',
        opacity: 0.6,
      }}
    />
  );
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 3D parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToStory = () => {
    const storySection = document.getElementById('our-story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: 'linear-gradient(-45deg, #fff5f7, #ffe4ec, #f5e6fa, #ffd6e8, #e8d5f2)',
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      {/* Morphing Blob Backgrounds */}
      <MorphingBlob 
        color="linear-gradient(135deg, #ff9ecd, #ff7eb8)" 
        size={500} 
        position={{ top: '-10%', left: '-10%' }}
        delay={0}
      />
      <MorphingBlob 
        color="linear-gradient(135deg, #e8d5f2, #d4b8e8)" 
        size={400} 
        position={{ bottom: '-5%', right: '-5%' }}
        delay={2}
      />
      <MorphingBlob 
        color="linear-gradient(135deg, #ffb3ba, #ffcce0)" 
        size={350} 
        position={{ top: '40%', right: '20%' }}
        delay={4}
      />
      <MorphingBlob 
        color="linear-gradient(135deg, #e0b0ff, #c9c3e6)" 
        size={300} 
        position={{ bottom: '30%', left: '15%' }}
        delay={1}
      />

      {/* 3D Floating Hearts Layer */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none preserve-3d"
        style={{
          transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Large hearts with depth */}
        <FloatingHeart3D size={80} color="#ff9ecd" delay={0} duration={8} initialX="8%" initialY="15%" depth={100} />
        <FloatingHeart3D size={60} color="#ff7eb8" delay={1} duration={10} initialX="85%" initialY="20%" depth={-50} />
        <FloatingHeart3D size={100} color="#e85a9a" delay={2} duration={12} initialX="75%" initialY="60%" depth={150} />
        <FloatingHeart3D size={50} color="#e8d5f2" delay={0.5} duration={9} initialX="5%" initialY="70%" depth={-100} />
        <FloatingHeart3D size={70} color="#ff4d9e" delay={1.5} duration={11} initialX="90%" initialY="80%" depth={80} />
        <FloatingHeart3D size={45} color="#d4b8e8" delay={2.5} duration={7} initialX="15%" initialY="45%" depth={-80} />
        <FloatingHeart3D size={55} color="#ffb3ba" delay={3} duration={13} initialX="60%" initialY="10%" depth={120} />
        <FloatingHeart3D size={65} color="#e0b0ff" delay={0.8} duration={10} initialX="40%" initialY="85%" depth={-60} />

        {/* Orbiting hearts around center */}
        <div className="absolute left-1/2 top-1/2 w-0 h-0">
          <OrbitingElement radius={200} duration={20} delay={0}>
            <Heart className="w-12 h-12 text-pink-hot fill-pink-light animate-pulse-heart" />
          </OrbitingElement>
          <OrbitingElement radius={250} duration={25} delay={5}>
            <Heart className="w-10 h-10 text-lavender-dark fill-lavender animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
          </OrbitingElement>
          <OrbitingElement radius={180} duration={18} delay={10}>
            <Heart className="w-14 h-14 text-coral fill-rose-light animate-pulse-heart" style={{ animationDelay: '1s' }} />
          </OrbitingElement>
        </div>
      </div>

      {/* Sparkles and Stars */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              color: i % 3 === 0 ? '#ff9ecd' : i % 3 === 1 ? '#e8d5f2' : '#ffb3ba',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.5s ease ${i * 50}ms`,
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="absolute animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 15 + 8}px`,
              height: `${Math.random() * 15 + 8}px`,
              color: '#e0b0ff',
              fill: '#e0b0ff',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
              opacity: isVisible ? 0.8 : 0,
              transition: `opacity 0.5s ease ${i * 60}ms`,
            }}
          />
        ))}
      </div>

      {/* Main Content with 3D Effect */}
      <div 
        ref={contentRef}
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto preserve-3d"
        style={{
          transform: `translateZ(100px) rotateX(${mousePosition.y * -0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Opening Line with Glow */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="inline-block px-8 py-3 bg-white/70 backdrop-blur-md rounded-full text-sm sm:text-base text-pink-deep font-medium tracking-wide shadow-romantic animate-pulse-glow">
            <Sparkles className="w-4 h-4 inline mr-2" />
            For the one who makes my ordinary days extraordinary
            <Sparkles className="w-4 h-4 inline ml-2" />
          </span>
        </div>

        {/* Main Heading with 3D Text Effect */}
        <h1 className="mb-10 preserve-3d">
          <span
            className={`block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-script transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              transitionDelay: '600ms',
              textShadow: '0 0 40px rgba(255, 158, 205, 0.5), 0 0 80px rgba(255, 158, 205, 0.3)',
            }}
          >
            <span className="bg-gradient-to-r from-pink-hot via-pink-deep to-mauve bg-clip-text text-transparent">
              My Dearest
            </span>
          </span>
          <span
            className={`block text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-script mt-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
            style={{ 
              transitionDelay: '800ms',
              textShadow: '0 0 60px rgba(232, 90, 154, 0.6), 0 0 120px rgba(232, 90, 154, 0.4), 0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <span className="bg-gradient-to-r from-pink-deep via-pink-hot to-lavender-dark bg-clip-text text-transparent animate-gradient-shift">
              Love
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-gray-700 font-light mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          Happy Valentine's Day to the person who fills my heart with joy,
          my days with laughter, and my life with endless love.
        </p>

        {/* CTA Button with 3D Effect */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <button
            onClick={scrollToStory}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-pink-hot via-pink-deep to-pink-dark text-white font-medium text-lg rounded-full shadow-romantic-xl hover:shadow-glow-lg transition-all duration-500 hover:scale-110 hover:-translate-y-2 overflow-hidden animate-pulse-glow"
          >
            <span className="relative z-10">Begin Our Journey</span>
            <Heart className="w-6 h-6 relative z-10 group-hover:animate-pulse-heart transition-transform group-hover:scale-125" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-dark via-pink-hot to-mauve opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </button>
        </div>

        {/* Decorative Divider */}
        <div
          className={`mt-16 flex items-center justify-center gap-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1400ms' }}
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-pink-primary to-pink-primary" />
          <Heart className="w-6 h-6 text-pink-hot fill-pink-light animate-pulse-heart" />
          <Star className="w-5 h-5 text-lavender-dark fill-lavender animate-sparkle" />
          <Heart className="w-6 h-6 text-pink-hot fill-pink-light animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
          <div className="w-20 h-px bg-gradient-to-l from-transparent via-pink-primary to-pink-primary" />
        </div>
      </div>

      {/* 3D Decorative Elements */}
      <div 
        className="absolute bottom-20 left-10 z-10 pointer-events-none"
        style={{
          transform: `translateZ(50px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-light to-lavender opacity-60 animate-morph animate-float-slow" />
      </div>
      <div 
        className="absolute top-32 right-16 z-10 pointer-events-none"
        style={{
          transform: `translateZ(80px) rotateX(${mousePosition.y * 0.15}deg) rotateY(${mousePosition.x * 0.15}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral to-rose-gold opacity-50 animate-morph animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1600ms' }}
      >
        <button
          onClick={scrollToStory}
          className="flex flex-col items-center gap-2 text-pink-deep hover:text-pink-hot transition-colors duration-300 group"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/80 transition-colors">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
