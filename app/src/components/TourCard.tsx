import React from 'react';
import { Tour } from '../types';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
  onSelect?: (tour: Tour) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onSelect }) => {
  const getBadgeColor = (type: Tour['tourType']) => {
    switch (type) {
      case 'desert':
        return 'bg-palette-terracotta text-white';
      case 'extended':
        return 'bg-palette-navy text-white';
      case 'day-trip':
        return 'bg-palette-green text-white';
      default:
        return 'bg-palette-dark text-white';
    }
  };

  const getLabel = (type: Tour['tourType']) => {
    switch (type) {
      case 'desert':
        return 'Desert Trip';
      case 'extended':
        return 'Extended Tour';
      case 'day-trip':
        return 'Day Trip';
      default:
        return 'Custom Tour';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(tour);
    } else {
      const el = document.getElementById('quote-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#quote-form';
      }
    }
  };

  return (
    <div className="group bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Wrap */}
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm ${getBadgeColor(tour.tourType)}`}>
            {getLabel(tour.tourType)}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm bg-black/60 text-white backdrop-blur-sm flex items-center space-x-1">
            <Clock className="w-3 h-3 inline mr-1" />
            {tour.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-serif text-palette-dark leading-snug group-hover:text-palette-terracotta transition-colors mb-2">
            <a href={tour.link} onClick={handleClick}>
              {tour.title}
            </a>
          </h3>

          {/* Destinations */}
          {tour.destinations && tour.destinations.length > 0 && (
            <div className="flex items-start space-x-1.5 text-xs text-palette-dark/70 mb-3">
              <MapPin className="w-3.5 h-3.5 text-palette-terracotta flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-relaxed font-light">
                {tour.destinations.join(' • ')}
              </span>
            </div>
          )}

          <p className="text-xs text-palette-dark/75 line-clamp-3 leading-relaxed font-light mb-4">
            {tour.description}
          </p>
        </div>

        {/* Action button */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-palette-dark/60 font-light italic">
              Private &amp; Customizable
            </span>
            {tour.price ? (
              <span className="text-xs font-bold text-palette-terracotta">
                From ${tour.price} <span className="text-[10px] font-normal text-palette-dark/60">USD</span>
              </span>
            ) : tour.priceEstimate ? (
              <span className="text-xs font-bold text-palette-terracotta">
                {tour.priceEstimate}
              </span>
            ) : null}
          </div>
          <a
            href={tour.link}
            onClick={handleClick}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold tracking-wider uppercase text-palette-terracotta group-hover:text-palette-navy transition-colors"
          >
            <span>Get Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
