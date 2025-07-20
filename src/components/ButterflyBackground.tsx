import React, { useEffect, useRef } from 'react';

interface ButterflyWing {
  leftWing: Path2D;
  rightWing: Path2D;
  leftWingAngle: number;
  rightWingAngle: number;
  wingBeatSpeed: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  hue: number;
}

const ButterflyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    const createWingPath = (size: number, isLeft: boolean): Path2D => {
      const wing = new Path2D();
      const direction = isLeft ? -1 : 1;
      
      // Upper wing
      wing.moveTo(0, 0);
      wing.bezierCurveTo(
        direction * size * 0.3, -size * 0.4,
        direction * size * 0.8, -size * 0.6,
        direction * size * 1.2, -size * 0.3
      );
      wing.bezierCurveTo(
        direction * size * 1.0, -size * 0.1,
        direction * size * 0.6, size * 0.1,
        0, 0
      );
      
      // Lower wing
      wing.moveTo(0, 0);
      wing.bezierCurveTo(
        direction * size * 0.2, size * 0.3,
        direction * size * 0.6, size * 0.8,
        direction * size * 0.9, size * 0.6
      );
      wing.bezierCurveTo(
        direction * size * 0.7, size * 0.4,
        direction * size * 0.3, size * 0.2,
        0, 0
      );
      
      return wing;
    };

    const createButterfly = (): ButterflyWing => {
      const size = Math.random() * 80 + 120; // Large butterflies
      return {
        leftWing: createWingPath(size, true),
        rightWing: createWingPath(size, false),
        leftWingAngle: 0,
        rightWingAngle: 0,
        wingBeatSpeed: 0.08 + Math.random() * 0.04,
        size: size,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: 0.3 + Math.random() * 0.4,
        hue: Math.random() * 360
      };
    };

    let butterflies: ButterflyWing[] = [];
    
    const initializeButterflies = () => {
      butterflies = [];
      // Create fewer but larger butterflies
      for (let i = 0; i < 8; i++) {
        butterflies.push(createButterfly());
      }
    };

    const drawWing = (butterfly: ButterflyWing, isLeft: boolean, angle: number) => {
      ctx.save();
      
      // Apply wing rotation
      ctx.rotate(angle);
      
      // Wing gradient
      const gradient = ctx.createLinearGradient(
        isLeft ? -butterfly.size : 0, 
        -butterfly.size, 
        isLeft ? 0 : butterfly.size, 
        butterfly.size
      );
      
      gradient.addColorStop(0, `hsla(${butterfly.hue}, 70%, 60%, ${butterfly.opacity})`);
      gradient.addColorStop(0.3, `hsla(${butterfly.hue + 30}, 80%, 70%, ${butterfly.opacity * 0.8})`);
      gradient.addColorStop(0.6, `hsla(${butterfly.hue + 60}, 60%, 50%, ${butterfly.opacity * 0.6})`);
      gradient.addColorStop(1, `hsla(${butterfly.hue + 90}, 50%, 40%, ${butterfly.opacity * 0.3})`);
      
      ctx.fillStyle = gradient;
      ctx.fill(isLeft ? butterfly.leftWing : butterfly.rightWing);
      
      // Wing outline
      ctx.strokeStyle = `hsla(${butterfly.hue}, 60%, 30%, ${butterfly.opacity * 0.8})`;
      ctx.lineWidth = 2;
      ctx.stroke(isLeft ? butterfly.leftWing : butterfly.rightWing);
      
      // Wing patterns
      ctx.fillStyle = `hsla(${butterfly.hue + 180}, 80%, 80%, ${butterfly.opacity * 0.4})`;
      
      // Spots on wings
      const spotSize = butterfly.size * 0.1;
      const spots = [
        { x: isLeft ? -butterfly.size * 0.6 : butterfly.size * 0.6, y: -butterfly.size * 0.3 },
        { x: isLeft ? -butterfly.size * 0.8 : butterfly.size * 0.8, y: -butterfly.size * 0.1 },
        { x: isLeft ? -butterfly.size * 0.4 : butterfly.size * 0.4, y: butterfly.size * 0.4 }
      ];
      
      spots.forEach(spot => {
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spotSize, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.restore();
    };

    const drawButterfly = (butterfly: ButterflyWing) => {
      ctx.save();
      ctx.translate(butterfly.x, butterfly.y);
      
      // Body
      ctx.fillStyle = `hsla(${butterfly.hue + 180}, 40%, 20%, ${butterfly.opacity})`;
      ctx.fillRect(-3, -butterfly.size * 0.6, 6, butterfly.size * 1.2);
      
      // Antennae
      ctx.strokeStyle = `hsla(${butterfly.hue + 180}, 40%, 20%, ${butterfly.opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-2, -butterfly.size * 0.6);
      ctx.lineTo(-8, -butterfly.size * 0.8);
      ctx.moveTo(2, -butterfly.size * 0.6);
      ctx.lineTo(8, -butterfly.size * 0.8);
      ctx.stroke();
      
      // Antennae tips
      ctx.fillStyle = `hsla(${butterfly.hue}, 60%, 50%, ${butterfly.opacity})`;
      ctx.beginPath();
      ctx.arc(-8, -butterfly.size * 0.8, 2, 0, Math.PI * 2);
      ctx.arc(8, -butterfly.size * 0.8, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw wings with animation
      drawWing(butterfly, true, butterfly.leftWingAngle);
      drawWing(butterfly, false, butterfly.rightWingAngle);
      
      ctx.restore();
    };

    const animate = () => {
      // Clear with gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)');
      bgGradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.05)');
      bgGradient.addColorStop(1, 'rgba(51, 65, 85, 0.02)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      butterflies.forEach((butterfly, index) => {
        // Update wing positions for flapping animation
        const wingBeat = Math.sin(timeRef.current * butterfly.wingBeatSpeed + index) * 0.6;
        butterfly.leftWingAngle = -Math.PI * 0.1 + wingBeat;
        butterfly.rightWingAngle = Math.PI * 0.1 - wingBeat;
        
        // Gentle floating movement
        butterfly.x += Math.sin(timeRef.current * 0.001 + index) * 0.5;
        butterfly.y += Math.cos(timeRef.current * 0.0008 + index * 0.5) * 0.3;
        
        // Keep butterflies on screen
        if (butterfly.x < -butterfly.size) butterfly.x = canvas.width + butterfly.size;
        if (butterfly.x > canvas.width + butterfly.size) butterfly.x = -butterfly.size;
        if (butterfly.y < -butterfly.size) butterfly.y = canvas.height + butterfly.size;
        if (butterfly.y > canvas.height + butterfly.size) butterfly.y = -butterfly.size;
        
        // Subtle opacity pulsing
        butterfly.opacity = 0.3 + Math.sin(timeRef.current * 0.002 + index) * 0.2;
        
        drawButterfly(butterfly);
      });
      
      timeRef.current += 16; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initializeButterflies();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initializeButterflies();
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
        mixBlendMode: 'multiply'
      }}
    />
  );
};

export default ButterflyBackground;