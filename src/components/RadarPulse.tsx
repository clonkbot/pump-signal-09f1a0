import { useEffect, useState } from 'react';

interface RadarPulseProps {
  signalCount: number;
}

export default function RadarPulse({ signalCount }: RadarPulseProps) {
  const [rotation, setRotation] = useState(0);
  const [blips, setBlips] = useState<{ id: number; angle: number; distance: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newBlips = Array.from({ length: signalCount }, (_, i) => ({
      id: i,
      angle: (360 / signalCount) * i + Math.random() * 30,
      distance: 25 + Math.random() * 20
    }));
    setBlips(newBlips);
  }, [signalCount]);

  return (
    <div className="radar-container">
      <svg viewBox="0 0 100 100" className="radar-svg">
        {/* Background circles */}
        <circle cx="50" cy="50" r="45" className="radar-ring" />
        <circle cx="50" cy="50" r="30" className="radar-ring" />
        <circle cx="50" cy="50" r="15" className="radar-ring" />

        {/* Cross lines */}
        <line x1="50" y1="5" x2="50" y2="95" className="radar-line" />
        <line x1="5" y1="50" x2="95" y2="50" className="radar-line" />

        {/* Sweep */}
        <defs>
          <linearGradient id="sweepGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <g transform={`rotate(${rotation}, 50, 50)`}>
          <path
            d="M50,50 L50,5 A45,45 0 0,1 92.68,27.5 Z"
            fill="url(#sweepGradient)"
            className="radar-sweep"
          />
          <line x1="50" y1="50" x2="50" y2="5" className="radar-scanner" />
        </g>

        {/* Signal blips */}
        {blips.map(blip => {
          const x = 50 + blip.distance * Math.cos((blip.angle * Math.PI) / 180);
          const y = 50 + blip.distance * Math.sin((blip.angle * Math.PI) / 180);
          return (
            <g key={blip.id}>
              <circle cx={x} cy={y} r="3" className="radar-blip" />
              <circle cx={x} cy={y} r="5" className="radar-blip-pulse" />
            </g>
          );
        })}

        {/* Center dot */}
        <circle cx="50" cy="50" r="3" className="radar-center" />
      </svg>

      <div className="radar-label">
        <span className="radar-count">{signalCount}</span>
        <span className="radar-text">HIGH SIGNALS</span>
      </div>

      <style>{`
        .radar-container {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .radar-svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.3));
        }

        .radar-ring {
          fill: none;
          stroke: #2a2a3a;
          stroke-width: 0.5;
        }

        .radar-line {
          stroke: #2a2a3a;
          stroke-width: 0.5;
        }

        .radar-sweep {
          opacity: 0.5;
        }

        .radar-scanner {
          stroke: #00ff88;
          stroke-width: 1;
        }

        .radar-blip {
          fill: #00ff88;
          animation: blip-glow 1.5s ease-in-out infinite;
        }

        .radar-blip-pulse {
          fill: none;
          stroke: #00ff88;
          stroke-width: 1;
          animation: blip-pulse 1.5s ease-out infinite;
        }

        @keyframes blip-glow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes blip-pulse {
          0% {
            r: 3;
            opacity: 0.8;
          }
          100% {
            r: 8;
            opacity: 0;
          }
        }

        .radar-center {
          fill: #00ff88;
          filter: drop-shadow(0 0 5px #00ff88);
        }

        .radar-label {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .radar-count {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.25rem;
          font-weight: 900;
          color: #00ff88;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .radar-text {
          font-size: 0.5rem;
          color: #606070;
          letter-spacing: 0.15em;
        }
      `}</style>
    </div>
  );
}
