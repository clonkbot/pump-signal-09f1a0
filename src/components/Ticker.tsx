import { useEffect, useState } from 'react';
import type { Signal } from '../App';

interface TickerProps {
  signals: Signal[];
}

export default function Ticker({ signals }: TickerProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => prev - 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...signals, ...signals, ...signals];

  return (
    <div className="ticker-container">
      <div className="ticker-label">
        <span className="ticker-icon">◈</span>
        LIVE FEED
      </div>

      <div className="ticker-wrapper">
        <div
          className="ticker-track"
          style={{ transform: `translateX(${offset % (signals.length * 280)}px)` }}
        >
          {tickerItems.map((signal, i) => (
            <div key={`${signal.id}-${i}`} className="ticker-item">
              <span className="ticker-ticker">{signal.ticker}</span>
              <span className={`ticker-change ${signal.priceChange > 0 ? 'positive' : 'negative'}`}>
                {signal.priceChange > 0 ? '▲' : '▼'} {Math.abs(signal.priceChange).toFixed(1)}%
              </span>
              <span className="ticker-mcap">{signal.marketCap}</span>
              <span className="ticker-score">
                SCORE: <span className="score-num">{signal.score}</span>
              </span>
              <span className="ticker-divider">│</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-container {
          display: flex;
          align-items: stretch;
          background: linear-gradient(90deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%);
          border-bottom: 1px solid #2a2a3a;
          overflow: hidden;
        }

        .ticker-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          background: rgba(0, 255, 136, 0.1);
          border-right: 1px solid #00ff88;
          font-size: 0.65rem;
          font-weight: 700;
          color: #00ff88;
          letter-spacing: 0.15em;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ticker-icon {
          font-size: 0.9rem;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .ticker-wrapper {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .ticker-wrapper::before,
        .ticker-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 2;
          pointer-events: none;
        }

        .ticker-wrapper::before {
          left: 0;
          background: linear-gradient(90deg, #0a0a0f 0%, transparent 100%);
        }

        .ticker-wrapper::after {
          right: 0;
          background: linear-gradient(-90deg, #0a0a0f 0%, transparent 100%);
        }

        .ticker-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          padding: 0.6rem 0;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 0.5rem;
        }

        .ticker-ticker {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
        }

        .ticker-change {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .ticker-change.positive {
          color: #00ff88;
        }

        .ticker-change.negative {
          color: #ff4444;
        }

        .ticker-mcap {
          font-size: 0.7rem;
          color: #606070;
        }

        .ticker-score {
          font-size: 0.65rem;
          color: #606070;
          letter-spacing: 0.05em;
        }

        .score-num {
          color: #00ffff;
          font-weight: 700;
        }

        .ticker-divider {
          color: #2a2a3a;
          margin: 0 0.5rem;
        }
      `}</style>
    </div>
  );
}
