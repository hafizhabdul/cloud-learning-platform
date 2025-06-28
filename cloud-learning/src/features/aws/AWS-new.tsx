import React, { useState } from 'react';
import { awsServices, certificationPaths } from '../../data/awsData';
import { AWSServiceCard } from '../../components/AWS/AWSServiceCard';
import { AWSServiceDetail } from '../../components/AWS/AWSServiceDetail';
import { QuizComponent } from '../../components/AWS/QuizComponent';
import { PracticeLab } from '../../components/AWS/PracticeLab';
import { CertificationDetail } from '../../components/AWS/CertificationDetail';
import type { AWSService, Quiz, QuizAttempt, AWSLab, CertificationPath, PracticeTest } from '../../types/aws';
import { 
  Cloud, 
  Award, 
  BookOpen,
  Play,
  TrendingUp,
  Target,
  Users,
  CheckCircle
} from 'lucide-react';

const AWS: React.FC = () => {
  const [view, setView] = useState<'services' | 'service-detail' | 'quiz' | 'lab' | 'certifications' | 'certification-detail' | 'practice-test'>('services');
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedLab, setSelectedLab] = useState<AWSLab | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<CertificationPath | null>(null);
  const [selectedPracticeTest, setSelectedPracticeTest] = useState<PracticeTest | null>(null);

  const handleServiceSelect = (service: AWSService) => {
    setSelectedService(service);
    setView('service-detail');
  };

  const handleStartQuiz = (moduleId: string) => {
    if (selectedService) {
      const module = selectedService.modules.find(m => m.id === moduleId);
      if (module) {
        setSelectedQuiz(module.quiz);
        setView('quiz');
      }
    }
  };

  const handleStartLab = (labId: string) => {
    if (selectedService) {
      const lab = selectedService.labs.find(l => l.id === labId);
      if (lab) {
        setSelectedLab(lab);
        setView('lab');
      }
    }
  };

  const handleQuizComplete = (attempt: QuizAttempt) => {
    // In a real app, this would save to a backend
    console.log('Quiz completed:', attempt);
    // Update module score
    if (selectedService && selectedQuiz) {
      const module = selectedService.modules.find(m => m.quiz.id === selectedQuiz.id);
      if (module) {
        module.score = attempt.score;
        module.completed = (attempt.score || 0) >= selectedQuiz.passingScore;
      }
    }
  };

  const handleLabComplete = () => {
    // In a real app, this would save to a backend
    console.log('Lab completed');
    if (selectedLab) {
      selectedLab.completed = true;
    }
    setView('service-detail');
  };

  const handleCertificationSelect = (certification: CertificationPath) => {
    setSelectedCertification(certification);
    setView('certification-detail');
  };

  const handleStartPracticeTest = (testId: string) => {
    if (selectedCertification) {
      const test = selectedCertification.practiceTests.find(t => t.id === testId);
      if (test) {
        setSelectedPracticeTest(test);
        setView('practice-test');
      }
    }
  };

  const handleBackToServices = () => {
    setView('services');
    setSelectedService(null);
    setSelectedQuiz(null);
    setSelectedLab(null);
  };

  const handleBackToCertifications = () => {
    setView('certifications');
    setSelectedCertification(null);
    setSelectedPracticeTest(null);
  };

  // Quiz View
  if (view === 'quiz' && selectedQuiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <QuizComponent
          quiz={selectedQuiz}
          onComplete={handleQuizComplete}
          onExit={() => setView('service-detail')}
        />
      </div>
    );
  }

  // Lab View
  if (view === 'lab' && selectedLab) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <PracticeLab
          lab={selectedLab}
          onComplete={handleLabComplete}
          onExit={() => setView('service-detail')}
        />
      </div>
    );
  }

  // Practice Test View
  if (view === 'practice-test' && selectedPracticeTest) {
    const practiceTestQuiz: Quiz = {
      id: selectedPracticeTest.id,
      title: selectedPracticeTest.name,
      description: selectedPracticeTest.description,
      timeLimit: selectedPracticeTest.timeLimit,
      passingScore: selectedCertification?.examDetails.passingScore || 70,
      questions: selectedPracticeTest.questions,
      attempts: selectedPracticeTest.attempts
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <QuizComponent
          quiz={practiceTestQuiz}
          onComplete={(attempt) => {
            selectedPracticeTest.attempts.push(attempt);
            setView('certification-detail');
          }}
          onExit={() => setView('certification-detail')}
        />
      </div>
    );
  }

  // Service Detail View
  if (view === 'service-detail' && selectedService) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <AWSServiceDetail
          service={selectedService}
          onBack={handleBackToServices}
          onStartQuiz={handleStartQuiz}
          onStartLab={handleStartLab}
        />
      </div>
    );
  }

  // Certification Detail View
  if (view === 'certification-detail' && selectedCertification) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <CertificationDetail
          certification={selectedCertification}
          onStartPracticeTest={handleStartPracticeTest}
          onBack={handleBackToCertifications}
        />
      </div>
    );
  }

  // Certifications View
  if (view === 'certifications') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-600" />
                  AWS Certifications
                </h1>
                <p className="text-gray-600 mt-2">
                  Prepare for AWS certifications with comprehensive study materials and practice tests
                </p>
              </div>
              <button
                onClick={() => setView('services')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{certificationPaths.length}</div>
              <div className="text-sm text-gray-600">Available Paths</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {certificationPaths.reduce((total: number, cert: CertificationPath) => total + cert.practiceTests.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Practice Tests</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {certificationPaths.reduce((total: number, cert: CertificationPath) =>
                  total + cert.practiceTests.reduce((testTotal: number, test: PracticeTest) =>
                    testTotal + test.attempts.filter((a: QuizAttempt) => a.score !== undefined).length, 0
                  ), 0
                )}
              </div>
              <div className="text-sm text-gray-600">Tests Completed</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(
                  certificationPaths.reduce((total: number, cert: CertificationPath) => {
                    const scores = cert.practiceTests.flatMap((test: PracticeTest) => 
                      test.attempts.map((a: QuizAttempt) => a.score || 0).filter((s: number) => s > 0)
                    );
                    return total + (scores.length > 0 ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length : 0);
                  }, 0) / certificationPaths.length
                )}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
          </div>

          {/* Certification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationPaths.map((certification: CertificationPath) => {
              const completedTests = certification.practiceTests.filter((test: PracticeTest) => 
                test.attempts.some((a: QuizAttempt) => a.score !== undefined)
              ).length;
              const totalTests = certification.practiceTests.length;
              const avgScore = certification.practiceTests.reduce((total: number, test: PracticeTest) => {
                const scores = test.attempts.map((a: QuizAttempt) => a.score || 0).filter((s: number) => s > 0);
                return total + (scores.length > 0 ? Math.max(...scores) : 0);
              }, 0) / totalTests;

              const getLevelColor = (level: string) => {
                switch (level) {
                  case 'Foundational': return 'bg-green-100 text-green-800';
                  case 'Associate': return 'bg-blue-100 text-blue-800';
                  case 'Professional': return 'bg-purple-100 text-purple-800';
                  case 'Specialty': return 'bg-orange-100 text-orange-800';
                  default: return 'bg-gray-100 text-gray-800';
                }
              };

              return (
                <div 
                  key={certification.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCertificationSelect(certification)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(certification.level)}`}>
                      {certification.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{certification.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{certification.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Practice Tests</span>
                      <span className="font-medium">{completedTests}/{totalTests}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${totalTests > 0 ? (completedTests / totalTests) * 100 : 0}%` }}
                      ></div>
                    </div>

                    {avgScore > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Best Average</span>
                        <span className={`font-medium ${
                          avgScore >= certification.examDetails.passingScore 
                            ? 'text-green-600' 
                            : 'text-orange-600'
                        }`}>
                          {Math.round(avgScore)}%
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{certification.examCode}</span>
                        <span className="text-sm text-gray-500">{certification.examDetails.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Main Services View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Cloud className="w-8 h-8 text-blue-600" />
                AWS Learning Hub
              </h1>
              <p className="text-gray-600 mt-2">
                Master AWS services with interactive learning modules, hands-on labs, and practice quizzes
              </p>
            </div>
            <button
              onClick={() => setView('certifications')}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              Certifications
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{awsServices.length}</div>
            <div className="text-sm text-gray-600">AWS Services</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Play className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {awsServices.reduce((total: number, service: AWSService) => total + service.modules.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Learning Modules</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {awsServices.reduce((total: number, service: AWSService) => total + service.labs.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Practice Labs</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {awsServices.reduce((total: number, service: AWSService) => 
                total + service.modules.filter(m => m.completed).length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">Completed Modules</div>
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">AWS Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awsServices.map((service: AWSService) => (
              <AWSServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AWS;
