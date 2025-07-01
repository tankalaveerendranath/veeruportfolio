import React, { useEffect, useRef } from 'react';

interface Molecule {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotationSpeedX: number;
  rotationSpeedY: number;
  rotationSpeedZ: number;
  size: number;
  opacity: number;
  glowIntensity: number;
  glowDirection: number;
}

const MolecularBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moleculesRef = useRef<Molecule[]>([]);
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

    const createMolecules = () => {
      const molecules: Molecule[] = [];
      const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);

      for (let i = 0; i < count; i++) {
        molecules.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 0.5,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          rotationSpeedX: (Math.random() - 0.5) * 0.02,
          rotationSpeedY: (Math.random() - 0.5) * 0.02,
          rotationSpeedZ: (Math.random() - 0.5) * 0.02,
          size: Math.random() * 30 + 10,
          opacity: Math.random() * 0.3 + 0.1,
          glowIntensity: Math.random() * 0.8 + 0.2,
          glowDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }

      moleculesRef.current = molecules;
    };

    const drawMolecule = (molecule: Molecule) => {
      ctx.save();
      
      // Calculate 3D perspective
      const perspective = 800;
      const scale = perspective / (perspective + molecule.z);
      const x = molecule.x * scale + (canvas.width * (1 - scale)) / 2;
      const y = molecule.y * scale + (canvas.height * (1 - scale)) / 2;
      const size = molecule.size * scale;

      ctx.translate(x, y);
      ctx.rotate(molecule.rotationZ);
      
      // Create glow effect
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
      const glowAlpha = molecule.opacity * molecule.glowIntensity;
      
      gradient.addColorStop(0, `rgba(59, 130, 246, ${glowAlpha})`);
      gradient.addColorStop(0.3, `rgba(147, 197, 253, ${glowAlpha * 0.7})`);
      gradient.addColorStop(0.6, `rgba(219, 234, 254, ${glowAlpha * 0.3})`);
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      // Draw outer glow
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw molecular structure
      ctx.strokeStyle = `rgba(59, 130, 246, ${molecule.opacity})`;
      ctx.fillStyle = `rgba(147, 197, 253, ${molecule.opacity * 0.8})`;
      ctx.lineWidth = 2 * scale;

      // Central atom
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Orbital electrons
      const numElectrons = 6;
      for (let i = 0; i < numElectrons; i++) {
        const angle = (i / numElectrons) * Math.PI * 2 + molecule.rotationX;
        const orbitRadius = size * 0.8;
        
        // Electron orbit path
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, orbitRadius, orbitRadius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Electron
        const electronX = Math.cos(molecule.rotationY + i) * orbitRadius;
        const electronY = Math.sin(molecule.rotationY + i) * orbitRadius * 0.3;
        
        ctx.fillStyle = `rgba(34, 197, 94, ${molecule.opacity})`;
        ctx.beginPath();
        ctx.arc(electronX, electronY, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      // Bonds/connections
      for (let i = 0; i < 4; i++) {
        const bondAngle = (i / 4) * Math.PI * 2 + molecule.rotationX;
        const bondLength = size * 0.6;
        const bondX = Math.cos(bondAngle) * bondLength;
        const bondY = Math.sin(bondAngle) * bondLength;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bondX, bondY);
        ctx.stroke();

        // Bond atoms
        ctx.fillStyle = `rgba(168, 85, 247, ${molecule.opacity * 0.9})`;
        ctx.beginPath();
        ctx.arc(bondX, bondY, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      moleculesRef.current.forEach((molecule) => {
        // Update position
        molecule.x += molecule.vx;
        molecule.y += molecule.vy;
        molecule.z += molecule.vz;

        // Update rotation
        molecule.rotationX += molecule.rotationSpeedX;
        molecule.rotationY += molecule.rotationSpeedY;
        molecule.rotationZ += molecule.rotationSpeedZ;

        // Update glow
        molecule.glowIntensity += molecule.glowDirection * 0.01;
        if (molecule.glowIntensity > 1 || molecule.glowIntensity < 0.2) {
          molecule.glowDirection *= -1;
        }

        // Wrap around screen
        if (molecule.x < -100) molecule.x = canvas.width + 100;
        if (molecule.x > canvas.width + 100) molecule.x = -100;
        if (molecule.y < -100) molecule.y = canvas.height + 100;
        if (molecule.y > canvas.height + 100) molecule.y = -100;
        if (molecule.z < -500) molecule.z = 500;
        if (molecule.z > 500) molecule.z = -500;

        drawMolecule(molecule);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createMolecules();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createMolecules();
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default MolecularBackground;