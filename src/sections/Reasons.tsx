import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, Smile, MessageCircle, Sun, Shield, Music, Sparkle, Home, HeartHandshake } from 'lucide-react';

interface Reason {
  id: number;
  text: string;
  icon: React.ReactNode;
  hiddenMessage: string;
  rotation: number;
}

const reasons: Reason[] = [
  {
    id: 1,
    text: 'Your smile that lights up...',
    icon: <Smile className="w-6 h-6" />,
    hiddenMessage: 'Your smile is the first thing I think of every morning 💕',
    rotation: -2,
  },
  {
    id: 2,
    text: 'The way you laugh ehehehheheh muahhhh',
    icon: <MessageCircle className="w-6 h-6" />,
    hiddenMessage: 'the ehehehehehe ehehhehehheh  😄',
    rotation: 1,
  },
  {
    id: 3,
    text: 'The way you pretend to be angry but can’t stay for long',
    icon: <Heart className="w-6 h-6" />,
    hiddenMessage: 'You try very hard but you melt in 2 minutes 😌',
    rotation: -1,
  },
  {
    id: 4,
    text: 'Your random late night talks',
    icon: <Heart className="w-6 h-6" />,
    hiddenMessage: 'Those talks make my day feel complete 🌙',
    rotation: 2,
  },
  {
    id: 5,
    text: 'How you remember small small things about me',
    icon: <Heart className="w-6 h-6" />,
    hiddenMessage: 'Even things I forget, you remember ✨',
    rotation: -3,
  },
  {
    id: 6,
    text: 'Your cute jealousy',
    icon: <Sparkles className="w-6 h-6" />,
    hiddenMessage: 'You never say it directly but I always know 😄',
    rotation: 1,
  },
  {
    id: 7,
    text: 'The comfort I feel when I talk to you',
    icon: <Heart className="w-6 h-6" />,
    hiddenMessage: 'You feel like home, not just a person 🤍',
    rotation: -2,
  },
  {
    id: 8,
    text: 'Being yourself with me',
    icon: <Heart className="w-6 h-6" />,
    hiddenMessage: 'No filters, no acting — just you and that’s my favorite 💫',
    rotation: 0,
  },

  {
    id: 9,
    text: 'How you say my name',
    icon: <Heart className="w-6 h-6" />,
    hiddenMessage: 'Normal name, but from you it sounds different ❤️',
    rotation: 2,
  },
];

const Reasons = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
          titleObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      titleObserver.observe(sectionRef.current);
    }

    return () => titleObserver.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]));
              observer.disconnect();
            }
          },
          { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Animated Gradient Background */}
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
        <div className="absolute top-10 right-20 w-40 h-40 bg-pink-primary/30 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-lavender/40 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-light/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '4s' }} />

        {/* Floating hearts */}
        <Heart className="absolute top-20 left-20 w-8 h-8 text-pink-primary/40 fill-pink-light/40 animate-float-slow" />
        <Heart className="absolute bottom-40 right-24 w-6 h-6 text-lavender-dark/40 fill-lavender/40 animate-float" style={{ animationDelay: '1s' }} />
        <Heart className="absolute top-1/3 right-16 w-10 h-10 text-pink-deep/30 fill-pink-primary/30 animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
          >
            <Heart className="w-4 h-4 text-pink-deep fill-pink-primary animate-pulse-heart" />
            <span className="text-sm text-gray-600 font-medium">Countless Reasons</span>
          </div>

          <h2
            className={`text-5xl sm:text-6xl md:text-7xl font-script bg-gradient-to-r from-pink-hot via-pink-deep to-mauve bg-clip-text text-transparent mb-4 transition-all duration-700 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Reasons I Love You
          </h2>

          <p
            className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            style={{ transitionDelay: '200ms' }}
          >
            For the million little things that make you, you
          </p>

          <div
            className={`flex items-center justify-center gap-3 mt-6 transition-all duration-700 ${isTitleVisible ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-primary" />
            <Sparkles className="w-4 h-4 text-pink-primary animate-sparkle" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-primary" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, index) => {
            const isVisible = visibleCards.has(index);
            const isFlipped = flippedCards.has(reason.id);

            return (
              <div
                key={reason.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`relative perspective-1000 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isVisible ? `rotate(${reason.rotation}deg)` : undefined,
                }}
              >
                <div
                  onClick={() => toggleCard(reason.id)}
                  className="relative cursor-pointer preserve-3d transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front of Card */}
                  <div
                    className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-romantic hover:shadow-romantic-lg transition-all duration-500 hover:-translate-y-2 group"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                    }}
                  >
                    {/* Decorative Corner */}
                    <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                      <Heart className="w-6 h-6 text-pink-primary fill-pink-light animate-pulse-heart" />
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-light to-lavender flex items-center justify-center text-pink-deep mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {reason.icon}
                    </div>

                    {/* Text */}
                    <p className="text-gray-700 text-lg leading-relaxed font-medium">
                      {reason.text}
                    </p>

                    {/* Hint */}
                    <div className="mt-4 flex items-center gap-2 text-sm text-pink-deep/70">
                      <Sparkles className="w-4 h-4" />
                      <span>Click to reveal</span>
                    </div>
                  </div>

                  {/* Back of Card - FIXED: Dark background with visible text */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-pink-deep via-pink-hot to-mauve rounded-2xl p-6 sm:p-8 shadow-romantic-lg flex flex-col items-center justify-center text-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 20% 20%, white 1px, transparent 1px),
                                          radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }} />
                    </div>

                    <Heart className="w-12 h-12 text-white fill-white/40 mb-4 animate-pulse-heart relative z-10" />
                    <p className="text-white text-lg leading-relaxed font-semibold relative z-10 drop-shadow-md">
                      {reason.hiddenMessage}
                    </p>

                    {/* Close hint */}
                    <div className="mt-4 text-white/70 text-sm relative z-10">
                      Click to flip back
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${visibleCards.size >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-gray-500 italic text-lg">
            ...and a million more that words cannot express
          </p>
          <Heart className="w-6 h-6 text-pink-primary fill-pink-light mx-auto mt-4 animate-pulse-heart" />
        </div>
      </div>
    </section>
  );
};

export default Reasons;
