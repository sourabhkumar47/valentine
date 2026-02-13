import { useEffect, useRef, useState } from 'react';
import { Heart, Sparkles, HelpCircle, X, Check, Star } from 'lucide-react';

interface HiddenMessage {
  id: number;
  text: string;
  emoji: string;
}

const hiddenMessages: HiddenMessage[] = [
  { id: 1, text: "I'm always with you, in every heartbeat", emoji: '❤️' },
  { id: 2, text: 'Close your eyes and feel my love surrounding you', emoji: '🤗' },
  { id: 3, text: "You're the first thing I think of every morning", emoji: '☀️' },
  { id: 4, text: 'Distance means so little when someone means so much', emoji: '🌟' },
  { id: 5, text: 'You are my favorite notification', emoji: '💌' },
  { id: 6, text: 'My heart skips a beat every time I see you', emoji: '💓' },
];

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: 'Where did we first meet?',
    options: ['At a café', 'At the park', 'Through friends', 'At work'],
    correct: 1,
  },
  {
    question: 'What was our first date?',
    options: ['Dinner and movie', 'Ice Cream date', 'Beach walk', 'Concert'],
    correct: 1,
  },
  {
    question: "What's my favorite thing about you?",
    options: ['Your smile', 'Your laugh', 'Your heart', 'Everything'],
    correct: 3,
  },
];

const Surprise = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<HiddenMessage | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; color: string }>>([]);
  const [heartPulse, setHeartPulse] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const heartButtonRef = useRef<HTMLButtonElement>(null);

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

  const handleHeartClick = () => {
    const randomMessage = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    setHeartPulse(true);
    setTimeout(() => setHeartPulse(false), 1000);

    // Create particle explosion with colors
    const colors = ['#ff9ecd', '#ff7eb8', '#e85a9a', '#e8d5f2', '#e0b0ff', '#ffb3ba'];
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 250 - 125,
      y: Math.random() * 250 - 125,
      delay: Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);

    // Clear particles after animation
    setTimeout(() => setParticles([]), 2000);
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowQuizResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowQuizResult(false);
    setSelectedAnswer(null);
  };

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
        <div className="absolute top-10 left-20 w-64 h-64 bg-pink-primary/25 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-lavender/30 rounded-full blur-3xl animate-morph" style={{ animationDelay: '2s' }} />
        
        {/* Floating elements */}
        <Heart className="absolute top-32 left-16 w-8 h-8 text-pink-primary/30 fill-pink-light/30 animate-float-slow" />
        <Star className="absolute bottom-40 right-24 w-6 h-6 text-lavender-dark/40 animate-sparkle" />
        <Heart className="absolute top-1/2 right-10 w-10 h-10 text-pink-deep/25 fill-pink-primary/25 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0 animate-bounce-in' : 'opacity-0 translate-y-6'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-deep" />
            <span className="text-sm text-gray-600 font-medium">Special Surprises</span>
          </div>

          <h2
            className={`text-5xl sm:text-6xl md:text-7xl font-script bg-gradient-to-r from-pink-hot via-pink-deep to-mauve bg-clip-text text-transparent mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            A Surprise for You
          </h2>

          <p
            className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Little moments of love, just for you
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

        {/* Surprise Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Heart Click Surprise */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-romantic-lg text-center relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-light/60 to-lavender/50" />
              
              {/* Animated background shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-primary/20 rounded-full blur-2xl animate-morph" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-lavender/30 rounded-full blur-2xl animate-morph" style={{ animationDelay: '2s' }} />
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent mb-4">
                  Click When You Miss Me
                </h3>
                <p className="text-gray-600 mb-8">
                  Tap the heart below to receive a special message
                </p>

                {/* Heart Button */}
                <div className="relative inline-block">
                  {/* Particle Effects */}
                  {particles.map((particle) => (
                    <Heart
                      key={particle.id}
                      className="absolute w-6 h-6 pointer-events-none"
                      style={{
                        left: '50%',
                        top: '50%',
                        color: particle.color,
                        fill: particle.color,
                        transform: `translate(-50%, -50%)`,
                        animation: `particle-burst 1.2s ease-out forwards`,
                        animationDelay: `${particle.delay}s`,
                        '--particle-x': `${particle.x}px`,
                        '--particle-y': `${particle.y}px`,
                      } as React.CSSProperties}
                    />
                  ))}

                  <button
                    ref={heartButtonRef}
                    onClick={handleHeartClick}
                    className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-pink-hot via-pink-deep to-mauve flex items-center justify-center shadow-romantic-xl hover:shadow-glow-lg transition-all duration-300 group ${
                      heartPulse ? 'scale-125' : 'hover:scale-110'
                    }`}
                  >
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-hot to-pink-deep animate-ping opacity-20" />
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-pink-primary to-lavender opacity-30 blur-xl animate-pulse-glow" />
                    
                    <Heart className={`relative w-20 h-20 sm:w-24 sm:h-24 text-white fill-white/40 transition-transform duration-300 ${heartPulse ? 'animate-pulse-heart' : 'group-hover:scale-110'}`} />
                  </button>
                </div>

                {/* Message Modal */}
                {showMessage && currentMessage && (
                  <div className="mt-8 p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-romantic-lg animate-bounce-in">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl animate-bounce">{currentMessage.emoji}</span>
                      <div>
                        <p className="text-gray-800 text-lg font-medium">
                          {currentMessage.text}
                        </p>
                        <button
                          onClick={() => setShowMessage(false)}
                          className="mt-3 text-sm text-pink-deep hover:text-pink-hot transition-colors font-medium"
                        >
                          Tap heart again for another message
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quiz Section */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-romantic-lg relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cream to-pink-light/40" />
              
              {/* Animated shapes */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-lavender/30 rounded-full blur-xl animate-morph" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-primary/20 rounded-full blur-xl animate-morph" style={{ animationDelay: '3s' }} />

              <div className="relative z-10">
                {!showQuiz ? (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-light to-lavender flex items-center justify-center mx-auto mb-6 shadow-romantic animate-pulse-glow">
                      <HelpCircle className="w-10 h-10 text-pink-deep" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent mb-4">
                      How Well Do You Know Us?
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Take a quick quiz and see how well you remember our story
                    </p>
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-8 py-3 bg-gradient-to-r from-pink-hot via-pink-deep to-mauve text-white font-medium rounded-full shadow-romantic-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
                    >
                      Start Quiz
                    </button>
                  </div>
                ) : showQuizResult ? (
                  <div className="text-center animate-bounce-in">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-hot to-mauve flex items-center justify-center mx-auto mb-6 shadow-romantic-lg animate-pulse-glow">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-script bg-gradient-to-r from-pink-deep to-pink-hot bg-clip-text text-transparent mb-4">
                      Quiz Complete!
                    </h3>
                    <p className="text-5xl font-bold bg-gradient-to-r from-pink-hot to-mauve bg-clip-text text-transparent mb-2">
                      {quizScore}/{quizQuestions.length}
                    </p>
                    <p className="text-gray-600 mb-8">
                      {quizScore === quizQuestions.length
                        ? 'Perfect! You know us so well! 💕'
                        : quizScore >= 2
                        ? 'Great job! You know our story pretty well! 💗'
                        : 'Aww, we need to make more memories together! 💝'}
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="px-8 py-3 bg-gradient-to-r from-pink-hot via-pink-deep to-mauve text-white font-medium rounded-full shadow-romantic-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm text-gray-500 font-medium">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-pink-light rounded-full mb-6 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-primary to-pink-hot transition-all duration-500"
                        style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                      />
                    </div>

                    <h4 className="text-xl font-medium text-gray-800 mb-6">
                      {quizQuestions[currentQuestion].question}
                    </h4>

                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center justify-between group ${
                            selectedAnswer === null
                              ? 'bg-gradient-to-r from-pink-light/60 to-lavender/60 hover:from-pink-light hover:to-lavender text-gray-700 hover:shadow-romantic'
                              : selectedAnswer === index
                              ? index === quizQuestions[currentQuestion].correct
                                ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 shadow-lg'
                                : 'bg-gradient-to-r from-red-100 to-red-200 text-red-700'
                              : index === quizQuestions[currentQuestion].correct
                              ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 shadow-lg'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <span className="font-medium">{option}</span>
                          {selectedAnswer !== null &&
                            index === quizQuestions[currentQuestion].correct && (
                              <Check className="w-5 h-5 animate-bounce-in" />
                            )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Animation Styles */}
      <style>{`
        @keyframes particle-burst {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Surprise;
