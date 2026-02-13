import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const FloatingHearts = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Girlish color palette
    const colors = ['#ff9ecd', '#ff7eb8', '#e85a9a', '#e8d5f2', '#e0b0ff', '#ffb3ba', '#ffcce0', '#f4c2c2'];
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
      heartsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 18 + 8,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
      });
    }

    const drawHeart = (heart: Heart) => {
      ctx.save();
      ctx.translate(heart.x, heart.y);
      ctx.rotate((heart.rotation * Math.PI) / 180);
      ctx.globalAlpha = heart.opacity;
      ctx.fillStyle = heart.color;

      const size = heart.size;
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.bezierCurveTo(-size / 2, -size, -size, -size / 3, 0, size / 2);
      ctx.bezierCurveTo(size, -size / 3, size / 2, -size, 0, -size / 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heartsRef.current.forEach((heart) => {
        heart.y -= heart.speedY;
        heart.x += heart.speedX;
        heart.rotation += heart.rotationSpeed;

        // Reset heart when it goes off screen
        if (heart.y < -heart.size * 2) {
          heart.y = canvas.height + heart.size * 2;
          heart.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (heart.x < -heart.size * 2) {
          heart.x = canvas.width + heart.size * 2;
        } else if (heart.x > canvas.width + heart.size * 2) {
          heart.x = -heart.size * 2;
        }

        drawHeart(heart);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default FloatingHearts;
