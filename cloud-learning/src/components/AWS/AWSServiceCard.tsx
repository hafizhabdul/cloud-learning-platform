import React from 'react';
import type { AWSService } from '../../types/aws';
import { ChevronRight, BookOpen, Users, Award } from 'lucide-react';

interface AWSServiceCardProps {
  service: AWSService;
  onSelect: (service: AWSService) => void;
}

export const AWSServiceCard: React.FC<AWSServiceCardProps> = ({ service, onSelect }) => {
  const completedModules = service.modules.filter(m => m.completed).length;
  const totalModules = service.modules.length;
  const completedLabs = service.labs.filter(l => l.completed).length;
  const totalLabs = service.labs.length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => onSelect(service)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <span className="text-blue-600 text-xl">☁️</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.category}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
            {service.difficulty}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

        <div className="space-y-3">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Progress</span>
              <span className="text-xs text-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="w-4 h-4 text-gray-500 mb-1" />
              <span className="text-xs text-gray-600">{completedModules}/{totalModules}</span>
              <span className="text-xs text-gray-500">Modules</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-4 h-4 text-gray-500 mb-1" />
              <span className="text-xs text-gray-600">{completedLabs}/{totalLabs}</span>
              <span className="text-xs text-gray-500">Labs</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-4 h-4 text-gray-500 mb-1" />
              <span className="text-xs text-gray-600">{service.modules.filter(m => m.score && m.score >= 80).length}</span>
              <span className="text-xs text-gray-500">Passed</span>
            </div>
          </div>

          {/* Use Cases */}
          <div className="flex flex-wrap gap-1">
            {service.useCases.slice(0, 2).map((useCase, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {useCase}
              </span>
            ))}
            {service.useCases.length > 2 && (
              <span className="text-gray-500 text-xs">+{service.useCases.length - 2} more</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">View Details</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
