import React from 'react';
import { Clock, BookOpen, Award, ArrowRight } from 'lucide-react';
import type { AzureService } from '../../types/azure';

interface AzureServiceCardProps {
  service: AzureService;
  onSelect: (service: AzureService) => void;
}

export const AzureServiceCard: React.FC<AzureServiceCardProps> = ({ service, onSelect }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Compute':
        return 'bg-blue-100 text-blue-800';
      case 'Storage':
        return 'bg-purple-100 text-purple-800';
      case 'Networking':
        return 'bg-green-100 text-green-800';
      case 'Database':
        return 'bg-orange-100 text-orange-800';
      case 'AI/ML':
        return 'bg-pink-100 text-pink-800';
      case 'Security':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const completedModules = service.modules.filter(m => m.completed).length;
  const totalModules = service.modules.length;
  const completedLabs = service.labs.filter(l => l.completed).length;
  const totalLabs = service.labs.length;
  const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                {service.category}
              </span>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
            {service.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Use Cases */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Common Use Cases:</h4>
          <div className="flex flex-wrap gap-1">
            {service.useCases.slice(0, 3).map((useCase, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {useCase}
              </span>
            ))}
            {service.useCases.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{service.useCases.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {completedModules}/{totalModules} Modules
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {completedLabs}/{totalLabs} Labs
            </span>
          </div>
        </div>

        {/* Total Duration */}
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Est. {service.modules.reduce((total, module) => {
              const duration = parseInt(module.duration);
              return total + (isNaN(duration) ? 0 : duration);
            }, 0)} minutes
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(service)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Start Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
