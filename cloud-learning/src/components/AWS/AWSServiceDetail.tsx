import React, { useState } from 'react';
import type { AWSService, AWSModule, AWSLesson } from '../../types/aws';
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  FileText,
  Code,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface AWSServiceDetailProps {
  service: AWSService;
  onBack: () => void;
  onStartQuiz: (moduleId: string) => void;
  onStartLab: (labId: string) => void;
}

export const AWSServiceDetail: React.FC<AWSServiceDetailProps> = ({
  service,
  onBack,
  onStartQuiz,
  onStartLab
}) => {
  const [selectedModule, setSelectedModule] = useState<AWSModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<AWSLesson | null>(null);

  const ModuleCard: React.FC<{ module: AWSModule }> = ({ module }) => {
    const completedLessons = module.lessons.filter(l => l.completed).length;
    const totalLessons = module.lessons.length;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{module.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{module.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{module.duration}</span>
            </div>
          </div>
          {module.completed && (
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">
              Progress: {completedLessons}/{totalLessons} lessons
            </span>
            <span className="text-xs text-gray-500">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Score if completed */}
        {module.score && (
          <div className="mb-3">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              module.score >= 80 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              Quiz Score: {module.score}%
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedModule(module)}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Lessons
          </button>
          <button
            onClick={() => onStartQuiz(module.id)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={progressPercentage < 100}
          >
            Take Quiz
          </button>
        </div>
      </div>
    );
  };

  const LessonCard: React.FC<{ lesson: AWSLesson }> = ({ lesson }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h5 className="font-medium text-gray-900">{lesson.title}</h5>
        {lesson.completed && (
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
        )}
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setSelectedLesson(lesson)}
          className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Read Content
        </button>
        {lesson.videoUrl && (
          <button className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
            <Play className="w-4 h-4" />
            Watch Video
          </button>
        )}
      </div>

      {/* Key Points Preview */}
      <div className="text-sm text-gray-600">
        <span className="font-medium">Key Points:</span>
        <ul className="list-disc list-inside mt-1 space-y-1">
          {lesson.keyPoints.slice(0, 2).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
          {lesson.keyPoints.length > 2 && (
            <li className="text-gray-500">+{lesson.keyPoints.length - 2} more...</li>
          )}
        </ul>
      </div>
    </div>
  );

  const LessonContent: React.FC<{ lesson: AWSLesson }> = ({ lesson }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
        <button
          onClick={() => setSelectedLesson(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="prose max-w-none">
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br>') }}
        />
      </div>

      {/* Code Examples */}
      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Code className="w-4 h-4" />
            Code Examples
          </h4>
          {lesson.codeExamples.map((example, index) => (
            <div key={index} className="mb-4">
              <div className="bg-gray-800 rounded-t-lg px-4 py-2">
                <span className="text-white text-sm font-medium">{example.title}</span>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-gray-600 mt-2">{example.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Key Points */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Key Points
        </h4>
        <ul className="space-y-2">
          {lesson.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors">
          Mark as Completed
        </button>
      </div>
    </div>
  );

  if (selectedLesson) {
    return <LessonContent lesson={selectedLesson} />;
  }

  if (selectedModule) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedModule(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedModule.title}</h3>
          <p className="text-gray-600 mb-4">{selectedModule.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {selectedModule.duration}
            </span>
            <span>{selectedModule.lessons.length} lessons</span>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Lessons</h4>
            {selectedModule.lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </button>
      </div>

      {/* Service Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                {service.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
                {service.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Use Cases</h4>
            <ul className="space-y-1">
              {service.useCases.map((useCase, index) => (
                <li key={index} className="text-gray-600 text-sm">• {useCase}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
            <div className="space-y-2">
              <a 
                href={service.documentation}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                Official Documentation
              </a>
              <a 
                href={service.pricing}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                Pricing Information
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Modules */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Learning Modules ({service.modules.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Practice Labs */}
      {service.labs.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Practice Labs ({service.labs.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.labs.map((lab) => (
              <div key={lab.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{lab.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{lab.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lab.duration}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        lab.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        lab.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lab.difficulty}
                      </span>
                    </div>
                  </div>
                  {lab.completed && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                  )}
                </div>

                <button
                  onClick={() => onStartLab(lab.id)}
                  className="w-full bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  {lab.completed ? 'Review Lab' : 'Start Lab'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
