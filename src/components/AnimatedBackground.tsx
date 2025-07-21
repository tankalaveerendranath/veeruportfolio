import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  type: 'geometric' | 'particles';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    if (type === 'geometric') {
      // Geometric shapes animation for Skills
      const shapes: Array<{
        x: number;
        y: number;
        size: number;
        rotation: number;
        rotationSpeed: number;
        opacity: number;
        type: 'triangle' | 'square' | 'circle' | 'hexagon';
        color: string;
      }> = [];

      const createShapes = () => {
        shapes.length = 0;
        for (let i = 0; i < 15; i++) {
          shapes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 60 + 20,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            opacity: Math.random() * 0.3 + 0.1,
            type: ['triangle', 'square', 'circle', 'hexagon'][Math.floor(Math.random() * 4)] as any,
            color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`
          });
        }
      };

      const drawShape = (shape: any) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = shape.opacity;
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 2;

        switch (shape.type) {
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -shape.size / 2);
            ctx.lineTo(-shape.size / 2, shape.size / 2);
            ctx.lineTo(shape.size / 2, shape.size / 2);
            ctx.closePath();
            ctx.stroke();
            break;
          case 'square':
            ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case 'hexagon':
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = Math.cos(angle) * shape.size / 2;
              const y = Math.sin(angle) * shape.size / 2;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            break;
        }
        ctx.restore();
      };

      const animateGeometric = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => {
          shape.rotation += shape.rotationSpeed;
          drawShape(shape);
        });

        animationRef.current = requestAnimationFrame(animateGeometric);
      };

      resizeCanvas();
      createShapes();
      animateGeometric();

      const handleResize = () => {
        resizeCanvas();
        createShapes();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      // Floating particles animation for Work Experience
      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        opacity: number;
        color: string;
        trail: Array<{ x: number; y: number; opacity: number }>;
      }> = [];

      const createParticles = () => {
        particles.length = 0;
        for (let i = 0; i < 25; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.8 + 0.2,
            color: `hsl(${180 + Math.random() * 80}, 70%, 60%)`,
            trail: []
          });
        }
      };

      const drawParticle = (particle: any) => {
        // Draw trail
        particle.trail.forEach((point: any, index: number) => {
          const trailOpacity = point.opacity * (index / particle.trail.length);
          ctx.fillStyle = `rgba(255, 255, 246, ${trailOpacity})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw main particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      };

      const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = (150 - distance) / 150 * 0.2;
              ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      };

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          // Update trail
          particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
          if (particle.trail.length > 8) {
            particle.trail.shift();
          }

          // Update trail opacity
          particle.trail.forEach((point: any) => {
            point.opacity *= 0.95;
          });

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Boundary conditions
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -1;
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -1;
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          }

          drawParticle(particle);
        });

        drawConnections();
        animationRef.current = requestAnimationFrame(animateParticles);
      };

      resizeCanvas();
      createParticles();
      animateParticles();

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
    }
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'multiply'
      }}
    />
  );
};

export default AnimatedBackground;