import { useEffect, useRef } from 'react';
import './Fireworks.css';

type FireworksProps = {
  active: boolean;
  accent: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  gravity: number;
};

const BURST_COLORS = ['#c9a227', '#e8c84a', '#ffffff', '#fff8dc', '#ffd966'];

function mixColors(accent: string) {
  return [accent, ...BURST_COLORS];
}

function createBurst(
  x: number,
  y: number,
  color: string,
  particles: Particle[],
  scale = 1,
) {
  const count = Math.floor((55 + Math.random() * 25) * scale);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = (3.5 + Math.random() * 5.5) * scale;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay: 0.006 + Math.random() * 0.01,
      color: Math.random() > 0.3 ? color : BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      size: (2.5 + Math.random() * 3.5) * scale,
      gravity: 0.028 + Math.random() * 0.015,
    });
  }
}

function getBurstPoint() {
  const cx = window.innerWidth * (0.38 + Math.random() * 0.24);
  const cy = window.innerHeight * (0.3 + Math.random() * 0.22);
  return { x: cx, y: cy };
}

export function Fireworks({ active, accent }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = mixColors(accent);
    const particles: Particle[] = [];
    let elapsed = 0;
    let nextBurst = 0;
    let animId = 0;
    let lastTime = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const spawnBurst = (scale = 1) => {
      const { x, y } = getBurstPoint();
      const color = colors[Math.floor(Math.random() * colors.length)];
      createBurst(x, y, color, particles, scale);
    };

    // Opening flash at screen center
    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.4;
    createBurst(centerX, centerY, accent, particles, 1.35);
    createBurst(centerX, centerY, '#e8c84a', particles, 0.9);
    nextBurst = 200;

    const tick = (time: number) => {
      const dt = lastTime ? Math.min(time - lastTime, 32) : 16;
      lastTime = time;
      elapsed += dt;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (elapsed >= nextBurst && elapsed < 2400) {
        spawnBurst(0.85 + Math.random() * 0.35);
        nextBurst = elapsed + 280 + Math.random() * 320;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.988;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(p.alpha, 1);
        ctx.fill();

        // Bright core
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = Math.min(p.alpha * 0.7, 0.85);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;

      if (elapsed < 3000 || particles.length > 0) {
        animId = requestAnimationFrame(tick);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [active, accent]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="fireworks" aria-hidden="true" />;
}
