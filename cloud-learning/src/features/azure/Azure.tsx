import React, { useState } from 'react';
import { azureServices, azureCertificationPaths } from '../../data/azureData';
import { AzureServiceCard } from '../../components/Azure/AzureServiceCard';
import { AzureServiceDetail } from '../../components/Azure/AzureServiceDetail';
import { AzureQuizComponent } from '../../components/Azure/AzureQuizComponent';
import { AzurePracticeLab } from '../../components/Azure/AzurePracticeLab';
import { AzureCertificationDetail } from '../../components/Azure/AzureCertificationDetail';
import type { AzureService, AzureQuiz, AzureQuizAttempt, AzureLab, AzureCertificationPath, AzurePracticeTest } from '../../types/azure';
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

const Azure: React.FC = () => {
  const [view, setView] = useState<'services' | 'service-detail' | 'quiz' | 'lab' | 'certifications' | 'certification-detail' | 'practice-test'>('services');
  const [selectedService, setSelectedService] = useState<AzureService | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<AzureQuiz | null>(null);
  const [selectedLab, setSelectedLab] = useState<AzureLab | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<AzureCertificationPath | null>(null);
  const [selectedPracticeTest, setSelectedPracticeTest] = useState<AzurePracticeTest | null>(null);

  const handleServiceSelect = (service: AzureService) => {
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

  const handleQuizComplete = (attempt: AzureQuizAttempt) => {
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

  const handleCertificationSelect = (certification: AzureCertificationPath) => {
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
        <AzureQuizComponent
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
        <AzurePracticeLab
          lab={selectedLab}
          onComplete={handleLabComplete}
          onExit={() => setView('service-detail')}
        />
      </div>
    );
  }

  // Practice Test View
  if (view === 'practice-test' && selectedPracticeTest) {
    const practiceTestQuiz: AzureQuiz = {
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
        <AzureQuizComponent
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
        <AzureServiceDetail
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
        <AzureCertificationDetail
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
                  <Award className="w-8 h-8 text-blue-600" />
                  Azure Certifications
                </h1>
                <p className="text-gray-600 mt-2">
                  Prepare for Microsoft Azure certifications with comprehensive study materials and practice tests
                </p>
              </div>
              <button
                onClick={() => setView('services')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{azureCertificationPaths.length}</div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {azureCertificationPaths.reduce((sum, cert) => sum + cert.practiceTests.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Practice Tests</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">85%</div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">12k+</div>
                  <div className="text-sm text-gray-600">Learners</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {azureCertificationPaths.map((certification) => (
              <div key={certification.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{certification.name}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          certification.level === 'Fundamentals' ? 'bg-green-100 text-green-800' :
                          certification.level === 'Associate' ? 'bg-blue-100 text-blue-800' :
                          certification.level === 'Expert' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {certification.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {certification.description}
                  </p>

                  {/* Exam Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{certification.examDetails.code}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{certification.practiceTests.length} Tests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{certification.examDetails.passingScore}% Pass</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{certification.duration}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {certification.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {certification.skills.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{certification.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCertificationSelect(certification)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            ))}
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
                Microsoft Azure Learning Hub
              </h1>
              <p className="text-gray-600 mt-2">
                Master Azure services with hands-on labs, quizzes, and certification preparation
              </p>
            </div>
            <button
              onClick={() => setView('certifications')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>View Certifications</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{azureServices.length}</div>
                <div className="text-sm text-gray-600">Azure Services</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Play className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {azureServices.reduce((sum, service) => sum + service.modules.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Learning Modules</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {azureServices.reduce((sum, service) => sum + service.labs.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Hands-on Labs</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{azureCertificationPaths.length}</div>
                <div className="text-sm text-gray-600">Certifications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {azureServices.map((service) => (
            <AzureServiceCard
              key={service.id}
              service={service}
              onSelect={handleServiceSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Azure;
