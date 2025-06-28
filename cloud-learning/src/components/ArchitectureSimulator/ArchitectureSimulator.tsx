import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, AlertTriangle, Activity, Zap, Shield, DollarSign } from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  components: string[];
  challenges: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
}

interface SimulationMetrics {
  requests: number;
  latency: number;
  availability: number;
  cost: number;
  errors: number;
  throughput: number;
}

export const ArchitectureSimulator: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<string>('load-balancing');
  const [isRunning, setIsRunning] = useState(false);
  const [simulationTime, setSimulationTime] = useState(0);
  const [simulationData, setSimulationData] = useState<SimulationMetrics>({
    requests: 0,
    latency: 45,
    availability: 99.9,
    cost: 150,
    errors: 0,
    throughput: 0
  });

  const scenarios: SimulationScenario[] = [
    {
      id: 'load-balancing',
      name: 'High-Traffic Load Balancing',
      description: 'Simulate traffic spikes and load distribution across multiple servers',
      components: ['Application Load Balancer', 'Auto Scaling Group', 'RDS Multi-AZ', 'CloudFront CDN'],
      challenges: ['Traffic surge handling', 'Database connection limits', 'Cache invalidation', 'SSL termination'],
      difficulty: 'Intermediate',
      estimatedTime: '15 minutes'
    },
    {
      id: 'disaster-recovery',
      name: 'Disaster Recovery Scenario',
      description: 'Test backup and recovery mechanisms during infrastructure failures',
      components: ['Primary Region', 'DR Region', 'Cross-Region Replication', 'Route 53 Health Checks'],
      challenges: ['RTO/RPO requirements', 'Data consistency', 'Failover automation', 'Cost optimization'],
      difficulty: 'Advanced',
      estimatedTime: '25 minutes'
    },
    {
      id: 'microservices',
      name: 'Microservices Architecture',
      description: 'Deploy and scale microservices with container orchestration',
      components: ['Kubernetes Cluster', 'Service Mesh', 'API Gateway', 'Container Registry'],
      challenges: ['Service discovery', 'Circuit breakers', 'Distributed tracing', 'Rolling deployments'],
      difficulty: 'Advanced',
      estimatedTime: '30 minutes'
    },
    {
      id: 'serverless',
      name: 'Serverless Event Processing',
      description: 'Build event-driven architecture with serverless functions',
      components: ['Lambda Functions', 'EventBridge', 'SQS/SNS', 'DynamoDB'],
      challenges: ['Cold start optimization', 'Event ordering', 'Error handling', 'Cost monitoring'],
      difficulty: 'Intermediate',
      estimatedTime: '20 minutes'
    },
    {
      id: 'data-pipeline',
      name: 'Big Data Processing Pipeline',
      description: 'Process large-scale data with streaming and batch processing',
      components: ['Kinesis Data Streams', 'EMR Cluster', 'S3 Data Lake', 'Redshift'],
      challenges: ['Data partitioning', 'Schema evolution', 'Cost optimization', 'Real-time analytics'],
      difficulty: 'Advanced',
      estimatedTime: '35 minutes'
    },
    {
      id: 'security-compliance',
      name: 'Security & Compliance Architecture',
      description: 'Implement security best practices and compliance requirements',
      components: ['WAF', 'GuardDuty', 'Security Hub', 'Config Rules'],
      challenges: ['PCI DSS compliance', 'Data encryption', 'Access control', 'Audit logging'],
      difficulty: 'Advanced',
      estimatedTime: '25 minutes'
    }
  ];

  // Simulation engine
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSimulationTime(prev => prev + 1);
        
        // Simulate realistic metrics based on scenario
        setSimulationData(prev => {
          const newData = { ...prev };
          
          switch (currentScenario) {
            case 'load-balancing':
              newData.requests = Math.floor(Math.random() * 1000) + 500;
              newData.latency = Math.floor(Math.random() * 50) + 30;
              newData.availability = 99.5 + Math.random() * 0.5;
              newData.throughput = newData.requests * 0.8;
              break;
              
            case 'disaster-recovery':
              newData.requests = Math.floor(Math.random() * 200) + 100;
              newData.latency = Math.floor(Math.random() * 100) + 50;
              newData.availability = simulationTime > 30 ? 99.9 : 85 + Math.random() * 10;
              newData.throughput = newData.requests * 0.9;
              break;
              
            case 'microservices':
              newData.requests = Math.floor(Math.random() * 2000) + 1000;
              newData.latency = Math.floor(Math.random() * 30) + 15;
              newData.availability = 99.8 + Math.random() * 0.2;
              newData.throughput = newData.requests * 0.95;
              break;
              
            default:
              newData.requests = Math.floor(Math.random() * 500) + 200;
              newData.latency = Math.floor(Math.random() * 60) + 40;
              newData.availability = 99.0 + Math.random() * 1.0;
              newData.throughput = newData.requests * 0.85;
          }
          
          newData.cost = 150 + (newData.requests / 10);
          newData.errors = Math.floor(Math.random() * 5);
          
          return newData;
        });
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentScenario, simulationTime]);

  const resetSimulation = () => {
    setIsRunning(false);
    setSimulationTime(0);
    setSimulationData({
      requests: 0,
      latency: 45,
      availability: 99.9,
      cost: 150,
      errors: 0,
      throughput: 0
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case 'availability':
        return value >= 99.5 ? 'text-green-600' : value >= 99.0 ? 'text-yellow-600' : 'text-red-600';
      case 'latency':
        return value <= 50 ? 'text-green-600' : value <= 100 ? 'text-yellow-600' : 'text-red-600';
      case 'errors':
        return value <= 2 ? 'text-green-600' : value <= 5 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const currentScenarioData = scenarios.find(s => s.id === currentScenario);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Architecture Simulator</h1>
              <p className="text-gray-600 mt-1">Test and validate your architecture designs in real-time scenarios</p>
            </div>
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Simulation Scenario</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => setCurrentScenario(scenario.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  currentScenario === scenario.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{scenario.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(scenario.difficulty)}`}>
                    {scenario.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                <div className="text-sm text-gray-500 mb-3">
                  ⏱️ Est. Time: {scenario.estimatedTime}
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Components:</div>
                  <div className="flex flex-wrap gap-1">
                    {scenario.components.slice(0, 3).map((component, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {component}
                      </span>
                    ))}
                    {scenario.components.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                        +{scenario.components.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Scenario Details */}
        {currentScenarioData && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Current Scenario: {currentScenarioData.name}
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <Settings className="w-4 h-4 mr-1" />
                Running for {Math.floor(simulationTime / 60)}:{(simulationTime % 60).toString().padStart(2, '0')}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Architecture Components</h3>
                <div className="space-y-2">
                  {currentScenarioData.components.map((component, index) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm">{component}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Key Challenges</h3>
                <div className="space-y-2">
                  {currentScenarioData.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-center p-2 bg-yellow-50 rounded">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-3" />
                      <span className="text-sm">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Simulation Controls</h2>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  isRunning 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isRunning ? 'Stop Simulation' : 'Start Simulation'}
              </button>
              <button 
                onClick={resetSimulation}
                className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${getMetricColor('requests', simulationData.requests)}`}>
                {simulationData.requests}
              </div>
              <div className="text-sm text-blue-800 mt-1">Requests/sec</div>
              <div className="flex items-center justify-center mt-2">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${getMetricColor('latency', simulationData.latency)}`}>
                {simulationData.latency}ms
              </div>
              <div className="text-sm text-green-800 mt-1">Avg Latency</div>
              <div className="flex items-center justify-center mt-2">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${getMetricColor('availability', simulationData.availability)}`}>
                {simulationData.availability.toFixed(2)}%
              </div>
              <div className="text-sm text-yellow-800 mt-1">Availability</div>
              <div className="flex items-center justify-center mt-2">
                <Shield className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${simulationData.cost.toFixed(0)}
              </div>
              <div className="text-sm text-purple-800 mt-1">Hourly Cost</div>
              <div className="flex items-center justify-center mt-2">
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${getMetricColor('errors', simulationData.errors)}`}>
                {simulationData.errors}
              </div>
              <div className="text-sm text-red-800 mt-1">Errors</div>
              <div className="flex items-center justify-center mt-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {simulationData.throughput.toFixed(0)}
              </div>
              <div className="text-sm text-indigo-800 mt-1">Throughput</div>
              <div className="flex items-center justify-center mt-2">
                <Activity className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        {isRunning && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-time Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Performance Analysis</h3>
                {simulationData.latency > 80 && (
                  <div className="flex items-start p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">High Latency Detected</div>
                      <div className="text-sm text-yellow-700">Consider adding more cache layers or optimizing database queries</div>
                    </div>
                  </div>
                )}
                {simulationData.availability < 99.0 && (
                  <div className="flex items-start p-3 bg-red-50 border-l-4 border-red-400 rounded">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-red-800">Low Availability Alert</div>
                      <div className="text-sm text-red-700">Check health checks and implement circuit breakers</div>
                    </div>
                  </div>
                )}
                {simulationData.requests > 800 && (
                  <div className="flex items-start p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <Zap className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">High Traffic Volume</div>
                      <div className="text-sm text-blue-700">Auto-scaling is working effectively</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Cost Optimization</h3>
                {simulationData.cost > 200 && (
                  <div className="flex items-start p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                    <DollarSign className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-orange-800">High Cost Alert</div>
                      <div className="text-sm text-orange-700">Consider using reserved instances or spot instances</div>
                    </div>
                  </div>
                )}
                <div className="flex items-start p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <Shield className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-800">Architecture Status</div>
                    <div className="text-sm text-green-700">Your architecture is performing within expected parameters</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
