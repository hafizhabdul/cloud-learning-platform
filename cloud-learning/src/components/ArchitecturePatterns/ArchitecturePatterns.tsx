import React, { useState } from 'react';
import { Building, Users, Zap, Shield, DollarSign, Clock, CheckCircle } from 'lucide-react';
import type { ArchitecturePattern, CaseStudy } from '../../types/architecture';
import { architecturePatterns, caseStudies } from '../../data/architecturePatterns';

const ArchitecturePatterns: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<ArchitecturePattern | null>(null);
  const [selectedCaseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [activeTab, setActiveTab] = useState<'patterns' | 'cases'>('patterns');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Architecture Patterns & Case Studies</h1>
        <p className="text-lg text-gray-600">
          Learn from real-world architecture patterns and explore detailed case studies from industry implementations.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('patterns')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'patterns'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Architecture Patterns
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'cases'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Case Studies
        </button>
      </div>

      {activeTab === 'patterns' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pattern List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Common Patterns</h2>
            <div className="space-y-4">
              {architecturePatterns.map((pattern) => (
                <div
                  key={pattern.id}
                  onClick={() => setSelectedPattern(pattern)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedPattern?.id === pattern.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{pattern.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(pattern.difficulty)}`}>
                      {pattern.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Building className="w-3 h-3 mr-1" />
                    {pattern.category}
                    <span className="mx-2">•</span>
                    <DollarSign className="w-3 h-3 mr-1" />
                    {pattern.estimatedCost}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern Details */}
          <div className="lg:col-span-2">
            {selectedPattern ? (
              <div className="bg-white border rounded-lg p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPattern.name}</h2>
                    <span className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(selectedPattern.difficulty)}`}>
                      {selectedPattern.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedPattern.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {selectedPattern.category}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {selectedPattern.estimatedCost}
                    </div>
                  </div>
                </div>

                {/* Components */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Architecture Components</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedPattern.components.map((component, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{component.name}</h4>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {component.service}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{component.purpose}</p>
                        <span className="text-xs text-gray-500">{component.tier} Tier</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits & Considerations */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedPattern.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-orange-600 mr-2" />
                      Considerations
                    </h3>
                    <ul className="space-y-2">
                      {selectedPattern.considerations.map((consideration, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{consideration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Use Cases */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Common Use Cases</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPattern.useCases.map((useCase, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AWS Services */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Required AWS Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPattern.awsServices.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Architecture Pattern</h3>
                <p className="text-gray-600">
                  Choose a pattern from the list to explore its components, benefits, and implementation details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'cases' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Case Study List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Real-World Cases</h2>
            <div className="space-y-4">
              {caseStudies.map((caseStudy) => (
                <div
                  key={caseStudy.id}
                  onClick={() => setCaseStudy(caseStudy)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedCaseStudy?.id === caseStudy.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{caseStudy.title}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                      {caseStudy.industry}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {caseStudy.scenario.substring(0, 120)}...
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Users className="w-3 h-3 mr-1" />
                    {caseStudy.proposedSolution.cloudProvider}
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    {caseStudy.migrationStrategy.length} phases
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Study Details */}
          <div className="lg:col-span-2">
            {selectedCaseStudy ? (
              <div className="bg-white border rounded-lg p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCaseStudy.title}</h2>
                    <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800">
                      {selectedCaseStudy.industry}
                    </span>
                  </div>
                  <div className="prose max-w-none text-gray-600">
                    {selectedCaseStudy.scenario.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Business Requirements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Business Requirements</h3>
                  <ul className="space-y-2">
                    {selectedCaseStudy.businessRequirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <Zap className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution Architecture */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Proposed Solution</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {selectedCaseStudy.proposedSolution.architecture} on {selectedCaseStudy.proposedSolution.cloudProvider}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedCaseStudy.proposedSolution.components.map((component, index) => (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-gray-900 text-sm">{component.component}</h5>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {component.service}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{component.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expected Benefits */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Expected Benefits</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {selectedCaseStudy.expectedBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Case Study</h3>
                <p className="text-gray-600">
                  Choose a case study to explore real-world implementation scenarios and solutions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitecturePatterns;
