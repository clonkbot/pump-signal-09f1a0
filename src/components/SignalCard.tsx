import { useState, useEffect } from 'react';
import type { Signal } from '../App';

interface SignalCardProps {
  signal: Signal;
  index: number;
}

export default function SignalCard({ signal, index }: SignalCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#00ff88';
    if (score >= 80) return '#00ffff';
    if (score >= 70) return '#ffff00';
    return '#ff6600';
  };

  const getBondPotentialStyle = (potential: string) => {
    switch (potential) {
      case 'HIGH':
        return {
          background: 'rgba(0, 255, 136, 0.15)',
          border: '1px solid #00ff88',
          color: '#00ff88'
        };
      case 'MEDIUM':
        return {
          background: 'rgba(255, 255, 0, 0.15)',
          border: '1px solid #ffff00',
          color: '#ffff00'
        };
      default:
        return {
          background: 'rgba(255, 102, 0, 0.15)',
          border: '1px solid #ff6600',
          color: '#ff6600'
        };
    }
  };

  const formatTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  const bondStyle = getBondPotentialStyle(signal.bondPotential);

  return (
    <div
      className={`signal-card ${visible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="card-glow" />

      <div className="card-header">
        <div className="token-info">
          <span className="ticker">{signal.ticker}</span>
          <span className="token-address">{signal.token}</span>
        </div>
        <div className="score-badge" style={{ color: getScoreColor(signal.score) }}>
          <span className="score-label">SCORE</span>
          <span className="score-value">{signal.score}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="metrics-row">
          <div className="metric">
            <span className="metric-icon">👁</span>
            <span className="metric-value">{signal.insiderBuys}</span>
            <span className="metric-label">Insider Buys</span>
          </div>
          <div className="metric">
            <span className="metric-icon">💰</span>
            <span className="metric-value">{signal.profitableWallets}</span>
            <span className="metric-label">Profit Wallets</span>
          </div>
          <div className="metric">
            <span className="metric-icon">📊</span>
            <span className="metric-value">{signal.devBondRate}%</span>
            <span className="metric-label">Dev Bond Rate</span>
          </div>
        </div>

        <div className="info-row">
          <div className="narrative-badge">
            <span className="narrative-icon">◈</span>
            {signal.narrative}
          </div>
          {signal.bundlerActivity && (
            <div className="bundler-badge">
              <span className="bundler-dot" />
              BUNDLER
            </div>
          )}
        </div>

        <div className="stats-row">
          <div className="stat">
            <span className="stat-label">MCap</span>
            <span className="stat-value">{signal.marketCap}</span>
          </div>
          <div className="stat">
            <span className="stat-label">24h</span>
            <span className="stat-value positive">+{signal.priceChange}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(signal.timestamp)}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="bond-potential" style={bondStyle}>
          <span className="bond-icon">⬡</span>
          {signal.bondPotential} BOND POTENTIAL
        </div>
        <button className="buy-button">
          <span className="buy-text">ANALYZE</span>
          <span className="buy-arrow">→</span>
        </button>
      </div>

      <style>{`
        .signal-card {
          background: linear-gradient(135deg, #12121a 0%, #1a1a25 100%);
          border: 1px solid #2a2a3a;
          border-radius: 12px;
          padding: 1.25rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .signal-card.hovered {
          border-color: #00ff88;
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.15);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .signal-card.hovered .card-glow {
          opacity: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .token-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ticker {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .token-address {
          font-size: 0.7rem;
          color: #606070;
        }

        .score-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem 0.75rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border: 1px solid currentColor;
        }

        .score-label {
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          opacity: 0.7;
        }

        .score-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          text-shadow: 0 0 10px currentColor;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .metrics-row {
          display: flex;
          gap: 0.75rem;
        }

        .metric {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          border: 1px solid #2a2a3a;
        }

        .metric-icon {
          font-size: 1rem;
        }

        .metric-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #00ffff;
        }

        .metric-label {
          font-size: 0.6rem;
          color: #606070;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
        }

        .info-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .narrative-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          background: rgba(255, 0, 170, 0.1);
          border: 1px solid #ff00aa;
          border-radius: 20px;
          font-size: 0.7rem;
          color: #ff00aa;
          font-weight: 600;
        }

        .narrative-icon {
          font-size: 0.8rem;
        }

        .bundler-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          background: rgba(255, 255, 0, 0.1);
          border: 1px solid #ffff00;
          border-radius: 20px;
          font-size: 0.65rem;
          color: #ffff00;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .bundler-dot {
          width: 6px;
          height: 6px;
          background: #ffff00;
          border-radius: 50%;
          animation: pulse-dot 1s infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .stats-row {
          display: flex;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid #2a2a3a;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .stat-label {
          font-size: 0.6rem;
          color: #606070;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .stat-value {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stat-value.positive {
          color: #00ff88;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #2a2a3a;
        }

        .bond-potential {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .bond-icon {
          font-size: 0.9rem;
        }

        .buy-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .buy-button:hover {
          transform: translateX(3px);
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
        }

        .buy-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #0a0a0f;
          letter-spacing: 0.1em;
        }

        .buy-arrow {
          font-size: 1rem;
          color: #0a0a0f;
          transition: transform 0.2s ease;
        }

        .buy-button:hover .buy-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
}
