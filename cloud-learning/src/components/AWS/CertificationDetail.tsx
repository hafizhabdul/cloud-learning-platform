import React, { useState } from 'react';
import type { CertificationPath, PracticeTest } from '../../types/aws';
import { 
  Award, 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Calendar,
  DollarSign
} from 'lucide-react';

interface CertificationDetailProps {
  certification: CertificationPath;
  onStartPracticeTest: (testId: string) => void;
  onBack: () => void;
}

export const CertificationDetail: React.FC<CertificationDetailProps> = ({
  certification,
  onStartPracticeTest,
  onBack
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'modules' | 'practice-tests'>('overview');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Foundational': return 'bg-green-100 text-green-800';
      case 'Associate': return 'bg-blue-100 text-blue-800';
      case 'Professional': return 'bg-purple-100 text-purple-800';
      case 'Specialty': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const PracticeTestCard: React.FC<{ test: PracticeTest }> = ({ test }) => {
    const completedAttempts = test.attempts.filter(a => a.score !== undefined).length;
    const bestScore = test.attempts.reduce((max, attempt) => 
      Math.max(max, attempt.score || 0), 0
    );
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{test.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{test.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {test.questionsCount} questions
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {test.timeLimit} minutes
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                test.difficulty === 'Practice' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {test.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        {completedAttempts > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded">
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-900">{bestScore}%</div>
              <div className="text-xs text-gray-600">Best Score</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-900">{completedAttempts}</div>
              <div className="text-xs text-gray-600">Attempts</div>
            </div>
          </div>
        )}

        <button
          onClick={() => onStartPracticeTest(test.id)}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {completedAttempts > 0 ? 'Retake Test' : 'Start Practice Test'}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          ← Back to Certifications
        </button>
      </div>

      {/* Certification Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{certification.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(certification.level)}`}>
                    {certification.level}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{certification.examCode}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{certification.description}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{certification.examDetails.duration}</div>
            <div className="text-sm text-gray-600">Exam Duration</div>
          </div>
          <div className="text-center">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{certification.examDetails.questionsCount}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{certification.examDetails.passingScore}%</div>
            <div className="text-sm text-gray-600">Passing Score</div>
          </div>
          <div className="text-center">
            <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">{certification.examDetails.cost}</div>
            <div className="text-sm text-gray-600">Exam Cost</div>
          </div>
        </div>

        {/* Study Time & Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Estimated Study Time
            </h3>
            <p className="text-blue-800">{certification.estimatedStudyTime}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Available Languages</h3>
            <div className="flex flex-wrap gap-2">
              {certification.examDetails.languages.map((lang, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        {certification.prerequisites.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Prerequisites</h3>
            <ul className="space-y-1">
              {certification.prerequisites.map((prereq, index) => (
                <li key={index} className="text-yellow-700 text-sm">• {prereq}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'overview' as const, label: 'Overview', icon: Award },
              { id: 'modules' as const, label: 'Learning Modules', icon: BookOpen },
              { id: 'practice-tests' as const, label: 'Practice Tests', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Path Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  This certification validates your ability to effectively demonstrate knowledge of how to architect 
                  and deploy secure and robust applications on AWS technologies. It's ideal for individuals who 
                  perform a Solutions Architect role and have one or more years of hands-on experience designing 
                  available, cost-efficient, fault-tolerant, and scalable distributed systems on AWS.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-3">What You'll Learn</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-blue-800">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    Design resilient architectures
                  </li>
                  <li className="flex items-start gap-2 text-blue-800">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    Design high-performing architectures
                  </li>
                  <li className="flex items-start gap-2 text-blue-800">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    Design secure applications and architectures
                  </li>
                  <li className="flex items-start gap-2 text-blue-800">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    Design cost-optimized architectures
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-3">Study Resources</h4>
                <div className="space-y-3">
                  <a 
                    href="https://aws.amazon.com/certification/certified-solutions-architect-associate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-700 hover:text-green-900"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Official Certification Page
                  </a>
                  <a 
                    href="https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-700 hover:text-green-900"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Exam Guide (PDF)
                  </a>
                  <a 
                    href="https://aws.amazon.com/certification/certification-prep/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-700 hover:text-green-900"
                  >
                    <ExternalLink className="w-4 h-4" />
                    AWS Training and Certification
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Learning Modules Tab */}
          {selectedTab === 'modules' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Path Modules</h3>
                <p className="text-gray-600 mb-6">
                  Complete these modules to build the knowledge required for the {certification.name} certification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certification.modules.map((moduleId, index) => (
                  <div key={moduleId} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <h4 className="font-medium text-gray-900">Module {index + 1}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {moduleId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Status: Not Started</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                        Start Module
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Tests Tab */}
          {selectedTab === 'practice-tests' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Tests</h3>
                <p className="text-gray-600 mb-6">
                  Test your knowledge with practice exams that simulate the real certification exam experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certification.practiceTests.map((test) => (
                  <PracticeTestCard key={test.id} test={test} />
                ))}
              </div>

              {/* Progress Overview */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Progress
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {certification.practiceTests.reduce((total, test) => 
                        total + test.attempts.filter(a => a.score !== undefined).length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Tests Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(
                        certification.practiceTests.reduce((total, test) => {
                          const bestScore = test.attempts.reduce((max, attempt) => 
                            Math.max(max, attempt.score || 0), 0
                          );
                          return total + bestScore;
                        }, 0) / certification.practiceTests.length
                      )}%
                    </div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {certification.practiceTests.filter(test => 
                        test.attempts.some(a => (a.score || 0) >= certification.examDetails.passingScore)
                      ).length}
                    </div>
                    <div className="text-sm text-gray-600">Passing Scores</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
