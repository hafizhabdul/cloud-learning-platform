import React, { useState } from 'react';
import { gcpServices, gcpCertificationPaths } from '../../data/gcpData';
import { GCPServiceCard } from '../../components/GCP/GCPServiceCard';
import { 
  Cloud, 
  Award, 
  BookOpen,
  Play,
  TrendingUp,
  Target,
  Users
} from 'lucide-react';

const GCP: React.FC = () => {
  const [view, setView] = useState<'services' | 'certifications'>('services');

  // For now, just show the main view since we haven't implemented all detail components
  // This can be expanded later with detailed components similar to AWS and Azure

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
                  <Award className="w-8 h-8 text-red-600" />
                  Google Cloud Certifications
                </h1>
                <p className="text-gray-600 mt-2">
                  Prepare for Google Cloud certifications with comprehensive study materials and practice tests
                </p>
              </div>
              <button
                onClick={() => setView('services')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
                <Award className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{gcpCertificationPaths.length}</div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {gcpCertificationPaths.reduce((sum, cert) => sum + cert.practiceTests.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Practice Tests</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">78%</div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">8k+</div>
                  <div className="text-sm text-gray-600">Learners</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {gcpCertificationPaths.map((certification) => (
              <div key={certification.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{certification.name}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          certification.level === 'User' ? 'bg-green-100 text-green-800' :
                          certification.level === 'Associate' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
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
                      <Award className="w-4 h-4 text-gray-500" />
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
                          className="inline-block px-2 py-1 bg-red-50 text-red-700 text-xs rounded"
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
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Coming Soon
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
                <Cloud className="w-8 h-8 text-red-600" />
                Google Cloud Platform Learning Hub
              </h1>
              <p className="text-gray-600 mt-2">
                Master Google Cloud services with hands-on labs, quizzes, and certification preparation
              </p>
            </div>
            <button
              onClick={() => setView('certifications')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
              <BookOpen className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{gcpServices.length}</div>
                <div className="text-sm text-gray-600">GCP Services</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Play className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {gcpServices.reduce((sum, service) => sum + service.modules.length, 0)}
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
                  {gcpServices.reduce((sum, service) => sum + service.labs.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Hands-on Labs</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{gcpCertificationPaths.length}</div>
                <div className="text-sm text-gray-600">Certifications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gcpServices.map((service) => (
            <GCPServiceCard
              key={service.id}
              service={service}
              onSelect={() => {
                // For now, just show alert. Can be implemented later with detailed components
                alert(`${service.name} detailed view coming soon!`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GCP;
