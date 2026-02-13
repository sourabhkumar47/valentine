import { useEffect, useState } from 'react';
import Hero from './sections/Hero';
import OurStory from './sections/OurStory';
import Reasons from './sections/Reasons';
import Gallery from './sections/Gallery';
import LoveLetter from './sections/LoveLetter';
import Surprise from './sections/Surprise';
import Promises from './sections/Promises';
import Footer from './sections/Footer';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger load animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-beige transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <ScrollProgress />
      <FloatingHearts />
      <MusicPlayer />
      
      <main className="relative overflow-hidden">
        <Hero />
        <OurStory />
        <Reasons />
        <Gallery />
        <LoveLetter />
        <Surprise />
        <Promises />
        <Footer />
      </main>
    </div>
  );
}

export default App;
