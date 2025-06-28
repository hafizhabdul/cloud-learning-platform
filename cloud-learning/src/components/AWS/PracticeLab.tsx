import React, { useState } from 'react';
import type { AWSLab } from '../../types/aws';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Terminal, 
  FileText, 
  Lightbulb,
  Copy,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface PracticeLabProps {
  lab: AWSLab;
  onComplete: () => void;
  onExit: () => void;
}

export const PracticeLab: React.FC<PracticeLabProps> = ({
  lab,
  onComplete,
  onExit
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [labStarted, setLabStarted] = useState(false);

  const currentStep = lab.steps[currentStepIndex];

  const startLab = () => {
    setLabStarted(true);
  };

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Lab Introduction Screen
  if (!labStarted) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onExit}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{lab.title}</h2>
          <p className="text-gray-600 text-lg">{lab.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{lab.duration}</div>
            <div className="text-sm text-gray-600">Estimated Time</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lab.difficulty)}`}>
              {lab.difficulty}
            </span>
            <div className="text-sm text-gray-600 mt-2">Difficulty Level</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{lab.steps.length} steps</div>
            <div className="text-sm text-gray-600">Total Steps</div>
          </div>
        </div>

        {/* Prerequisites */}
        {lab.prerequisites.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Prerequisites
            </h3>
            <ul className="space-y-2">
              {lab.prerequisites.map((prereq, index) => (
                <li key={index} className="text-yellow-700 text-sm flex items-start gap-2">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full flex-shrink-0 mt-2"></span>
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning Objectives */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Learning Objectives
          </h3>
          <ul className="space-y-2">
            {lab.objectives.map((objective, index) => (
              <li key={index} className="text-blue-700 text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                {objective}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        {lab.resources.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Lab Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lab.resources.map((resource, index) => (
                <div key={index} className="bg-white rounded border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{resource.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={onExit}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={startLab}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Start Lab
          </button>
        </div>
      </div>
    );
  }

  // Lab Interface
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Lab Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{lab.title}</h2>
            <p className="text-sm text-gray-600">
              Step {currentStepIndex + 1} of {lab.steps.length}: {currentStep.title}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {completedSteps.size}/{lab.steps.length} completed
            </span>
            <button
              onClick={onExit}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.size / lab.steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {lab.steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStepIndex(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                index === currentStepIndex
                  ? 'bg-blue-600 text-white'
                  : completedSteps.has(step.id)
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Instructions */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentStep.title}</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentStep.instruction}
              </p>
            </div>
          </div>

          {/* Command */}
          {currentStep.command && (
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Command
                </span>
                <button
                  onClick={() => copyToClipboard(currentStep.command!)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{currentStep.command}</code>
              </pre>
            </div>
          )}

          {/* Expected Output */}
          {currentStep.expectedOutput && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Expected Output:</h4>
              <pre className="text-green-700 text-sm overflow-x-auto whitespace-pre-wrap">
                {currentStep.expectedOutput}
              </pre>
            </div>
          )}

          {/* Tips */}
          {currentStep.tips && currentStep.tips.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Tips:
              </h4>
              <ul className="space-y-1">
                {currentStep.tips.map((tip, index) => (
                  <li key={index} className="text-blue-700 text-sm">• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => markStepComplete(currentStep.id)}
              disabled={completedSteps.has(currentStep.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                completedSteps.has(currentStep.id)
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {completedSteps.has(currentStep.id) ? (
                <>
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Completed
                </>
              ) : (
                'Mark Complete'
              )}
            </button>
            
            {currentStep.screenshot && (
              <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                View Screenshot
              </button>
            )}
          </div>
        </div>

        {/* Resources & Validation */}
        <div className="space-y-6">
          {/* Lab Resources for this step */}
          {lab.resources.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Resources
              </h4>
              <div className="space-y-3">
                {lab.resources.map((resource, index) => (
                  <div key={index} className="bg-white rounded border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">{resource.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                    <details className="text-xs">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        View Content
                      </summary>
                      <pre className="mt-2 bg-gray-100 p-2 rounded text-gray-800 overflow-x-auto">
                        {resource.content}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Validation Checklist */}
          {lab.validation.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Validation Checklist
              </h4>
              <ul className="space-y-2">
                {lab.validation.map((item, index) => (
                  <li key={index} className="text-blue-800 text-sm flex items-start gap-2">
                    <input 
                      type="checkbox" 
                      className="mt-0.5" 
                      id={`validation-${index}`}
                    />
                    <label htmlFor={`validation-${index}`} className="cursor-pointer">
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lab Progress */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Lab Progress</h4>
            <div className="space-y-2">
              {lab.steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    completedSteps.has(step.id)
                      ? 'bg-green-100 text-green-800'
                      : index === currentStepIndex
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {completedSteps.has(step.id) ? '✓' : index + 1}
                  </div>
                  <span className={`text-sm ${
                    completedSteps.has(step.id)
                      ? 'text-green-800 line-through'
                      : index === currentStepIndex
                      ? 'text-blue-800 font-medium'
                      : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Helpful Links
            </h4>
            <div className="space-y-2">
              <a 
                href="https://console.aws.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                AWS Management Console
              </a>
              <a 
                href="https://docs.aws.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                AWS Documentation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Step
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Progress: {Math.round((completedSteps.size / lab.steps.length) * 100)}%
            </span>
          </div>

          {currentStepIndex === lab.steps.length - 1 ? (
            <button
              onClick={onComplete}
              disabled={completedSteps.size < lab.steps.length}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Lab
            </button>
          ) : (
            <button
              onClick={() => setCurrentStepIndex(Math.min(lab.steps.length - 1, currentStepIndex + 1))}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
