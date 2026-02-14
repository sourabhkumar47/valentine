import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a romantic instrumental
    audioRef.current = new Audio('/music/our-song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && !isMuted) {
        audioRef.current.play().catch(() => {
          // Auto-play blocked, show tooltip
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-romantic text-sm text-gray-700 whitespace-nowrap animate-fade-in-up">
          Click to play romantic music <Heart className="w-4 h-4 inline text-pink-primary fill-pink-light" />
        </div>
      )}

      {/* Music indicator */}
      {isPlaying && !isMuted && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-romantic animate-pulse-glow">
          <Music className="w-4 h-4 text-pink-deep animate-pulse" />
          <span className="text-xs text-gray-600 font-medium">Now Playing</span>
        </div>
      )}

      {/* Control buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-romantic hover:shadow-romantic-lg hover:scale-110 ${
            isPlaying ? 'bg-gradient-to-r from-pink-hot to-pink-deep text-white animate-pulse-glow' : 'bg-white text-pink-deep'
          }`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          <Music className="w-5 h-5" />
        </button>

        <button
          onClick={toggleMute}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-romantic hover:shadow-romantic-lg hover:scale-110 ${
            isMuted ? 'bg-gray-200 text-gray-500' : 'bg-white text-pink-deep'
          }`}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
