import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface FilterState {
  search: string;
  departureCities: string[];
  destinations: string[];
  lengths: string[];
  types: string[];
}

interface TourFinderFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const TourFinderFilter: React.FC<TourFinderFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const toggleArrayItem = (key: keyof FilterState, value: string) => {
    const list = (filters[key] as string[]) || [];
    const nextList = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
    onChange({
      ...filters,
      [key]: nextList
    });
  };

  const departureOptions = ['Marrakech', 'Casablanca', 'Fes', 'Tangier'];
  const destinationOptions = [
    'Sahara Desert',
    'Chefchaouen',
    'Marrakech',
    'Fes',
    'Atlas Mountains',
    'Essaouira',
    'Rabat'
  ];
  const lengthOptions = [
    { label: 'Day Trips', value: '1' },
    { label: '3 - 4 Days', value: 'short' },
    { label: '7 - 8 Days', value: 'medium' },
    { label: '10 - 12 Days', value: 'long' },
    { label: '14+ Days', value: 'grand' }
  ];
  const typeOptions = [
    { label: 'Desert Trips', value: 'desert' },
    { label: 'Extended Tours', value: 'extended' },
    { label: 'Day Trips', value: 'day-trip' }
  ];

  const hasActiveFilters =
    filters.search ||
    filters.departureCities.length > 0 ||
    filters.destinations.length > 0 ||
    filters.lengths.length > 0 ||
    filters.types.length > 0;

  return (
    <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm space-y-7">
      {/* Search Header */}
      <div>
        <h2 className="text-xl font-serif text-palette-dark mb-3">Search Tours</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search tours..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-palette-navy focus:ring-1 focus:ring-palette-navy"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h2 className="text-lg font-serif uppercase tracking-wider text-palette-dark">
          Filter Tours
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-palette-terracotta hover:underline flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Tour Type */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-palette-dark/80 mb-3">
          Tour Type
        </h5>
        <div className="space-y-2">
          {typeOptions.map((opt) => (
            <label key={opt.value} className="flex items-center space-x-2.5 text-xs text-palette-dark/80 cursor-pointer hover:text-palette-dark">
              <input
                type="checkbox"
                checked={filters.types.includes(opt.value)}
                onChange={() => toggleArrayItem('types', opt.value)}
                className="w-4 h-4 text-palette-navy rounded border-gray-300 focus:ring-palette-navy"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Departure City */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-palette-dark/80 mb-3">
          By Departure City
        </h5>
        <div className="space-y-2">
          {departureOptions.map((city) => (
            <label key={city} className="flex items-center space-x-2.5 text-xs text-palette-dark/80 cursor-pointer hover:text-palette-dark">
              <input
                type="checkbox"
                checked={filters.departureCities.includes(city)}
                onChange={() => toggleArrayItem('departureCities', city)}
                className="w-4 h-4 text-palette-navy rounded border-gray-300 focus:ring-palette-navy"
              />
              <span>{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Destinations */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-palette-dark/80 mb-3">
          Destinations
        </h5>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {destinationOptions.map((dest) => (
            <label key={dest} className="flex items-center space-x-2.5 text-xs text-palette-dark/80 cursor-pointer hover:text-palette-dark">
              <input
                type="checkbox"
                checked={filters.destinations.includes(dest)}
                onChange={() => toggleArrayItem('destinations', dest)}
                className="w-4 h-4 text-palette-navy rounded border-gray-300 focus:ring-palette-navy"
              />
              <span>{dest}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tour Length */}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider text-palette-dark/80 mb-3">
          Tour Length
        </h5>
        <div className="space-y-2">
          {lengthOptions.map((len) => (
            <label key={len.value} className="flex items-center space-x-2.5 text-xs text-palette-dark/80 cursor-pointer hover:text-palette-dark">
              <input
                type="checkbox"
                checked={filters.lengths.includes(len.value)}
                onChange={() => toggleArrayItem('lengths', len.value)}
                className="w-4 h-4 text-palette-navy rounded border-gray-300 focus:ring-palette-navy"
              />
              <span>{len.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Result Count Summary */}
      <div className="pt-2 border-t border-gray-100 text-xs text-palette-dark/60 font-light">
        Found {totalResults} tour{totalResults === 1 ? '' : 's'} matching criteria
      </div>
    </div>
  );
};
