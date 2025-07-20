import React, { useEffect, useRef } from 'react';

interface WavePoint {
  x: number;
  y: number;
  baseY: number;
  amplitude: number;
  frequency: number;
  phase: number;
  color: string;
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

const FlowingWaveBackground: React.FC = () => {
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

    // Create network nodes for geometric background
    const createNetworkNodes = (): NetworkNode[] => {
      const nodes: NetworkNode[] = [];
      const gridSize = 80;
      
      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          nodes.push({
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            connections: []
          });
        }
      }
      
      return nodes;
    };

    // Create floating particles
    const createFloatingParticles = (): FloatingParticle[] => {
      const particles: FloatingParticle[] = [];
      const colors = [
        'rgba(59, 130, 246, 0.8)',   // Blue
        'rgba(34, 197, 94, 0.8)',    // Green
        'rgba(251, 191, 36, 0.8)',   // Yellow
        'rgba(239, 68, 68, 0.8)',    // Red
        'rgba(168, 85, 247, 0.8)',   // Purple
        'rgba(6, 182, 212, 0.8)'     // Cyan
      ];

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2
        });
      }

      return particles;
    };

    let networkNodes = createNetworkNodes();
    let floatingParticles = createFloatingParticles();

    const drawNetworkBackground = () => {
      // Update node positions
      networkNodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Boundary bounce
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < networkNodes.length; i++) {
        for (let j = i + 1; j < networkNodes.length; j++) {
          const dx = networkNodes[i].x - networkNodes[j].x;
          const dy = networkNodes[i].y - networkNodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.3;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
            ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      networkNodes.forEach(node => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawFlowingWaves = () => {
      const centerY = canvas.height / 2;
      const waveWidth = canvas.width * 1.2;
      const numWaves = 8;

      // Main flowing wave bundle
      for (let wave = 0; wave < numWaves; wave++) {
        const points: WavePoint[] = [];
        const waveOffset = (wave / numWaves) * Math.PI * 0.5;
        const amplitude = 80 + wave * 15;
        const frequency = 0.003 + wave * 0.0005;
        
        // Create wave points
        for (let x = -200; x < waveWidth + 200; x += 8) {
          const baseWave = Math.sin(x * frequency + timeRef.current * 0.002 + waveOffset) * amplitude;
          const secondaryWave = Math.sin(x * frequency * 2 + timeRef.current * 0.003 + waveOffset) * amplitude * 0.3;
          const flowOffset = Math.sin(timeRef.current * 0.001 + wave * 0.5) * 50;
          
          points.push({
            x: x + flowOffset,
            y: centerY + baseWave + secondaryWave,
            baseY: centerY,
            amplitude: amplitude,
            frequency: frequency,
            phase: waveOffset,
            color: `hsl(${200 + wave * 15 + Math.sin(timeRef.current * 0.001) * 30}, 70%, ${50 + wave * 5}%)`
          });
        }

        // Draw wave with gradient
        if (points.length > 1) {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          gradient.addColorStop(0, `hsla(${180 + wave * 20}, 80%, 60%, 0.1)`);
          gradient.addColorStop(0.3, `hsla(${200 + wave * 15}, 70%, 50%, 0.8)`);
          gradient.addColorStop(0.7, `hsla(${220 + wave * 10}, 60%, 40%, 0.6)`);
          gradient.addColorStop(1, `hsla(${240 + wave * 5}, 50%, 30%, 0.2)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2 + wave * 0.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          // Create smooth curves
          for (let i = 1; i < points.length - 2; i++) {
            const cp1x = (points[i].x + points[i + 1].x) / 2;
            const cp1y = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, cp1x, cp1y);
          }

          ctx.stroke();

          // Add glow effect for main waves
          if (wave < 3) {
            ctx.shadowColor = points[Math.floor(points.length / 2)].color;
            ctx.shadowBlur = 20;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Draw flowing particles along the wave
        if (wave % 2 === 0) {
          for (let i = 0; i < points.length; i += 20) {
            const point = points[i];
            const particleSize = 3 + Math.sin(timeRef.current * 0.005 + i * 0.1) * 2;
            
            ctx.fillStyle = point.color;
            ctx.beginPath();
            ctx.arc(point.x, point.y, particleSize, 0, Math.PI * 2);
            ctx.fill();

            // Add particle glow
            const glowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, particleSize * 3);
            glowGradient.addColorStop(0, point.color);
            glowGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, particleSize * 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const drawFloatingParticles = () => {
      floatingParticles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Draw particle with glow
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
      });
    };

    const animate = () => {
      // Clear canvas with dark gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      bgGradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.9)');
      bgGradient.addColorStop(1, 'rgba(51, 65, 85, 0.85)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all elements
      drawNetworkBackground();
      drawFlowingWaves();
      drawFloatingParticles();

      timeRef.current += 16; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
      networkNodes = createNetworkNodes();
      floatingParticles = createFloatingParticles();
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
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default FlowingWaveBackground;