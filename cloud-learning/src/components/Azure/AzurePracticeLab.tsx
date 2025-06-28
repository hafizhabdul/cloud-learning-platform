import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Play, Clock, BookOpen, ExternalLink } from 'lucide-react';
import type { AzureLab } from '../../types/azure';

interface AzurePracticeLabProps {
  lab: AzureLab;
  onComplete: () => void;
  onExit: () => void;
}

export const AzurePracticeLab: React.FC<AzurePracticeLabProps> = ({
  lab,
  onComplete,
  onExit
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const currentStep = lab.steps[currentStepIndex];

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < lab.steps.length - 1) {
      setCurrentStepIndex(stepIndex + 1);
    } else {
      // All steps completed
      onComplete();
    }
  };

  const handleStepSelect = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  };

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

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <button
          onClick={onExit}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Service</span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{lab.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{lab.description}</p>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lab.difficulty)}`}>
                {lab.difficulty}
              </span>
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{lab.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Play className="w-4 h-4" />
                <span className="text-sm">{lab.steps.length} steps</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {Math.round((completedSteps.size / lab.steps.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.size / lab.steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Lab Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lab Overview</h3>
            
            {/* Prerequisites */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Prerequisites:</h4>
              <ul className="space-y-1">
                {lab.prerequisites.map((prereq, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectives */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Learning Objectives:</h4>
              <ul className="space-y-1">
                {lab.objectives.map((objective, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            {lab.resources.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Resources:</h4>
                <div className="space-y-2">
                  {lab.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-900">{resource.name}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Steps Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lab Steps</h3>
            <div className="space-y-2">
              {lab.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(index)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    currentStepIndex === index
                      ? 'border-blue-500 bg-blue-50'
                      : completedSteps.has(index)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      completedSteps.has(index)
                        ? 'bg-green-500 text-white'
                        : currentStepIndex === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {completedSteps.has(index) ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm ${
                      currentStepIndex === index
                        ? 'text-blue-900 font-medium'
                        : completedSteps.has(index)
                        ? 'text-green-900'
                        : 'text-gray-700'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Current Step */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
                <p className="text-gray-600">{currentStep.description}</p>
              </div>
              <div className="text-sm text-gray-500">
                Step {currentStepIndex + 1} of {lab.steps.length}
              </div>
            </div>

            {/* Step Instructions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
              <ol className="space-y-4">
                {currentStep.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Code Example */}
            {currentStep.code && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Example</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{currentStep.code}</code>
                </pre>
              </div>
            )}

            {/* Expected Result */}
            {currentStep.expectedResult && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expected Result</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800">{currentStep.expectedResult}</p>
                </div>
              </div>
            )}

            {/* Hints */}
            {currentStep.hints && currentStep.hints.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hints</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {currentStep.hints.map((hint, index) => (
                      <li key={index} className="text-yellow-800 flex items-start space-x-2">
                        <span className="text-yellow-600">💡</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Validation */}
            {currentStep.validation && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">{currentStep.validation}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => currentStepIndex > 0 && setCurrentStepIndex(currentStepIndex - 1)}
                disabled={currentStepIndex === 0}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Previous Step
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleStepComplete(currentStepIndex)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  {completedSteps.has(currentStepIndex) ? 'Step Completed ✓' : 'Mark as Complete'}
                </button>

                {currentStepIndex < lab.steps.length - 1 && (
                  <button
                    onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
