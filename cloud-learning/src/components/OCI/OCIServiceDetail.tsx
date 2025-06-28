import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Clock, Users, Award, Play } from 'lucide-react';
import type { OCIService } from '../../types/oci';

interface OCIServiceDetailProps {
  service: OCIService;
  onBack: () => void;
}

export const OCIServiceDetail: React.FC<OCIServiceDetailProps> = ({ service, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'tutorials'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'pricing', label: 'Pricing', icon: '💰' },
    { id: 'tutorials', label: 'Tutorials', icon: '🎓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{service.name}</h1>
                  <p className="text-gray-600">{service.category}</p>
                </div>
              </div>
            </div>
            
            {service.documentation && (
              <a
                href={service.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Documentation
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Service Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'features' | 'pricing' | 'tutorials')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <p className="text-gray-700">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Use Cases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.useCases.map((useCase, index) => (
                      <div key={index} className="bg-orange-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="h-4 w-4 text-orange-600" />
                          <span className="font-medium text-gray-900">{useCase}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Features</h3>
                {service.features.map((feature, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{feature}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                {service.pricing ? (
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Pricing Model</div>
                        <div className="font-semibold text-gray-900">{service.pricing.model}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Starting Price</div>
                        <div className="font-semibold text-orange-600 text-lg">{service.pricing.startingPrice}</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">Unit</div>
                        <div className="font-semibold text-gray-900">{service.pricing.unit}</div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> Use OCI's Always Free tier to get started with many services at no cost.
                        Visit the OCI pricing calculator for detailed cost estimates.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Pricing information not available. Please check OCI documentation.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tutorials' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Resources</h3>
                {service.tutorials && service.tutorials.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {service.tutorials.map((tutorial, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Play className="h-5 w-5 text-orange-600" />
                          <div>
                            <div className="font-medium text-gray-900">{tutorial}</div>
                            <div className="text-sm text-gray-600 flex items-center mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              Estimated time: 30-45 minutes
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Award className="h-6 w-6 text-orange-600" />
                        <h4 className="font-semibold text-gray-900">Getting Started Guide</h4>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">
                        Learn the basics of {service.name} with step-by-step instructions.
                      </p>
                      <button className="text-orange-600 text-sm font-medium hover:text-orange-700">
                        Start Learning →
                      </button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Play className="h-6 w-6 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Video Tutorials</h4>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">
                        Watch hands-on demonstrations and best practices.
                      </p>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        Watch Videos →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
