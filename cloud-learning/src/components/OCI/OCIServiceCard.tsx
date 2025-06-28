import React from 'react';
import type { OCIService } from '../../types/oci';

interface OCIServiceCardProps {
  service: OCIService;
  onClick: (service: OCIService) => void;
}

const categoryColors = {
  compute: 'bg-blue-50 border-blue-200 text-blue-800',
  storage: 'bg-green-50 border-green-200 text-green-800',
  networking: 'bg-purple-50 border-purple-200 text-purple-800',
  database: 'bg-orange-50 border-orange-200 text-orange-800',
  analytics: 'bg-red-50 border-red-200 text-red-800',
  ai: 'bg-pink-50 border-pink-200 text-pink-800',
  security: 'bg-gray-50 border-gray-200 text-gray-800',
  management: 'bg-indigo-50 border-indigo-200 text-indigo-800'
};

export const OCIServiceCard: React.FC<OCIServiceCardProps> = ({ service, onClick }) => {
  const colorClass = categoryColors[service.category] || categoryColors.compute;

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={() => onClick(service)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{service.icon}</div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
            {service.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
        
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-xs text-gray-500">
                +{service.features.length - 3} more
              </span>
            )}
          </div>
          
          {service.pricing && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Starting from:</span>{' '}
                <span className="text-orange-600 font-semibold">
                  {service.pricing.startingPrice} {service.pricing.unit}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
