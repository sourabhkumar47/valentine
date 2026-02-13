import { useEffect, useRef, useState } from 'react';
import { Heart, Calendar, MessageCircle, Star, Infinity, Sparkles } from 'lucide-react';

interface StoryMoment {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const moments: StoryMoment[] = [
  {
    id: 1,
    title: 'The Day We Met',
    date: 'June 15, 2022',
    description:
      'In a crowded café, your smile found me like a lighthouse in the fog. I knew in that instant, my life would never be the same. The way the sunlight hit your face, the sound of your laughter—it all felt like coming home.',
    image: '/story-1.jpg',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'Our First Conversation',
    date: 'June 22, 2022',
    description:
      'Hours passed like minutes. We talked about everything and nothing, and I hung on every word like it was poetry. You spoke with such passion, such depth—I found myself wanting to know every story, every dream, every fear.',
    image: '/story-2.jpg',
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    id: 3,
    title: 'The First "I Love You"',
    date: 'August 3, 2022',
    description:
      'Under a sky full of stars, those three words changed everything. I meant them with every fiber of my being, and I mean them even more today. The world seemed to pause, and in that moment, it was just us and forever.',
    image: '/story-3.jpg',
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: 4,
    title: 'Countless Memories',
    date: 'Every Day Since',
    description:
      'Every laugh, every tear, every quiet moment together—they\'ve woven themselves into the tapestry of us. Each day with you is a new adventure, a new reason to be grateful, a new page in our beautiful story.',
    image: '/story-4.jpg',
    icon: <Infinity className="w-5 h-5" />,
  },
];

const OurStory = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

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

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
              observer.disconnect();
            }
          },
          { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Scroll progress for timeline
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = Math.max(0, -rect.top + window.innerHeight / 2);
      const progress = Math.min(1, Math.max(0, scrolled / sectionHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="our-story"
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
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-primary/25 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-lavender/35 rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }} />
        
        {/* Floating elements */}
        <Heart className="absolute top-32 right-20 w-10 h-10 text-pink-primary/30 fill-pink-light/30 animate-float-slow" />
        <Sparkles className="absolute bottom-40 left-16 w-8 h-8 text-lavender-dark/40 animate-sparkle" />
        <Heart className="absolute top-1/2 right-10 w-6 h-6 text-pink-deep/30 fill-pink-primary/30 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${
              isTitleVisible ? 'opacity-100 translate-y-0 animate-bounce-in' : 'opacity-0 translate-y-6'
            }`}
          >
            <Calendar className="w-4 h-4 text-pink-deep" />
            <span className="text-sm text-gray-600 font-medium">Our Journey</span>
          </div>

          <h2
            className={`text-5xl sm:text-6xl md:text-7xl font-script bg-gradient-to-r from-pink-hot via-pink-deep to-mauve bg-clip-text text-transparent mb-4 transition-all duration-700 ${
              isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Our Story
          </h2>

          <p
            className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${
              isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Every love story is beautiful, but ours is my favorite
          </p>

          <div
            className={`flex items-center justify-center gap-3 mt-6 transition-all duration-700 ${
              isTitleVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-primary" />
            <Heart className="w-4 h-4 text-pink-primary fill-pink-light animate-pulse-heart" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-primary" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Timeline Line - Desktop with progress */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-pink-light/50" />
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-pink-primary via-pink-hot to-mauve transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 sm:space-y-24">
            {moments.map((moment, index) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={moment.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-14 h-14 rounded-full bg-white shadow-romantic-lg flex items-center justify-center transition-all duration-700 ${
                        isVisible ? 'scale-100 opacity-100 animate-bounce-in' : 'scale-0 opacity-0'
                      }`}
                      style={{ transitionDelay: '200ms' }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-primary to-pink-hot flex items-center justify-center text-white animate-pulse-glow">
                        {moment.icon}
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div
                    className={`w-full md:w-5/12 transition-all duration-1000 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : `opacity-0 ${isEven ? '-translate-x-12' : 'translate-x-12'}`
                    }`}
                  >
                    <div className="relative group">
                      <div className="absolute -inset-3 bg-gradient-to-r from-pink-primary via-pink-hot to-mauve rounded-3xl opacity-40 group-hover:opacity-70 blur-lg transition-all duration-500 animate-pulse-glow" />
                      <div className="relative overflow-hidden rounded-2xl shadow-romantic-lg group-hover:shadow-romantic-xl transition-all duration-500">
                        <img
                          src={moment.image}
                          alt={moment.title}
                          className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        
                        {/* Hover overlay with heart */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <Heart className="w-16 h-16 text-white fill-pink-primary/50 animate-pulse-heart" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 transition-all duration-1000 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : `opacity-0 ${isEven ? 'translate-x-12' : '-translate-x-12'}`
                    }`}
                    style={{ transitionDelay: '200ms' }}
                  >
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-romantic hover:shadow-romantic-lg transition-all duration-500 hover:-translate-y-2 group">
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-primary to-lavender rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
                      
                      <div className="relative">
                        {/* Date Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-light to-lavender rounded-full mb-4 shadow-sm">
                          <Calendar className="w-4 h-4 text-pink-deep" />
                          <span className="text-sm font-semibold text-pink-deep">
                            {moment.date}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent mb-4">
                          {moment.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                          {moment.description}
                        </p>

                        {/* Decorative Heart */}
                        <div className="flex justify-end mt-4">
                          <Heart className="w-6 h-6 text-pink-primary fill-pink-light animate-pulse-heart" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
