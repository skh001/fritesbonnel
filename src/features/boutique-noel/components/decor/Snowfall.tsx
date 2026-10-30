import { useMemo, type CSSProperties } from 'react';

// Générateur pseudo-aléatoire déterministe : mêmes flocons à chaque rendu
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

interface SnowfallProps {
  count?: number;
  /** Distance de chute en pixels (≈ hauteur de la zone) */
  fallDistance?: number;
}

const Snowfall = ({ count = 40, fallDistance = 720 }: SnowfallProps) => {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 2 + seededRandom(i + 1) * 5;
        const duration = 9 + seededRandom(i + 2) * 10;
        return {
          left: `${seededRandom(i + 3) * 100}%`,
          width: size,
          height: size,
          opacity: 0.35 + seededRandom(i + 4) * 0.55,
          filter: size > 5 ? 'blur(1px)' : undefined,
          animationDuration: `${duration}s`,
          animationDelay: `-${seededRandom(i + 5) * duration}s`,
          '--bn-drift': `${(seededRandom(i + 6) - 0.5) * 60}px`,
          '--bn-fall': `${fallDistance}px`,
        } as CSSProperties;
      }),
    [count, fallDistance],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flakes.map((style, i) => (
        <span key={i} className="bn-snowflake" style={style} />
      ))}
    </div>
  );
};

export default Snowfall;
