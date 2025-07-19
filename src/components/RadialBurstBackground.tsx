import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  color: string;
  trail: { x: number; y: number; z: number; opacity: number }[];
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
}

const RadialBurstBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * Math.PI * 0.5;
      const speed = Math.random() * 3 + 1;
      
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        z: 0,
        vx: Math.cos(angle) * Math.cos(elevation) * speed,
        vy: Math.sin(angle) * Math.cos(elevation) * speed,
        vz: Math.sin(elevation) * speed,
        size: Math.random() * 3 + 1,
        opacity: 1,
        color: `hsl(${180 + Math.random() * 60}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 40}%)`,
        trail: [],
        angle: angle,
        speed: speed,
        life: 0,
        maxLife: 120 + Math.random() * 60
      };
    };

    const createParticles = () => {
      particlesRef.current = [];
      // Start with some initial particles
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const drawParticle = (particle: Particle) => {
      // Calculate 3D perspective
      const perspective = 800;
      const scale = perspective / (perspective + particle.z);
      const x = particle.x + (particle.x - canvas.width / 2) * (1 - scale);
      const y = particle.y + (particle.y - canvas.height / 2) * (1 - scale);
      const size = particle.size * scale;

      // Draw trail
      particle.trail.forEach((point, index) => {
        const trailScale = perspective / (perspective + point.z);
        const trailX = point.x + (point.x - canvas.width / 2) * (1 - trailScale);
        const trailY = point.y + (point.y - canvas.height / 2) * (1 - trailScale);
        const trailSize = particle.size * 0.3 * trailScale;
        const trailOpacity = point.opacity * (index / particle.trail.length) * 0.5;

        if (trailOpacity > 0.01) {
          ctx.fillStyle = `rgba(59, 130, 246, ${trailOpacity})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw main particle with glow effect
      if (particle.opacity > 0.01 && scale > 0.1) {
        // Outer glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity * 0.8})`);
        gradient.addColorStop(0.3, `rgba(147, 197, 253, ${particle.opacity * 0.4})`);
        gradient.addColorStop(0.6, `rgba(219, 234, 254, ${particle.opacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = particle.color.replace('hsl', 'hsla').replace(')', `, ${particle.opacity})`);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawRadialLines = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;

      // Draw radial burst lines
      for (let i = 0; i < 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        const length = 200 + Math.sin(time + i * 0.1) * 50;
        const opacity = 0.1 + Math.sin(time * 2 + i * 0.2) * 0.05;
        
        const startX = centerX + Math.cos(angle) * 50;
        const startY = centerY + Math.sin(angle) * 50;
        const endX = centerX + Math.cos(angle) * length;
        const endY = centerY + Math.sin(angle) * length;

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    };

    const animate = () => {
      // Create dark space background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw radial burst lines
      drawRadialLines();

      // Add new particles continuously
      if (Math.random() < 0.3) {
        particlesRef.current.push(createParticle());
      }

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update trail
        particle.trail.push({ 
          x: particle.x, 
          y: particle.y, 
          z: particle.z, 
          opacity: particle.opacity 
        });
        if (particle.trail.length > 8) {
          particle.trail.shift();
        }

        // Update trail opacity
        particle.trail.forEach((point, index) => {
          point.opacity *= 0.95;
        });

        // Update position (moving away from center)
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Accelerate particles as they move away
        particle.vx *= 1.02;
        particle.vy *= 1.02;
        particle.vz *= 1.02;

        // Update life and opacity
        particle.life++;
        particle.opacity = Math.max(0, 1 - (particle.life / particle.maxLife));

        // Draw particle
        drawParticle(particle);

        // Remove particles that are too far or too old
        const distanceFromCenter = Math.sqrt(
          Math.pow(particle.x - canvas.width / 2, 2) + 
          Math.pow(particle.y - canvas.height / 2, 2)
        );
        
        return particle.life < particle.maxLife && 
               distanceFromCenter < Math.max(canvas.width, canvas.height) * 1.5 &&
               particle.opacity > 0.01;
      });

      // Draw central burst effect
      const time = Date.now() * 0.003;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const centralGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      centralGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 + Math.sin(time) * 0.1})`);
      centralGradient.addColorStop(0.3, `rgba(59, 130, 246, ${0.2 + Math.sin(time) * 0.05})`);
      centralGradient.addColorStop(0.7, `rgba(147, 197, 253, ${0.1 + Math.sin(time) * 0.03})`);
      centralGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.fillStyle = centralGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
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
        background: 'radial-gradient(circle at center, rgba(0, 20, 40, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default RadialBurstBackground;