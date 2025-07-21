import React, { useEffect, useRef } from 'react';

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  wingPhase: number;
  wingSpeed: number;
  color: string;
  opacity: number;
  angle: number;
  turnSpeed: number;
  path: { x: number; y: number }[];
}

const ButterflyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const butterfliesRef = useRef<Butterfly[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createButterfly = (): Butterfly => {
      const colors = [
        '#FF6B9D', // Pink
        '#4ECDC4', // Teal
        '#45B7D1', // Blue
        '#96CEB4', // Green
        '#FFEAA7', // Yellow
        '#DDA0DD', // Plum
        '#FFB347', // Orange
        '#98D8C8'  // Mint
      ];

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 20 + 15,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 0.15 + Math.random() * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.6 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        turnSpeed: (Math.random() - 0.5) * 0.02,
        path: []
      };
    };

    const createButterflies = () => {
      butterfliesRef.current = [];
      const count = Math.floor((canvas.width * canvas.height) / 25000) + 3;
      
      for (let i = 0; i < count; i++) {
        butterfliesRef.current.push(createButterfly());
      }
    };

    const drawButterfly = (butterfly: Butterfly) => {
      ctx.save();
      ctx.translate(butterfly.x, butterfly.y);
      ctx.rotate(butterfly.angle);
      ctx.globalAlpha = butterfly.opacity;

      const wingFlap = Math.sin(butterfly.wingPhase) * 0.3;
      const size = butterfly.size;

      // Butterfly body
      ctx.fillStyle = '#4A4A4A';
      ctx.beginPath();
      ctx.ellipse(0, 0, size * 0.08, size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Antennae
      ctx.strokeStyle = '#4A4A4A';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-size * 0.05, -size * 0.3);
      ctx.lineTo(-size * 0.15, -size * 0.4);
      ctx.moveTo(size * 0.05, -size * 0.3);
      ctx.lineTo(size * 0.15, -size * 0.4);
      ctx.stroke();

      // Wing gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, butterfly.color);
      gradient.addColorStop(0.7, butterfly.color + '80');
      gradient.addColorStop(1, butterfly.color + '20');

      // Left upper wing
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.save();
      ctx.rotate(wingFlap - 0.2);
      ctx.ellipse(-size * 0.3, -size * 0.1, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right upper wing
      ctx.beginPath();
      ctx.save();
      ctx.rotate(-wingFlap + 0.2);
      ctx.ellipse(size * 0.3, -size * 0.1, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Left lower wing
      ctx.beginPath();
      ctx.save();
      ctx.rotate(wingFlap - 0.1);
      ctx.ellipse(-size * 0.25, size * 0.15, size * 0.25, size * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Right lower wing
      ctx.beginPath();
      ctx.save();
      ctx.rotate(-wingFlap + 0.1);
      ctx.ellipse(size * 0.25, size * 0.15, size * 0.25, size * 0.2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Wing patterns
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.save();
      ctx.rotate(wingFlap - 0.2);
      ctx.beginPath();
      ctx.ellipse(-size * 0.3, -size * 0.1, size * 0.1, size * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.rotate(-wingFlap + 0.2);
      ctx.beginPath();
      ctx.ellipse(size * 0.3, -size * 0.1, size * 0.1, size * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();
    };

    const updateButterfly = (butterfly: Butterfly) => {
      // Update wing animation
      butterfly.wingPhase += butterfly.wingSpeed;

      // Add some randomness to movement
      butterfly.vx += (Math.random() - 0.5) * 0.1;
      butterfly.vy += (Math.random() - 0.5) * 0.1;

      // Gentle turning
      butterfly.angle += butterfly.turnSpeed;

      // Apply movement
      butterfly.x += butterfly.vx;
      butterfly.y += butterfly.vy;

      // Add slight upward bias (butterflies tend to fly upward)
      butterfly.vy -= 0.02;

      // Damping
      butterfly.vx *= 0.98;
      butterfly.vy *= 0.98;

      // Boundary wrapping
      if (butterfly.x < -50) butterfly.x = canvas.width + 50;
      if (butterfly.x > canvas.width + 50) butterfly.x = -50;
      if (butterfly.y < -50) butterfly.y = canvas.height + 50;
      if (butterfly.y > canvas.height + 50) butterfly.y = -50;

      // Update path trail
      butterfly.path.push({ x: butterfly.x, y: butterfly.y });
      if (butterfly.path.length > 20) {
        butterfly.path.shift();
      }
    };

    const drawButterflyTrail = (butterfly: Butterfly) => {
      if (butterfly.path.length < 2) return;

      ctx.strokeStyle = butterfly.color + '20';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      for (let i = 0; i < butterfly.path.length - 1; i++) {
        const point = butterfly.path[i];
        const opacity = (i / butterfly.path.length) * 0.3;
        ctx.globalAlpha = opacity;
        
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
      
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      butterfliesRef.current.forEach(butterfly => {
        drawButterflyTrail(butterfly);
        updateButterfly(butterfly);
        drawButterfly(butterfly);
      });

      timeRef.current += 16;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createButterflies();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createButterflies();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        background: 'transparent',
        opacity: 0.7
      }}
    />
  );
};

export default ButterflyBackground;