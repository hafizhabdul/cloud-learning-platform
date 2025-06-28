import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  DollarSign, 
  Monitor, 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Star,
  Download,
  FileText
} from 'lucide-react';

interface Pillar {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  principles: string[];
}

interface Question {
  id: string;
  pillar: string;
  text: string;
  explanation: string;
  options: {
    id: string;
    text: string;
    score: number;
    recommendation?: string;
  }[];
}

interface Assessment {
  pillar: string;
  score: number;
  maxScore: number;
  recommendations: string[];
  risks: string[];
}

const WellArchitectedReview: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  // const [selectedPillar, setSelectedPillar] = useState<string>('all');

  const pillars: Pillar[] = [
    {
      id: 'operational-excellence',
      name: 'Operational Excellence',
      icon: Monitor,
      color: 'text-blue-600',
      description: 'The ability to support development and run workloads effectively, gain insight into their operations, and to continuously improve supporting processes and procedures.',
      principles: [
        'Perform operations as code',
        'Make frequent, small, reversible changes',
        'Refine operations procedures frequently',
        'Anticipate failure',
        'Learn from all operational failures'
      ]
    },
    {
      id: 'security',
      name: 'Security',
      icon: Shield,
      color: 'text-red-600',
      description: 'The ability to protect data, systems, and assets to take advantage of cloud technologies to improve your security.',
      principles: [
        'Implement a strong identity foundation',
        'Apply security at all layers',
        'Automate security best practices',
        'Protect data in transit and at rest',
        'Keep people away from data',
        'Prepare for security events'
      ]
    },
    {
      id: 'reliability',
      name: 'Reliability',
      icon: Globe,
      color: 'text-green-600',
      description: 'The ability of a workload to perform its intended function correctly and consistently when it\'s expected to.',
      principles: [
        'Automatically recover from failure',
        'Test recovery procedures',
        'Scale horizontally to increase aggregate workload availability',
        'Stop guessing capacity',
        'Manage change in automation'
      ]
    },
    {
      id: 'performance-efficiency',
      name: 'Performance Efficiency',
      icon: Zap,
      color: 'text-yellow-600',
      description: 'The ability to use computing resources efficiently to meet system requirements, and to maintain that efficiency as demand changes.',
      principles: [
        'Democratize advanced technologies',
        'Go global in minutes',
        'Use serverless architectures',
        'Experiment more often',
        'Consider mechanical sympathy'
      ]
    },
    {
      id: 'cost-optimization',
      name: 'Cost Optimization',
      icon: DollarSign,
      color: 'text-purple-600',
      description: 'The ability to run systems to deliver business value at the lowest price point.',
      principles: [
        'Implement cloud financial management',
        'Adopt a consumption model',
        'Measure overall efficiency',
        'Stop spending money on heavy lifting',
        'Analyze and attribute expenditure'
      ]
    }
  ];

  const questions: Question[] = [
    // Operational Excellence
    {
      id: 'ops-1',
      pillar: 'operational-excellence',
      text: 'How do you determine what your priorities are?',
      explanation: 'Everyone needs to understand their part in enabling business success. Have shared goals in order to set priorities for resources.',
      options: [
        { id: 'a', text: 'No formal process exists', score: 0, recommendation: 'Establish clear business objectives and communicate them to all stakeholders' },
        { id: 'b', text: 'Business objectives are defined but not well communicated', score: 1, recommendation: 'Improve communication of business objectives across teams' },
        { id: 'c', text: 'Clear business objectives with regular review', score: 2 },
        { id: 'd', text: 'Well-defined objectives with stakeholder alignment and regular updates', score: 3 }
      ]
    },
    {
      id: 'ops-2',
      pillar: 'operational-excellence',
      text: 'How do you structure your organization to support your business outcomes?',
      explanation: 'Your teams need to understand their part in achieving business outcomes.',
      options: [
        { id: 'a', text: 'No clear organizational structure', score: 0, recommendation: 'Define clear roles and responsibilities for team members' },
        { id: 'b', text: 'Basic structure but unclear responsibilities', score: 1, recommendation: 'Clarify team responsibilities and decision-making authority' },
        { id: 'c', text: 'Clear structure with defined roles', score: 2 },
        { id: 'd', text: 'Optimized structure with cross-functional teams and clear accountability', score: 3 }
      ]
    },
    // Security
    {
      id: 'sec-1',
      pillar: 'security',
      text: 'How do you securely operate your workload?',
      explanation: 'To operate your workload securely, you need to apply overarching best practices to every area of security.',
      options: [
        { id: 'a', text: 'No formal security practices', score: 0, recommendation: 'Implement basic security controls and policies' },
        { id: 'b', text: 'Basic security measures in place', score: 1, recommendation: 'Expand security controls and implement monitoring' },
        { id: 'c', text: 'Comprehensive security controls', score: 2 },
        { id: 'd', text: 'Advanced security with automation and continuous monitoring', score: 3 }
      ]
    },
    {
      id: 'sec-2',
      pillar: 'security',
      text: 'How do you manage identities for people and machines?',
      explanation: 'There are two types of identities you need to manage when approaching operating secure AWS workloads.',
      options: [
        { id: 'a', text: 'Basic IAM with shared credentials', score: 0, recommendation: 'Implement individual user accounts and eliminate shared credentials' },
        { id: 'b', text: 'Individual accounts but weak access controls', score: 1, recommendation: 'Implement least privilege access and MFA' },
        { id: 'c', text: 'Strong identity management with MFA', score: 2 },
        { id: 'd', text: 'Advanced identity management with automation and federation', score: 3 }
      ]
    },
    // Reliability
    {
      id: 'rel-1',
      pillar: 'reliability',
      text: 'How do you manage workload and component failure?',
      explanation: 'Workload failure can be caused by component failure, increased demand, or external dependencies.',
      options: [
        { id: 'a', text: 'No automated failure handling', score: 0, recommendation: 'Implement automated failure detection and recovery mechanisms' },
        { id: 'b', text: 'Basic monitoring with manual response', score: 1, recommendation: 'Add automated responses to common failure scenarios' },
        { id: 'c', text: 'Automated failure detection and response', score: 2 },
        { id: 'd', text: 'Advanced failure management with predictive capabilities', score: 3 }
      ]
    },
    {
      id: 'rel-2',
      pillar: 'reliability',
      text: 'How do you test reliability?',
      explanation: 'Testing is the only way to ensure that the workload will operate as designed, and deliver the resiliency you expect.',
      options: [
        { id: 'a', text: 'No formal testing process', score: 0, recommendation: 'Implement basic testing procedures for critical functions' },
        { id: 'b', text: 'Basic testing of main functionality', score: 1, recommendation: 'Add chaos engineering and disaster recovery testing' },
        { id: 'c', text: 'Comprehensive testing including failure scenarios', score: 2 },
        { id: 'd', text: 'Continuous testing with automated chaos engineering', score: 3 }
      ]
    },
    // Performance Efficiency
    {
      id: 'perf-1',
      pillar: 'performance-efficiency',
      text: 'How do you select the best performing architecture?',
      explanation: 'Often, multiple approaches are required for optimal performance across a workload.',
      options: [
        { id: 'a', text: 'No performance considerations in design', score: 0, recommendation: 'Conduct performance analysis and optimize architecture' },
        { id: 'b', text: 'Basic performance considerations', score: 1, recommendation: 'Implement performance monitoring and optimization' },
        { id: 'c', text: 'Performance-driven architecture decisions', score: 2 },
        { id: 'd', text: 'Continuous performance optimization with data-driven decisions', score: 3 }
      ]
    },
    {
      id: 'perf-2',
      pillar: 'performance-efficiency',
      text: 'How do you select and use compute resources?',
      explanation: 'The optimal compute choice for a workload varies based on application design, usage patterns, and configuration settings.',
      options: [
        { id: 'a', text: 'Default compute choices without analysis', score: 0, recommendation: 'Analyze workload requirements and right-size compute resources' },
        { id: 'b', text: 'Basic compute sizing based on estimates', score: 1, recommendation: 'Implement monitoring and optimize based on actual usage' },
        { id: 'c', text: 'Right-sized compute with regular optimization', score: 2 },
        { id: 'd', text: 'Dynamic compute optimization with automation', score: 3 }
      ]
    },
    // Cost Optimization
    {
      id: 'cost-1',
      pillar: 'cost-optimization',
      text: 'How do you implement cloud financial management?',
      explanation: 'Implementing Cloud Financial Management enables organizations to realize business value and financial success.',
      options: [
        { id: 'a', text: 'No cost tracking or management', score: 0, recommendation: 'Implement basic cost tracking and budgets' },
        { id: 'b', text: 'Basic cost monitoring', score: 1, recommendation: 'Add cost allocation tags and detailed analysis' },
        { id: 'c', text: 'Comprehensive cost management with budgets', score: 2 },
        { id: 'd', text: 'Advanced FinOps with automation and optimization', score: 3 }
      ]
    },
    {
      id: 'cost-2',
      pillar: 'cost-optimization',
      text: 'How do you govern usage?',
      explanation: 'Establish policies and mechanisms to ensure that appropriate costs are incurred while objectives are achieved.',
      options: [
        { id: 'a', text: 'No usage governance', score: 0, recommendation: 'Implement usage policies and controls' },
        { id: 'b', text: 'Basic usage controls', score: 1, recommendation: 'Add automated governance and compliance monitoring' },
        { id: 'c', text: 'Comprehensive usage governance', score: 2 },
        { id: 'd', text: 'Advanced governance with predictive controls', score: 3 }
      ]
    }
  ];

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateResults = () => {
    setShowResults(true);
  };

  const calculateAssessments = (): Assessment[] => {
    const assessments: Assessment[] = [];

    pillars.forEach(pillar => {
      const pillarQuestions = questions.filter(q => q.pillar === pillar.id);
      let totalScore = 0;
      let maxScore = 0;
      const recommendations: string[] = [];
      const risks: string[] = [];

      pillarQuestions.forEach(question => {
        const answerId = answers[question.id];
        if (answerId) {
          const selectedOption = question.options.find(opt => opt.id === answerId);
          if (selectedOption) {
            totalScore += selectedOption.score;
            if (selectedOption.score < 2 && selectedOption.recommendation) {
              recommendations.push(selectedOption.recommendation);
            }
            if (selectedOption.score === 0) {
              risks.push(`${question.text}: Critical gap identified`);
            }
          }
        }
        maxScore += 3; // Maximum score per question
      });

      assessments.push({
        pillar: pillar.id,
        score: totalScore,
        maxScore,
        recommendations,
        risks
      });
    });

    return assessments;
  };

  const filteredQuestions = questions;

  const currentQuestionData = filteredQuestions[currentQuestion];

  if (showResults) {
    const assessments = calculateAssessments();

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <Star className="w-8 h-8 mr-3 text-yellow-600" />
            Well-Architected Review Results
          </h1>
          <p className="text-lg text-gray-600">
            Your architecture assessment results across the five pillars.
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Assessment</h2>
          <div className="grid grid-cols-5 gap-4">
            {assessments.map(assessment => {
              const pillar = pillars.find(p => p.id === assessment.pillar)!;
              const percentage = (assessment.score / assessment.maxScore) * 100;
              const IconComponent = pillar.icon;

              return (
                <div key={assessment.pillar} className="text-center">
                  <div className="flex flex-col items-center mb-2">
                    <IconComponent className={`w-8 h-8 ${pillar.color} mb-1`} />
                    <span className="text-sm font-medium text-gray-900">{pillar.name}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                    <div
                      className={`h-3 rounded-full ${
                        percentage >= 80 ? 'bg-green-500' :
                        percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold">
                    {Math.round(percentage)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Results */}
        <div className="grid lg:grid-cols-2 gap-6">
          {assessments.map(assessment => {
            const pillar = pillars.find(p => p.id === assessment.pillar)!;
            const IconComponent = pillar.icon;
            const percentage = (assessment.score / assessment.maxScore) * 100;

            return (
              <div key={assessment.pillar} className="bg-white border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <IconComponent className={`w-6 h-6 ${pillar.color} mr-3`} />
                  <h3 className="text-lg font-semibold text-gray-900">{pillar.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Score</span>
                    <span className="text-sm font-bold">
                      {assessment.score} / {assessment.maxScore} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        percentage >= 80 ? 'bg-green-500' :
                        percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {assessment.risks.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      High Priority Risks
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {assessment.risks.slice(0, 3).map((risk, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {assessment.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Recommendations
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {assessment.recommendations.slice(0, 3).map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Items */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Next Steps
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Immediate Actions</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Address all high-priority risks identified</li>
                <li>• Implement security controls for critical gaps</li>
                <li>• Set up monitoring for reliability issues</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Long-term Improvements</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Develop automation for operational excellence</li>
                <li>• Optimize costs through right-sizing</li>
                <li>• Implement performance monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retake Assessment
          </button>
          <button
            onClick={() => {
              // Generate and download report
              const report = JSON.stringify({ assessments, timestamp: new Date() }, null, 2);
              const blob = new Blob([report], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'well-architected-review.json';
              a.click();
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Star className="w-8 h-8 mr-3 text-yellow-600" />
          AWS Well-Architected Review
        </h1>
        <p className="text-lg text-gray-600">
          Evaluate your architecture against AWS best practices across five pillars.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {filteredQuestions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(((currentQuestion + 1) / filteredQuestions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      {currentQuestionData && (
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            {(() => {
              const pillar = pillars.find(p => p.id === currentQuestionData.pillar)!;
              const IconComponent = pillar.icon;
              return (
                <>
                  <IconComponent className={`w-6 h-6 ${pillar.color} mr-3`} />
                  <span className="text-sm font-medium text-gray-600">{pillar.name}</span>
                </>
              );
            })()}
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {currentQuestionData.text}
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-700">{currentQuestionData.explanation}</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentQuestionData.options.map(option => (
              <label
                key={option.id}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                  answers[currentQuestionData.id] === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestionData.id}
                  value={option.id}
                  checked={answers[currentQuestionData.id] === option.id}
                  onChange={() => handleAnswer(currentQuestionData.id, option.id)}
                  className="mt-1 mr-3"
                />
                <span className="text-gray-900">{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={!currentQuestionData || !answers[currentQuestionData.id]}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === filteredQuestions.length - 1 ? 'Generate Results' : 'Next'}
        </button>
      </div>

      {/* Pillar Overview */}
      <div className="mt-12 bg-gray-50 border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Well-Architected Framework Pillars</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map(pillar => {
            const IconComponent = pillar.icon;
            return (
              <div key={pillar.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <IconComponent className={`w-5 h-5 ${pillar.color} mr-2`} />
                  <h4 className="font-semibold text-gray-900">{pillar.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{pillar.description}</p>
                <div className="text-xs text-gray-500">
                  {questions.filter(q => q.pillar === pillar.id).length} questions
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WellArchitectedReview;
