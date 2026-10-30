// Guirlande lumineuse discrète : un fil qui ondule et des ampoules qui scintillent
const BULB_COLORS = ['#fffd67', '#22c55e', '#ffffff', '#f87171'];
const ANCHOR_Y = 2;
const SAG_Y = 22; // point de contrôle de la courbe → creux du fil à 12px

interface FestiveLightsProps {
  bulbs?: number;
  className?: string;
}

const FestiveLights = ({ bulbs = 18, className = '' }: FestiveLightsProps) => {
  const step = 100 / bulbs;
  const wirePath = Array.from({ length: bulbs }, (_, i) => {
    const start = i * step;
    return `${i === 0 ? `M${start} ${ANCHOR_Y}` : ''} Q${start + step / 2} ${SAG_Y} ${start + step} ${ANCHOR_Y}`;
  }).join(' ');
  const bulbTop = (ANCHOR_Y + SAG_Y) / 2;

  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 h-10 ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d={wirePath} fill="none" stroke="rgba(17,24,39,0.55)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: bulbs }, (_, i) => {
        const color = BULB_COLORS[i % BULB_COLORS.length];
        return (
          <span
            key={i}
            className="absolute flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${(i + 0.5) * step}%`, top: bulbTop }}
          >
            <span className="h-1.5 w-1 rounded-sm bg-gray-700" />
            <span
              className="bn-bulb h-3.5 w-2.5 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 10px 2px ${color}99`,
                animationDelay: `${(i % 5) * 0.55}s`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
};

export default FestiveLights;
