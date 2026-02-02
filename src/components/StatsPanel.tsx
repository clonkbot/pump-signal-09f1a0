import { useEffect, useState } from 'react';

interface StatsPanelProps {
  totalSignals: number;
  highPotential: number;
  avgScore: number;
  activeNarratives: number;
}

export default function StatsPanel({
  totalSignals,
  highPotential,
  avgScore,
  activeNarratives
}: StatsPanelProps) {
  const [animatedStats, setAnimatedStats] = useState({
    totalSignals: 0,
    highPotential: 0,
    avgScore: 0,
    activeNarratives: 0
  });

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepTime = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        totalSignals: Math.round(totalSignals * eased),
        highPotential: Math.round(highPotential * eased),
        avgScore: Math.round(avgScore * eased),
        activeNarratives: Math.round(activeNarratives * eased)
      });

      if (step >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [totalSignals, highPotential, avgScore, activeNarratives]);

  const narratives = [
    { name: 'Pepe Revival', heat: 92 },
    { name: 'AI Agents', heat: 87 },
    { name: 'Dog Meta', heat: 74 },
    { name: 'Sigma Grindset', heat: 95 }
  ];

  const topDevs = [
    { address: '0x7f3a...8b2c', rate: 95, bonds: 12 },
    { address: '0x9a2b...4c1d', rate: 92, bonds: 9 },
    { address: '0x3c4d...7e8f', rate: 87, bonds: 7 }
  ];

  return (
    <div className="stats-panel">
      <div className="panel-section">
        <h3 className="panel-title">
          <span className="title-icon">◈</span>
          DASHBOARD
        </h3>

        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-value green">{animatedStats.totalSignals}</span>
            <span className="stat-label">Active Signals</span>
          </div>
          <div className="stat-box">
            <span className="stat-value pink">{animatedStats.highPotential}</span>
            <span className="stat-label">High Potential</span>
          </div>
          <div className="stat-box">
            <span className="stat-value cyan">{animatedStats.avgScore}</span>
            <span className="stat-label">Avg Score</span>
          </div>
          <div className="stat-box">
            <span className="stat-value yellow">{animatedStats.activeNarratives}</span>
            <span className="stat-label">Hot Narratives</span>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-title">
          <span className="title-icon">🔥</span>
          TRENDING NARRATIVES
        </h3>

        <div className="narratives-list">
          {narratives.map((narrative, i) => (
            <div key={narrative.name} className="narrative-item">
              <div className="narrative-rank">#{i + 1}</div>
              <div className="narrative-info">
                <span className="narrative-name">{narrative.name}</span>
                <div className="heat-bar">
                  <div
                    className="heat-fill"
                    style={{ width: `${narrative.heat}%` }}
                  />
                </div>
              </div>
              <span className="heat-value">{narrative.heat}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-title">
          <span className="title-icon">👑</span>
          TOP DEVS
        </h3>

        <div className="devs-list">
          {topDevs.map((dev, i) => (
            <div key={dev.address} className="dev-item">
              <div className="dev-rank">{i === 0 ? '👑' : `#${i + 1}`}</div>
              <div className="dev-info">
                <span className="dev-address">{dev.address}</span>
                <span className="dev-stats">
                  {dev.bonds} bonds · {dev.rate}% rate
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-section alert-section">
        <div className="alert-header">
          <span className="alert-icon">⚡</span>
          <span className="alert-title">SIGNAL DETECTED</span>
        </div>
        <p className="alert-text">
          New insider activity detected on $SIGMA. Multiple profitable wallets accumulating.
        </p>
      </div>

      <style>{`
        .stats-panel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .panel-section {
          background: linear-gradient(135deg, #12121a 0%, #1a1a25 100%);
          border: 1px solid #2a2a3a;
          border-radius: 12px;
          padding: 1rem;
        }

        .panel-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
        }

        .title-icon {
          font-size: 1rem;
          color: #00ff88;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          border: 1px solid #2a2a3a;
        }

        .stat-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
        }

        .stat-value.green {
          color: #00ff88;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .stat-value.pink {
          color: #ff00aa;
          text-shadow: 0 0 10px rgba(255, 0, 170, 0.5);
        }

        .stat-value.cyan {
          color: #00ffff;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .stat-value.yellow {
          color: #ffff00;
          text-shadow: 0 0 10px rgba(255, 255, 0, 0.5);
        }

        .stat-label {
          font-size: 0.6rem;
          color: #606070;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
        }

        .narratives-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .narrative-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
        }

        .narrative-rank {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #ff00aa;
          width: 24px;
        }

        .narrative-info {
          flex: 1;
          min-width: 0;
        }

        .narrative-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #e0e0e0;
          display: block;
          margin-bottom: 0.25rem;
        }

        .heat-bar {
          height: 4px;
          background: #2a2a3a;
          border-radius: 2px;
          overflow: hidden;
        }

        .heat-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff00aa 0%, #ff6600 100%);
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .heat-value {
          font-size: 0.7rem;
          font-weight: 700;
          color: #ff6600;
        }

        .devs-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .dev-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
        }

        .dev-rank {
          font-size: 0.9rem;
          width: 24px;
          text-align: center;
        }

        .dev-info {
          flex: 1;
          min-width: 0;
        }

        .dev-address {
          font-size: 0.75rem;
          font-weight: 600;
          color: #00ffff;
          display: block;
        }

        .dev-stats {
          font-size: 0.65rem;
          color: #606070;
        }

        .alert-section {
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%);
          border-color: #00ff88;
          animation: alert-pulse 2s infinite;
        }

        @keyframes alert-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(0, 255, 136, 0);
          }
          50% {
            box-shadow: 0 0 20px 0 rgba(0, 255, 136, 0.2);
          }
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .alert-icon {
          font-size: 1rem;
          animation: flash 1s infinite;
        }

        @keyframes flash {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .alert-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: #00ff88;
          letter-spacing: 0.1em;
        }

        .alert-text {
          font-size: 0.75rem;
          color: #e0e0e0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
