import React, { useState } from 'react';
import { ArrowLeft, Award, Clock, BookOpen, Play, CheckCircle, Target } from 'lucide-react';
import type { AzureCertificationPath } from '../../types/azure';

interface AzureCertificationDetailProps {
  certification: AzureCertificationPath;
  onStartPracticeTest: (testId: string) => void;
  onBack: () => void;
}

export const AzureCertificationDetail: React.FC<AzureCertificationDetailProps> = ({
  certification,
  onStartPracticeTest,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'study-guide' | 'practice-tests'>('overview');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Fundamentals':
        return 'bg-green-100 text-green-800';
      case 'Associate':
        return 'bg-blue-100 text-blue-800';
      case 'Expert':
        return 'bg-purple-100 text-purple-800';
      case 'Specialty':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalWeight = () => {
    return certification.studyGuide.reduce((total, section) => total + section.weight, 0);
  };

  const getAverageScore = () => {
    const attempts = certification.practiceTests.flatMap(test => test.attempts);
    if (attempts.length === 0) return 0;
    return Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length);
  };

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
            <span>Back to Certifications</span>
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{certification.name}</h1>
                <p className="text-gray-600 text-lg mb-3">{certification.description}</p>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(certification.level)}`}>
                    {certification.level}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{certification.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 mb-1">{getAverageScore()}%</div>
              <div className="text-sm text-gray-600">Avg. Practice Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Exam Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{certification.examDetails.code}</div>
              <div className="text-sm text-gray-600">Exam Code</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{certification.examDetails.duration}min</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{certification.examDetails.questionCount}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{certification.examDetails.passingScore}%</div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cost: {certification.examDetails.cost}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Languages:</span>
                <span className="text-sm text-gray-900">{certification.examDetails.languages.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview' as const, label: 'Overview', icon: BookOpen },
              { id: 'study-guide' as const, label: 'Study Guide', icon: Target },
              { id: 'practice-tests' as const, label: `Practice Tests (${certification.practiceTests.length})`, icon: Play }
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
                <ul className="space-y-2 mb-8">
                  {certification.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Skills Measured</h3>
                <ul className="space-y-2">
                  {certification.skills.map((skill, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Experience</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <p className="text-blue-800">{certification.recommendedExperience}</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Progress</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {certification.practiceTests.reduce((sum, test) => sum + test.attempts.length, 0)}
                    </div>
                    <div className="text-sm text-green-700">Practice Attempts</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{getAverageScore()}%</div>
                    <div className="text-sm text-blue-700">Average Score</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Study Guide Tab */}
          {activeTab === 'study-guide' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Areas</h3>
                <p className="text-gray-600 text-sm">
                  The exam measures your ability to accomplish the technical tasks listed below. The percentages indicate the relative weight of each major topic area on the exam.
                </p>
              </div>

              {certification.studyGuide.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{section.title}</h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                          {section.weight}%
                        </span>
                        <span className="text-sm text-gray-600">of exam content</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{section.weight}%</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Topics Covered:</h4>
                    <ul className="space-y-1">
                      {section.topics.map((topic, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {section.resources.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Resources:</h4>
                      <div className="space-y-2">
                        {section.resources.map((resource, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">{resource}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Total Coverage:</span>
                  <span className="text-lg font-bold text-blue-600">{getTotalWeight()}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Practice Tests Tab */}
          {activeTab === 'practice-tests' && (
            <div className="space-y-6">
              {certification.practiceTests.length === 0 ? (
                <div className="text-center py-12">
                  <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Practice Tests Available</h3>
                  <p className="text-gray-600">Practice tests for this certification are coming soon.</p>
                </div>
              ) : (
                certification.practiceTests.map((test) => (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{test.name}</h3>
                        <p className="text-gray-600 mb-3">{test.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{test.timeLimit} minutes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>{test.questionCount} questions</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            test.difficulty === 'Practice' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {test.difficulty}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onStartPracticeTest(test.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Start Test
                      </button>
                    </div>

                    {/* Test History */}
                    {test.attempts.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Recent Attempts:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {test.attempts.slice(-3).map((attempt) => (
                            <div key={attempt.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600">
                                  {new Date(attempt.date).toLocaleDateString()}
                                </span>
                                <span className={`text-sm font-medium ${
                                  attempt.score >= certification.examDetails.passingScore
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}>
                                  {attempt.score}%
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Time: {Math.floor(attempt.timeSpent / 60)}:{(attempt.timeSpent % 60).toString().padStart(2, '0')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
