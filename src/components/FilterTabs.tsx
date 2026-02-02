type FilterType = 'all' | 'insider' | 'bundler' | 'highbond';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { id: FilterType; label: string; icon: string }[] = [
  { id: 'all', label: 'ALL', icon: '◎' },
  { id: 'insider', label: 'INSIDER', icon: '👁' },
  { id: 'bundler', label: 'BUNDLER', icon: '⬡' },
  { id: 'highbond', label: 'HIGH BOND', icon: '◈' }
];

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="filter-tabs">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
        >
          <span className="filter-icon">{filter.icon}</span>
          <span className="filter-label">{filter.label}</span>
        </button>
      ))}

      <style>{`
        .filter-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid #2a2a3a;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'JetBrains Mono', monospace;
        }

        .filter-tab:hover {
          border-color: #606070;
          background: rgba(255, 255, 255, 0.02);
        }

        .filter-tab.active {
          border-color: #00ff88;
          background: rgba(0, 255, 136, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.15);
        }

        .filter-icon {
          font-size: 0.8rem;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .filter-tab.active .filter-icon {
          opacity: 1;
          color: #00ff88;
        }

        .filter-label {
          font-size: 0.65rem;
          font-weight: 600;
          color: #606070;
          letter-spacing: 0.1em;
          transition: color 0.2s ease;
        }

        .filter-tab.active .filter-label {
          color: #00ff88;
        }

        @media (max-width: 640px) {
          .filter-tabs {
            width: 100%;
          }

          .filter-tab {
            flex: 1;
            justify-content: center;
            min-width: fit-content;
          }
        }
      `}</style>
    </div>
  );
}
