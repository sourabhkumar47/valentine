import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-pink-primary via-pink-hot to-mauve transition-all duration-100 ease-out shadow-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
