import { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Target, 
  Star,
  ExternalLink,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';

const certifications = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect - Associate',
    provider: 'AWS',
    level: 'Associate',
    status: 'in-progress',
    progress: 65,
    estimatedTime: '2 months',
    examCode: 'SAA-C03',
    cost: '$150',
    validFor: '3 years',
    nextExamDate: '2024-03-15',
    description: 'Demonstrates knowledge of designing distributed systems on AWS',
    prerequisites: ['AWS Certified Cloud Practitioner (Recommended)'],
    skills: [
      'Design resilient architectures',
      'Design high-performing architectures', 
      'Design secure applications',
      'Design cost-optimized architectures'
    ],
    studyMaterials: [
      { type: 'Course', name: 'AWS Solutions Architect Learning Path', progress: 70 },
      { type: 'Practice', name: 'AWS Labs & Exercises', progress: 45 },
      { type: 'Mock Exams', name: 'Practice Tests', progress: 80 }
    ],
    color: 'from-yellow-400 to-orange-500',
    providerColor: 'text-aws-500'
  },
  {
    id: 2,
    name: 'Microsoft Azure Fundamentals',
    provider: 'Azure',
    level: 'Fundamentals',
    status: 'completed',
    progress: 100,
    estimatedTime: 'Completed',
    examCode: 'AZ-900',
    cost: '$99',
    validFor: 'No expiration',
    completedDate: '2024-01-10',
    score: 87,
    description: 'Demonstrates foundational knowledge of cloud services and Microsoft Azure',
    prerequisites: ['None'],
    skills: [
      'Cloud concepts',
      'Azure services',
      'Security and compliance',
      'Azure pricing and support'
    ],
    studyMaterials: [
      { type: 'Course', name: 'Azure Fundamentals Path', progress: 100 },
      { type: 'Practice', name: 'Azure Free Account Labs', progress: 100 },
      { type: 'Mock Exams', name: 'Practice Tests', progress: 100 }
    ],
    color: 'from-blue-400 to-blue-600',
    providerColor: 'text-azure-500'
  },
  {
    id: 3,
    name: 'Google Cloud Associate Cloud Engineer',
    provider: 'GCP',
    level: 'Associate',
    status: 'not-started',
    progress: 0,
    estimatedTime: '3 months',
    examCode: 'ACE',
    cost: '$125',
    validFor: '2 years',
    description: 'Demonstrates skills to deploy applications, monitor operations, and manage enterprise solutions',
    prerequisites: ['Google Cloud Digital Leader (Recommended)'],
    skills: [
      'Setting up cloud solutions environment',
      'Planning and configuring cloud solutions',
      'Deploying and implementing cloud solutions',
      'Ensuring successful operation'
    ],
    studyMaterials: [
      { type: 'Course', name: 'GCP Associate Engineer Path', progress: 0 },
      { type: 'Practice', name: 'Qwiklabs Exercises', progress: 0 },
      { type: 'Mock Exams', name: 'Practice Tests', progress: 0 }
    ],
    color: 'from-purple-400 to-purple-600',
    providerColor: 'text-gcp-500'
  },
  {
    id: 4,
    name: 'AWS Certified DevOps Engineer - Professional',
    provider: 'AWS',
    level: 'Professional',
    status: 'not-started',
    progress: 0,
    estimatedTime: '4 months',
    examCode: 'DOP-C02',
    cost: '$300',
    validFor: '3 years',
    description: 'Validates technical expertise in provisioning, operating, and managing distributed application systems on AWS',
    prerequisites: ['AWS Certified SysOps Administrator or AWS Certified Developer'],
    skills: [
      'SDLC automation',
      'Configuration management and Infrastructure as Code',
      'Monitoring and logging',
      'Policies and standards automation'
    ],
    studyMaterials: [
      { type: 'Course', name: 'AWS DevOps Professional Path', progress: 0 },
      { type: 'Practice', name: 'Advanced AWS Labs', progress: 0 },
      { type: 'Mock Exams', name: 'Professional Practice Tests', progress: 0 }
    ],
    color: 'from-red-400 to-red-600',
    providerColor: 'text-aws-500'
  }
];

const filters = {
  provider: ['All', 'AWS', 'Azure', 'GCP'],
  level: ['All', 'Fundamentals', 'Associate', 'Professional', 'Expert'],
  status: ['All', 'not-started', 'in-progress', 'completed']
};

export default function Certifications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProvider = selectedProvider === 'All' || cert.provider === selectedProvider;
    const matchesLevel = selectedLevel === 'All' || cert.level === selectedLevel;
    const matchesStatus = selectedStatus === 'All' || cert.status === selectedStatus;

    return matchesSearch && matchesProvider && matchesLevel && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      default: return status;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Fundamentals': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Associate': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Professional': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Certifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your certification journey across cloud platforms
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredCertifications.filter(c => c.status === 'completed').length} completed • {' '}
            {filteredCertifications.filter(c => c.status === 'in-progress').length} in progress
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Provider Filter */}
          <div>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filters.provider.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filters.level.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filters.status.map(status => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : getStatusText(status)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertifications.map((cert) => (
          <div key={cert.id} className="card p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {cert.name}
                  </h3>
                  {cert.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {cert.description}
                </p>
              </div>
              <div className="ml-4">
                <span className={`text-lg font-bold ${cert.providerColor}`}>
                  {cert.provider}
                </span>
              </div>
            </div>

            {/* Status and Level */}
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(cert.status)}`}>
                {getStatusText(cert.status)}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(cert.level)}`}>
                {cert.level}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {cert.examCode}
              </span>
            </div>

            {/* Progress (if in progress) */}
            {cert.status === 'in-progress' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-gray-900 dark:text-white font-medium">{cert.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${cert.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${cert.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Completed info */}
            {cert.status === 'completed' && cert.completedDate && cert.score && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Completed: {new Date(cert.completedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      Score: {cert.score}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Study Materials */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Study Materials
              </h4>
              <div className="space-y-2">
                {cert.studyMaterials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{material.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full"
                          style={{ width: `${material.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-500 w-10">
                        {material.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{cert.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>{cert.cost}</span>
              </div>
              {cert.nextExamDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Next: {new Date(cert.nextExamDate).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>Valid: {cert.validFor}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>View Study Plan</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button className="text-gray-600 hover:text-gray-700 text-sm flex items-center space-x-1">
                  <ExternalLink className="w-4 h-4" />
                  <span>Exam Details</span>
                </button>
                {cert.status === 'not-started' ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Start Learning
                  </button>
                ) : cert.status === 'in-progress' ? (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Continue
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    View Certificate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCertifications.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No certifications found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
}
