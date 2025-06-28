import React, { useState } from 'react';
import { 
  Move, 
  Server, 
  Database, 
  Network, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Download,
  Target,
  Shield
} from 'lucide-react';

interface Application {
  id: string;
  name: string;
  type: 'web-app' | 'database' | 'file-server' | 'analytics' | 'legacy' | 'microservice';
  criticality: 'high' | 'medium' | 'low';
  dependencies: string[];
  currentInfrastructure: {
    servers: number;
    storage: string;
    database: string;
    network: string;
  };
  estimatedEffort: number; // in weeks
  estimatedCost: number; // monthly cost after migration
}

interface MigrationStrategy {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  timeframe: string;
  complexity: 'low' | 'medium' | 'high';
  icon: React.ComponentType<{ className?: string }>;
}

interface MigrationPlan {
  phases: {
    name: string;
    applications: string[];
    duration: number;
    dependencies: string[];
    risks: string[];
  }[];
  totalDuration: number;
  totalCost: number;
  riskAssessment: {
    high: number;
    medium: number;
    low: number;
  };
}

const MigrationPlanner: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('rehost');
  const [showPlan, setShowPlan] = useState<boolean>(false);
  const [newApp, setNewApp] = useState<Partial<Application>>({
    name: '',
    type: 'web-app',
    criticality: 'medium',
    dependencies: [],
    currentInfrastructure: {
      servers: 1,
      storage: '',
      database: '',
      network: ''
    },
    estimatedEffort: 4,
    estimatedCost: 500
  });

  const migrationStrategies: Record<string, MigrationStrategy> = {
    rehost: {
      name: 'Rehost (Lift and Shift)',
      description: 'Move applications as-is to the cloud with minimal changes',
      pros: ['Quick migration', 'Low risk', 'Minimal application changes'],
      cons: ['Limited cloud benefits', 'Higher ongoing costs', 'Technical debt remains'],
      timeframe: '3-6 months',
      complexity: 'low',
      icon: Move
    },
    replatform: {
      name: 'Replatform (Lift, Tinker, and Shift)',
      description: 'Make targeted cloud optimizations without changing core architecture',
      pros: ['Some cloud benefits', 'Moderate effort', 'Performance improvements'],
      cons: ['Partial optimization', 'Some application changes needed'],
      timeframe: '6-12 months',
      complexity: 'medium',
      icon: Target
    },
    refactor: {
      name: 'Refactor (Re-architect)',
      description: 'Redesign applications to be cloud-native',
      pros: ['Maximum cloud benefits', 'Best performance', 'Modern architecture'],
      cons: ['High effort', 'Higher risk', 'Significant changes required'],
      timeframe: '12-24 months',
      complexity: 'high',
      icon: Server
    },
    repurchase: {
      name: 'Repurchase (Drop and Shop)',
      description: 'Move to a different product, typically SaaS',
      pros: ['No maintenance', 'Quick implementation', 'Latest features'],
      cons: ['Data migration complexity', 'Vendor lock-in', 'Feature limitations'],
      timeframe: '2-6 months',
      complexity: 'medium',
      icon: Database
    },
    retain: {
      name: 'Retain (Revisit)',
      description: 'Keep applications on-premises for now',
      pros: ['No migration effort', 'Keep current setup', 'Defer costs'],
      cons: ['No cloud benefits', 'Technical debt grows', 'Future migration harder'],
      timeframe: 'N/A',
      complexity: 'low',
      icon: Shield
    },
    retire: {
      name: 'Retire',
      description: 'Decommission applications that are no longer needed',
      pros: ['Cost savings', 'Reduced complexity', 'Security improvement'],
      cons: ['Potential data loss', 'User impact', 'Compliance considerations'],
      timeframe: '1-3 months',
      complexity: 'low',
      icon: Clock
    }
  };

  const addApplication = () => {
    if (!newApp.name) return;

    const app: Application = {
      id: Date.now().toString(),
      name: newApp.name,
      type: newApp.type as Application['type'],
      criticality: newApp.criticality as Application['criticality'],
      dependencies: newApp.dependencies || [],
      currentInfrastructure: newApp.currentInfrastructure!,
      estimatedEffort: newApp.estimatedEffort || 4,
      estimatedCost: newApp.estimatedCost || 500
    };

    setApplications(prev => [...prev, app]);
    setNewApp({
      name: '',
      type: 'web-app',
      criticality: 'medium',
      dependencies: [],
      currentInfrastructure: {
        servers: 1,
        storage: '',
        database: '',
        network: ''
      },
      estimatedEffort: 4,
      estimatedCost: 500
    });
  };

  const removeApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const generateMigrationPlan = (): MigrationPlan => {
    // Sort applications by criticality and dependencies
    const sortedApps = [...applications].sort((a, b) => {
      const criticalityOrder = { low: 0, medium: 1, high: 2 };
      return criticalityOrder[a.criticality] - criticalityOrder[b.criticality];
    });

    // Create phases based on dependencies and criticality
    const phases = [
      {
        name: 'Phase 1: Foundation & Low-Risk Applications',
        applications: sortedApps
          .filter(app => app.criticality === 'low' && app.dependencies.length === 0)
          .map(app => app.name),
        duration: 12, // weeks
        dependencies: ['Network setup', 'Security baseline', 'Monitoring setup'],
        risks: ['Network connectivity issues', 'Security configuration']
      },
      {
        name: 'Phase 2: Medium Criticality Applications',
        applications: sortedApps
          .filter(app => app.criticality === 'medium')
          .map(app => app.name),
        duration: 16,
        dependencies: ['Phase 1 completion', 'Staff training', 'Backup procedures'],
        risks: ['Application compatibility', 'Performance degradation']
      },
      {
        name: 'Phase 3: High Criticality & Complex Applications',
        applications: sortedApps
          .filter(app => app.criticality === 'high' || app.dependencies.length > 0)
          .map(app => app.name),
        duration: 20,
        dependencies: ['Phase 2 completion', 'Disaster recovery plan', 'Full testing'],
        risks: ['Business disruption', 'Data integrity', 'Complex dependencies']
      }
    ];

    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0);
    const totalCost = applications.reduce((sum, app) => sum + app.estimatedCost, 0);

    const riskAssessment = {
      high: applications.filter(app => app.criticality === 'high').length,
      medium: applications.filter(app => app.criticality === 'medium').length,
      low: applications.filter(app => app.criticality === 'low').length
    };

    return {
      phases: phases.filter(phase => phase.applications.length > 0),
      totalDuration,
      totalCost,
      riskAssessment
    };
  };

  const plan = showPlan ? generateMigrationPlan() : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Move className="w-8 h-8 mr-3 text-blue-600" />
          Cloud Migration Planner
        </h1>
        <p className="text-lg text-gray-600">
          Plan and execute your cloud migration strategy with confidence.
        </p>
      </div>

      {!showPlan ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Application Input */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add Application</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Name
                  </label>
                  <input
                    type="text"
                    value={newApp.name || ''}
                    onChange={(e) => setNewApp(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Customer Portal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Type
                  </label>
                  <select
                    value={newApp.type || 'web-app'}
                    onChange={(e) => setNewApp(prev => ({ ...prev, type: e.target.value as Application['type'] }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="web-app">Web Application</option>
                    <option value="database">Database</option>
                    <option value="file-server">File Server</option>
                    <option value="analytics">Analytics Platform</option>
                    <option value="legacy">Legacy System</option>
                    <option value="microservice">Microservice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Criticality
                  </label>
                  <select
                    value={newApp.criticality || 'medium'}
                    onChange={(e) => setNewApp(prev => ({ ...prev, criticality: e.target.value as Application['criticality'] }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servers
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newApp.currentInfrastructure?.servers || 1}
                      onChange={(e) => setNewApp(prev => ({
                        ...prev,
                        currentInfrastructure: {
                          ...prev.currentInfrastructure!,
                          servers: parseInt(e.target.value)
                        }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Effort (weeks)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newApp.estimatedEffort || 4}
                      onChange={(e) => setNewApp(prev => ({ ...prev, estimatedEffort: parseInt(e.target.value) }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Cost After Migration ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newApp.estimatedCost || 500}
                    onChange={(e) => setNewApp(prev => ({ ...prev, estimatedCost: parseInt(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={addApplication}
                  disabled={!newApp.name}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Application
                </button>
              </div>
            </div>

            {/* Migration Strategy Selection */}
            <div className="bg-white border rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Migration Strategy</h3>
              <div className="space-y-2">
                {Object.entries(migrationStrategies).map(([key, strategy]) => {
                  const IconComponent = strategy.icon;
                  return (
                    <label
                      key={key}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedStrategy === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="strategy"
                        value={key}
                        checked={selectedStrategy === key}
                        onChange={(e) => setSelectedStrategy(e.target.value)}
                        className="mr-3"
                      />
                      <IconComponent className="w-5 h-5 mr-2 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">{strategy.name}</div>
                        <div className="text-sm text-gray-600">{strategy.timeframe}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Applications Portfolio</h2>
                {applications.length > 0 && (
                  <button
                    onClick={() => setShowPlan(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Generate Migration Plan
                  </button>
                )}
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Server className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No applications added yet</p>
                  <p className="text-sm">Add applications to start planning your migration</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold text-gray-900">{app.name}</h3>
                            <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                              app.criticality === 'high' ? 'bg-red-100 text-red-800' :
                              app.criticality === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {app.criticality} priority
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Type:</span> {app.type}
                            </div>
                            <div>
                              <span className="font-medium">Servers:</span> {app.currentInfrastructure.servers}
                            </div>
                            <div>
                              <span className="font-medium">Effort:</span> {app.estimatedEffort}w
                            </div>
                            <div>
                              <span className="font-medium">Cost:</span> ${app.estimatedCost}/mo
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeApplication(app.id)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Strategy Details */}
            {selectedStrategy && (
              <div className="bg-white border rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Selected Strategy: {migrationStrategies[selectedStrategy].name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {migrationStrategies[selectedStrategy].description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Advantages
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      {migrationStrategies[selectedStrategy].pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Considerations
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      {migrationStrategies[selectedStrategy].cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Migration Plan Results */
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Migration Plan</h2>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPlan(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Back to Planning
              </button>
              <button
                onClick={() => {
                  const planData = JSON.stringify(plan, null, 2);
                  const blob = new Blob([planData], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'migration-plan.json';
                  a.click();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Plan
              </button>
            </div>
          </div>

          {/* Plan Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Duration</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(plan!.totalDuration / 4)} months
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${plan!.totalCost.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.length}
                  </p>
                </div>
                <Server className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
              Risk Assessment
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{plan!.riskAssessment.high}</div>
                <div className="text-sm text-red-700">High Risk Applications</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{plan!.riskAssessment.medium}</div>
                <div className="text-sm text-yellow-700">Medium Risk Applications</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{plan!.riskAssessment.low}</div>
                <div className="text-sm text-green-700">Low Risk Applications</div>
              </div>
            </div>
          </div>

          {/* Migration Phases */}
          <div className="space-y-6">
            {plan!.phases.map((phase, index) => (
              <div key={index} className="bg-white border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
                  <span className="ml-auto text-sm text-gray-600">
                    {phase.duration} weeks
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <Server className="w-4 h-4 mr-1" />
                      Applications ({phase.applications.length})
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phase.applications.map((app, appIndex) => (
                        <li key={appIndex} className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <Network className="w-4 h-4 mr-1" />
                      Dependencies
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phase.dependencies.map((dep, depIndex) => (
                        <li key={depIndex} className="flex items-center">
                          <span className="text-green-500 mr-2">•</span>
                          {dep}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Key Risks
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phase.risks.map((risk, riskIndex) => (
                        <li key={riskIndex} className="flex items-center">
                          <span className="text-orange-500 mr-2">•</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Recommended Next Steps
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Immediate Actions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Conduct detailed application assessments</li>
                  <li>• Set up cloud accounts and initial infrastructure</li>
                  <li>• Establish security baselines and compliance framework</li>
                  <li>• Train team members on cloud technologies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Planning & Preparation</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Create detailed runbooks for each application</li>
                  <li>• Establish monitoring and alerting systems</li>
                  <li>• Plan data migration strategies</li>
                  <li>• Prepare rollback procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MigrationPlanner;
