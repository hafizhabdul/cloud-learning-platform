import React, { useState } from 'react';
import { Search, Filter, Cloud, Award, BookOpen, Zap } from 'lucide-react';
import { OCIServiceCard } from '../../components/OCI/OCIServiceCard';
import { OCIServiceDetail } from '../../components/OCI/OCIServiceDetail';
import { ociData } from '../../data/ociData';
import type { OCIService } from '../../types/oci';

export const OCI: React.FC = () => {
  const [selectedService, setSelectedService] = useState<OCIService | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<'services' | 'learning' | 'certifications' | 'labs'>('services');

  const categories = [
    { id: 'all', name: 'All Services', icon: '📋' },
    { id: 'compute', name: 'Compute', icon: '🖥️' },
    { id: 'storage', name: 'Storage', icon: '🗃️' },
    { id: 'networking', name: 'Networking', icon: '🌐' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'ai', name: 'AI & ML', icon: '🤖' },
    { id: 'security', name: 'Security', icon: '🛡️' },
    { id: 'management', name: 'Management', icon: '⚙️' }
  ];

  const filteredServices = ociData.services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedService) {
    return (
      <OCIServiceDetail
        service={selectedService}
        onBack={() => setSelectedService(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Cloud className="h-12 w-12 text-orange-600" />
              <h1 className="text-4xl font-bold text-gray-900">Oracle Cloud Infrastructure</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master Oracle's enterprise-grade cloud platform with comprehensive learning paths, 
              hands-on labs, and real-world practice scenarios.
            </p>
          </div>

          {/* Section Navigation */}
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
              {[
                { id: 'services', label: 'Services', icon: Cloud },
                { id: 'learning', label: 'Learning Paths', icon: BookOpen },
                { id: 'certifications', label: 'Certifications', icon: Award },
                { id: 'labs', label: 'Practice Labs', icon: Zap }
              ].map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as 'services' | 'learning' | 'certifications' | 'labs')}
                    className={`px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                      activeSection === section.id
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'services' && (
          <>
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search OCI services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <OCIServiceCard
                  key={service.id}
                  service={service}
                  onClick={setSelectedService}
                />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Cloud className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </>
        )}

        {activeSection === 'learning' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">OCI Learning Paths</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ociData.learningPaths.map(path => (
                <div key={path.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
                      <p className="text-gray-600 mt-1">{path.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      path.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      path.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {path.level}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {path.duration} • {path.lessons.length} lessons
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {path.services.slice(0, 3).map(serviceId => (
                        <span key={serviceId} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-md">
                          {ociData.services.find(s => s.id === serviceId)?.name || serviceId}
                        </span>
                      ))}
                      {path.services.length > 3 && (
                        <span className="text-xs text-gray-500">+{path.services.length - 3} more</span>
                      )}
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Start Learning Path
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'certifications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">OCI Certifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ociData.certifications.map(cert => (
                <div key={cert.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-600 mt-1">{cert.description}</p>
                    </div>
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Level:</span>
                        <span className="ml-2 font-medium capitalize">{cert.level}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-2 font-medium">{cert.examDetails.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Questions:</span>
                        <span className="ml-2 font-medium">{cert.examDetails.questions}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cost:</span>
                        <span className="ml-2 font-medium text-orange-600">{cert.examDetails.cost}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-2">Exam Domains:</h4>
                      <div className="space-y-1">
                        {cert.domains.slice(0, 3).map((domain, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-700">{domain.name}</span>
                            <span className="text-gray-500">{domain.weight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Start Preparation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'labs' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">OCI Practice Labs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ociData.practiceLabs.map(lab => (
                <div key={lab.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{lab.title}</h3>
                      <p className="text-gray-600 mt-1">{lab.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lab.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      lab.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lab.difficulty}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Zap className="h-4 w-4 mr-2" />
                      {lab.duration} • {lab.steps.length} steps
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Learning Objectives:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {lab.objectives.slice(0, 3).map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Start Lab
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
