import { useEffect, useRef, useState } from 'react';
import { Heart, Feather, Quote, Sparkles } from 'lucide-react';

const LoveLetter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [typedParagraphs, setTypedParagraphs] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setShowLetter(true), 500);
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

  // Typewriter effect for paragraphs
  useEffect(() => {
    if (showLetter) {
      letterParagraphs.forEach((_, index) => {
        setTimeout(() => {
          setTypedParagraphs((prev) => new Set([...prev, index]));
        }, 500 + index * 400);
      });
    }
  }, [showLetter]);

  const letterParagraphs = [
    "As I sit down to write this, I'm overwhelmed by how much you mean to me. Words feel insufficient to capture the depth of what I feel, but I'll try anyway—because you deserve to know.",
    "You came into my life like a sunrise—slowly at first, then all at once, filling everything with light and warmth. Before you, I didn't know that love could feel this safe, this sure, this much like home.",
    "I love the way you see the world—with wonder and kindness and hope. I love how you make me want to be better, not by asking, but simply by being the incredible person you are. I love your strength, your softness, your beautiful heart.",
    "Every day with you is a gift I don't take for granted. The way your hand fits in mine, the sound of your laughter, the comfort of your presence—these are the things that make my life complete.",
    "I promise to keep choosing you, every single day. Through the easy moments and the hard ones, through laughter and tears, through all the seasons of life.",
    "You are my best friend, my greatest adventure, and my favorite person. I love you more than yesterday, and I'll love you even more tomorrow.",
  ];

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
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-primary/25 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }} />
        
        {/* Floating Hearts */}
        <Heart className="absolute top-32 right-20 w-8 h-8 text-pink-primary/30 fill-pink-light/30 animate-float-slow" />
        <Heart className="absolute bottom-40 left-16 w-6 h-6 text-lavender-dark/30 fill-lavender/30 animate-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute top-1/2 right-10 w-10 h-10 text-pink-deep/20 fill-pink-primary/20 animate-float-slow" style={{ animationDelay: '2s' }} />
        <Sparkles className="absolute bottom-60 right-32 w-6 h-6 text-mauve/50 animate-sparkle" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0 animate-bounce-in' : 'opacity-0 translate-y-6'
            }`}
          >
            <Feather className="w-4 h-4 text-pink-deep" />
            <span className="text-sm text-gray-600 font-medium">From My Heart</span>
          </div>

          <h2
            className={`text-5xl sm:text-6xl md:text-7xl font-script bg-gradient-to-r from-pink-hot via-pink-deep to-mauve bg-clip-text text-transparent mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            My Love Letter to You
          </h2>

          <div
            className={`flex items-center justify-center gap-3 mt-6 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-primary" />
            <Heart className="w-4 h-4 text-pink-primary fill-pink-light animate-pulse-heart" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-primary" />
          </div>
        </div>

        {/* Letter Container */}
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Shadow Layer */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-primary/30 via-pink-hot/30 to-mauve/30 rounded-3xl blur-xl animate-pulse-glow" />
          
          {/* Main Letter Card */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-romantic-xl overflow-hidden">
            {/* Decorative Header */}
            <div className="relative h-28 sm:h-36 bg-gradient-to-r from-pink-hot via-pink-deep to-mauve flex items-center justify-center overflow-hidden">
              {/* Animated pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 animate-rotate-slow" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, white 2px, transparent 2px)`,
                  backgroundSize: '30px 30px',
                }} />
              </div>
              
              <div className="relative flex items-center gap-4">
                <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-white fill-white/40 animate-pulse-heart" />
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white/60 animate-sparkle" />
                <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-white fill-white/40 animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            {/* Letter Content */}
            <div className="relative p-8 sm:p-12 lg:p-16">
              {/* Quote Mark */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8 opacity-10">
                <Quote className="w-16 h-16 sm:w-24 sm:h-24 text-pink-primary" />
              </div>

              {/* Salutation */}
              <div
                className={`mb-8 transition-all duration-700 ${
                  showLetter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <p className="text-2xl sm:text-3xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent">
                  My Dearest Love,
                </p>
              </div>

              {/* Letter Body with typewriter effect */}
              <div className="space-y-6">
                {letterParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-gray-700 leading-relaxed text-base sm:text-lg transition-all duration-500 ${
                      typedParagraphs.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Closing */}
              <div
                className={`mt-10 text-right transition-all duration-700 ${
                  typedParagraphs.has(letterParagraphs.length - 1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <p className="text-xl sm:text-2xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent mb-2">
                  Forever Yours,
                </p>
                <p className="text-gray-600 italic">
                  Your Loving Partner
                </p>
              </div>

              {/* Decorative Footer */}
              <div
                className={`flex items-center justify-center gap-4 mt-12 pt-8 border-t border-pink-light/50 transition-all duration-700 ${
                  typedParagraphs.has(letterParagraphs.length - 1) ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-pink-primary" />
                <Heart className="w-5 h-5 text-pink-primary fill-pink-light animate-pulse-heart" />
                <Sparkles className="w-4 h-4 text-lavender-dark animate-sparkle" />
                <Heart className="w-5 h-5 text-pink-primary fill-pink-light animate-pulse-heart" style={{ animationDelay: '0.5s' }} />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-pink-primary" />
              </div>
            </div>

            {/* Paper Texture Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
