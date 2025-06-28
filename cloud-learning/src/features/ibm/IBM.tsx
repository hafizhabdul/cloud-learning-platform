import React, { useState } from 'react';
import { Search, Filter, Cloud, Award, BookOpen, Zap, Brain } from 'lucide-react';
import { ibmData } from '../../data/ibmData';

export const IBM: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<'services' | 'learning' | 'certifications' | 'labs'>('services');

  const categories = [
    { id: 'all', name: 'All Services', icon: '📋' },
    { id: 'compute', name: 'Compute', icon: '🖥️' },
    { id: 'ai', name: 'Watson AI', icon: '🧠' },
    { id: 'database', name: 'Database', icon: '🗄️' },
    { id: 'integration', name: 'Integration', icon: '🔄' },
    { id: 'devops', name: 'DevOps', icon: '🚀' },
    { id: 'security', name: 'Security', icon: '🛡️' }
  ];

  const filteredServices = ibmData.services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Brain className="h-12 w-12 text-blue-200" />
              <h1 className="text-4xl font-bold">IBM Cloud</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Enterprise-grade cloud platform with industry-leading AI, data analytics, 
              and hybrid cloud capabilities powered by Red Hat OpenShift.
            </p>
          </div>

          {/* Section Navigation */}
          <div className="flex justify-center mt-8">
            <div className="bg-blue-700 rounded-lg p-1 flex space-x-1">
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
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-blue-100 hover:text-white'
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
                    placeholder="Search IBM Cloud services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <div key={service.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{service.icon}</div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 border border-blue-200 text-blue-800">
                      {service.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {service.pricing && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Starting from:</span>{' '}
                          <span className="text-blue-600 font-semibold">
                            {service.pricing.startingPrice} {service.pricing.unit}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === 'learning' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">IBM Cloud Learning Paths</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ibmData.learningPaths.map(path => (
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
                    
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">IBM Cloud Certifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ibmData.certifications.map(cert => (
                <div key={cert.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-600 mt-1">{cert.description}</p>
                    </div>
                    <Award className="h-6 w-6 text-blue-600" />
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
                        <span className="ml-2 font-medium text-blue-600">{cert.examDetails.cost}</span>
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">IBM Cloud Practice Labs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ibmData.practiceLabs.map(lab => (
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
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
