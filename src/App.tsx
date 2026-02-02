import { useState, useEffect } from 'react';
import './styles.css';
import SignalCard from './components/SignalCard';
import RadarPulse from './components/RadarPulse';
import Ticker from './components/Ticker';
import FilterTabs from './components/FilterTabs';
import StatsPanel from './components/StatsPanel';

export interface Signal {
  id: string;
  token: string;
  ticker: string;
  score: number;
  insiderBuys: number;
  profitableWallets: number;
  narrative: string;
  bundlerActivity: boolean;
  devBondRate: number;
  bondPotential: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: Date;
  priceChange: number;
  marketCap: string;
}

const mockSignals: Signal[] = [
  {
    id: '1',
    token: '0x7f3a...8b2c',
    ticker: '$PEPE2',
    score: 94,
    insiderBuys: 12,
    profitableWallets: 8,
    narrative: 'Pepe Revival',
    bundlerActivity: true,
    devBondRate: 87,
    bondPotential: 'HIGH',
    timestamp: new Date(Date.now() - 120000),
    priceChange: 234.5,
    marketCap: '$1.2M'
  },
  {
    id: '2',
    token: '0x9a2b...4c1d',
    ticker: '$WOJAK',
    score: 88,
    insiderBuys: 9,
    profitableWallets: 6,
    narrative: 'Wojak Meta',
    bundlerActivity: true,
    devBondRate: 92,
    bondPotential: 'HIGH',
    timestamp: new Date(Date.now() - 300000),
    priceChange: 156.2,
    marketCap: '$890K'
  },
  {
    id: '3',
    token: '0x3c4d...7e8f',
    ticker: '$GROK',
    score: 82,
    insiderBuys: 7,
    profitableWallets: 5,
    narrative: 'AI Agents',
    bundlerActivity: false,
    devBondRate: 78,
    bondPotential: 'MEDIUM',
    timestamp: new Date(Date.now() - 600000),
    priceChange: 89.3,
    marketCap: '$2.1M'
  },
  {
    id: '4',
    token: '0x5e6f...9a0b',
    ticker: '$BONK2',
    score: 79,
    insiderBuys: 5,
    profitableWallets: 4,
    narrative: 'Dog Meta',
    bundlerActivity: true,
    devBondRate: 65,
    bondPotential: 'MEDIUM',
    timestamp: new Date(Date.now() - 900000),
    priceChange: 45.7,
    marketCap: '$450K'
  },
  {
    id: '5',
    token: '0x1a2b...3c4d',
    ticker: '$SIGMA',
    score: 91,
    insiderBuys: 15,
    profitableWallets: 11,
    narrative: 'Sigma Grindset',
    bundlerActivity: true,
    devBondRate: 95,
    bondPotential: 'HIGH',
    timestamp: new Date(Date.now() - 180000),
    priceChange: 312.8,
    marketCap: '$3.4M'
  },
  {
    id: '6',
    token: '0x8d9e...f0a1',
    ticker: '$FROG',
    score: 71,
    insiderBuys: 4,
    profitableWallets: 3,
    narrative: 'Frog Season',
    bundlerActivity: false,
    devBondRate: 58,
    bondPotential: 'LOW',
    timestamp: new Date(Date.now() - 1200000),
    priceChange: 23.1,
    marketCap: '$180K'
  }
];

type FilterType = 'all' | 'insider' | 'bundler' | 'highbond';

function App() {
  const [signals, setSignals] = useState<Signal[]>(mockSignals);
  const [filter, setFilter] = useState<FilterType>('all');
  const [scanlineOffset, setScanlineOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlineOffset(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const filteredSignals = signals.filter(signal => {
    if (filter === 'all') return true;
    if (filter === 'insider') return signal.insiderBuys >= 7;
    if (filter === 'bundler') return signal.bundlerActivity;
    if (filter === 'highbond') return signal.bondPotential === 'HIGH';
    return true;
  });

  const highSignals = signals.filter(s => s.bondPotential === 'HIGH').length;
  const avgScore = Math.round(signals.reduce((a, b) => a + b.score, 0) / signals.length);

  return (
    <div className="app">
      <div className="scanlines" style={{ backgroundPositionY: `${scanlineOffset}px` }} />
      <div className="noise-overlay" />

      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <span className="logo-icon">◈</span>
            <h1 className="logo">
              <span className="logo-pump">PUMP</span>
              <span className="logo-signal">SIGNAL</span>
            </h1>
          </div>
          <span className="version">v2.4.7</span>
        </div>

        <div className="header-center">
          <RadarPulse signalCount={highSignals} />
        </div>

        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot" />
            <span className="status-text">LIVE</span>
          </div>
          <div className="network-badge">SOLANA</div>
        </div>
      </header>

      <Ticker signals={signals} />

      <main className="main">
        <aside className="sidebar">
          <StatsPanel
            totalSignals={signals.length}
            highPotential={highSignals}
            avgScore={avgScore}
            activeNarratives={4}
          />
        </aside>

        <section className="signals-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon">⬡</span>
              ACTIVE SIGNALS
              <span className="signal-count">{filteredSignals.length}</span>
            </h2>
            <FilterTabs activeFilter={filter} onFilterChange={setFilter} />
          </div>

          <div className="signals-grid">
            {filteredSignals.map((signal, index) => (
              <SignalCard key={signal.id} signal={signal} index={index} />
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span className="footer-text">Requested by @NXTunseen · Built by @clonkbot</span>
      </footer>
    </div>
  );
}

export default App;
