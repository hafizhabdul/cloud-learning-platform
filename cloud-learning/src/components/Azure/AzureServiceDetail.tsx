import React, { useState } from 'react';
import { ArrowLeft, Clock, BookOpen, Play, CheckCircle, Award, ExternalLink } from 'lucide-react';
import type { AzureService } from '../../types/azure';

interface AzureServiceDetailProps {
  service: AzureService;
  onBack: () => void;
  onStartQuiz: (moduleId: string) => void;
  onStartLab: (labId: string) => void;
}

export const AzureServiceDetail: React.FC<AzureServiceDetailProps> = ({
  service,
  onBack,
  onStartQuiz,
  onStartLab
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'labs'>('overview');

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

  const completedModules = service.modules.filter(m => m.completed).length;
  const totalModules = service.modules.length;
  const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                <p className="text-gray-600 text-lg mb-3">{service.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {service.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(service.difficulty)}`}>
                    {service.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 mb-1">{Math.round(progress)}%</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">              {[
                { id: 'overview' as const, label: 'Overview', icon: BookOpen },
                { id: 'modules' as const, label: `Modules (${service.modules.length})`, icon: Play },
                { id: 'labs' as const, label: `Labs (${service.labs.length})`, icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Use Cases</h3>
                <ul className="space-y-2">
                  {service.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{useCase}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Learning Path</h3>
                <div className="space-y-3">
                  {service.modules.map((module, index) => (
                    <div key={module.id} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        module.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={module.completed ? 'text-green-600' : 'text-gray-700'}>
                        {module.title}
                      </span>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{module.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
                <div className="space-y-3">
                  <a
                    href={service.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Official Documentation</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>

                  <a
                    href={service.pricing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-5 h-5 text-green-600">$</span>
                      <span className="font-medium text-gray-900">Pricing Information</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{completedModules}/{totalModules}</div>
                    <div className="text-sm text-blue-700">Modules Completed</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {service.labs.filter(l => l.completed).length}/{service.labs.length}
                    </div>
                    <div className="text-sm text-green-700">Labs Completed</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              {service.modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-3">{module.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{module.lessons.length} lessons</span>
                        </div>
                        {module.score && (
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4" />
                            <span>Score: {module.score}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {module.completed && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      <button
                        onClick={() => onStartQuiz(module.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        {module.completed ? 'Retake Quiz' : 'Start Quiz'}
                      </button>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Lessons:</h4>
                    {module.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center space-x-3 text-sm">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{lesson.title}</span>
                        <span className="text-gray-500">({lesson.duration})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Labs Tab */}
          {activeTab === 'labs' && (
            <div className="space-y-6">
              {service.labs.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Labs Available</h3>
                  <p className="text-gray-600">Labs for this service are coming soon.</p>
                </div>
              ) : (
                service.labs.map((lab) => (
                  <div key={lab.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{lab.title}</h3>
                        <p className="text-gray-600 mb-3">{lab.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{lab.estimatedTime}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lab.difficulty)}`}>
                            {lab.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {lab.completed && (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        )}
                        <button
                          onClick={() => onStartLab(lab.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          {lab.completed ? 'Review Lab' : 'Start Lab'}
                        </button>
                      </div>
                    </div>

                    {/* Objectives */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Objectives:</h4>
                      <ul className="space-y-1">
                        {lab.objectives.map((objective, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-700">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
