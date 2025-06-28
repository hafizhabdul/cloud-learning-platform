import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingDown, Info, Zap, CheckCircle, BarChart3, PieChart } from 'lucide-react';

interface ServiceCost {
  service: string;
  category: string;
  configuration: {
    [key: string]: string | number;
  };
  monthlyCost: number;
  yearlyDiscount?: number;
}

interface OptimizationRecommendation {
  id: string;
  type: 'cost-saving' | 'performance' | 'security' | 'reliability';
  title: string;
  description: string;
  potentialSavings: number;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'moderate' | 'complex';
  category: string;
}

interface CostAnalytics {
  breakdown: {
    compute: number;
    storage: number;
    network: number;
    database: number;
    other: number;
  };
  trends: {
    month: string;
    cost: number;
  }[];
  topExpenses: ServiceCost[];
}

interface CostCalculation {
  totalMonthlyCost: number;
  totalYearlyCost: number;
  totalWithReserved: number;
  savingsOpportunity: number;
  services: ServiceCost[];
  recommendations: OptimizationRecommendation[];
  analytics: CostAnalytics;
}

const CostCalculator: React.FC = () => {
  const [calculation, setCalculation] = useState<CostCalculation>({
    totalMonthlyCost: 0,
    totalYearlyCost: 0,
    totalWithReserved: 0,
    savingsOpportunity: 0,
    services: [],
    recommendations: [],
    analytics: {
      breakdown: { compute: 0, storage: 0, network: 0, database: 0, other: 0 },
      trends: [],
      topExpenses: []
    }
  });

  const [selectedService, setSelectedService] = useState<string>('ec2');
  const [serviceConfig, setServiceConfig] = useState<Record<string, string | number>>({});
  const [activeTab, setActiveTab] = useState<'calculator' | 'analytics' | 'recommendations'>('calculator');

  // AWS Service pricing (simplified estimates)
  const calculateServiceCost = (service: string, config: Record<string, string | number>): number => {
    // Simplified cost calculation for demo purposes
    switch (service) {
      case 'ec2': {
        const instances = config.instances || 1;
        const baseHourly = 0.0416; // t3.medium base price
        return (baseHourly * (instances as number) * 730);
      }
      case 'rds': {
        const instances = config.instances || 1;
        const baseHourly = 0.068; // db.t3.medium base price
        return (baseHourly * (instances as number) * 730);
      }
      case 'lambda': {
        const requests = config.monthlyRequests || 1000000;
        return (requests as number) * 0.0000002; // Simplified Lambda pricing
      }
      case 's3': {
        const storage = config.storageGB || 100;
        return (storage as number) * 0.023; // Standard storage pricing
      }
      case 'cloudfront': {
        const dataTransfer = config.dataTransferGB || 100;
        return (dataTransfer as number) * 0.085; // Data transfer pricing
      }
      default:
        return 0;
    }
  };

  const addService = () => {
    const cost = calculateServiceCost(selectedService, serviceConfig);
    
    const serviceNames: Record<string, string> = {
      ec2: 'Amazon EC2',
      rds: 'Amazon RDS', 
      lambda: 'AWS Lambda',
      s3: 'Amazon S3',
      cloudfront: 'CloudFront'
    };

    const serviceCategories: Record<string, string> = {
      ec2: 'Compute',
      rds: 'Database',
      lambda: 'Compute',
      s3: 'Storage',
      cloudfront: 'CDN'
    };
    
    const newService: ServiceCost = {
      service: serviceNames[selectedService] || selectedService,
      category: serviceCategories[selectedService] || 'Other',
      configuration: { ...serviceConfig },
      monthlyCost: cost,
      yearlyDiscount: 0.31 // Default 31% discount for reserved instances
    };

    const updatedServices = [...calculation.services, newService];
    updateCalculation(updatedServices);
    setServiceConfig({});
  };

  const removeService = (index: number) => {
    const updatedServices = calculation.services.filter((_, i) => i !== index);
    updateCalculation(updatedServices);
  };

  const updateCalculation = (services: ServiceCost[]) => {
    const totalMonthlyCost = services.reduce((sum, service) => sum + service.monthlyCost, 0);
    const totalYearlyCost = totalMonthlyCost * 12;
    
    // Calculate potential savings with reserved instances
    const totalWithReserved = services.reduce((sum, service) => {
      const discount = service.yearlyDiscount || 0;
      const yearlyCost = service.monthlyCost * 12;
      return sum + (yearlyCost * (1 - discount));
    }, 0);
    
    const savingsOpportunity = totalYearlyCost - totalWithReserved;

    setCalculation(prev => ({
      ...prev,
      totalMonthlyCost,
      totalYearlyCost,
      totalWithReserved,
      savingsOpportunity,
      services
    }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getSavingsPercentage = (): number => {
    if (calculation.totalYearlyCost === 0) return 0;
    return (calculation.savingsOpportunity / calculation.totalYearlyCost) * 100;
  };

  // Fetch optimization recommendations (mocked for this demo)
  useEffect(() => {
    const fetchRecommendations = () => {
      // Mocked API response
      const recommendations: OptimizationRecommendation[] = [
        {
          id: '1',
          type: 'cost-saving',
          title: 'Use Reserved Instances',
          description: 'Consider using Reserved Instances for your EC2 and RDS instances to save up to 35% on your monthly bill.',
          potentialSavings: calculation.savingsOpportunity,
          impact: 'high',
          effort: 'easy',
          category: 'Compute'
        },
        {
          id: '2',
          type: 'performance',
          title: 'Right-Size Your Instances',
          description: 'Analyze your instance usage and resize them to better fit your workload requirements.',
          potentialSavings: calculation.savingsOpportunity * 0.2,
          impact: 'medium',
          effort: 'moderate',
          category: 'Compute'
        },
        {
          id: '3',
          type: 'security',
          title: 'Enable Encryption at Rest',
          description: 'Enhance your data security by enabling encryption at rest for your S3 buckets and RDS instances.',
          potentialSavings: 0,
          impact: 'high',
          effort: 'easy',
          category: 'Security'
        },
        {
          id: '4',
          type: 'reliability',
          title: 'Implement Multi-AZ Deployments',
          description: 'Increase the availability of your RDS instances by enabling Multi-AZ deployments.',
          potentialSavings: 0,
          impact: 'high',
          effort: 'moderate',
          category: 'Database'
        }
      ];

      setCalculation((prev) => ({
        ...prev,
        recommendations
      }));
    };

    fetchRecommendations();
  }, [calculation.savingsOpportunity]);

  // Generate cost analytics data (mocked for this demo)
  useEffect(() => {
    const generateAnalytics = () => {
      // Mocked data
      const breakdown = {
        compute: calculation.services.filter(s => s.category === 'Compute').reduce((sum, s) => sum + s.monthlyCost, 0),
        storage: calculation.services.filter(s => s.category === 'Storage').reduce((sum, s) => sum + s.monthlyCost, 0),
        network: calculation.services.filter(s => s.category === 'Network').reduce((sum, s) => sum + s.monthlyCost, 0),
        database: calculation.services.filter(s => s.category === 'Database').reduce((sum, s) => sum + s.monthlyCost, 0),
        other: calculation.services.filter(s => s.category !== 'Compute' && s.category !== 'Storage' && s.category !== 'Network' && s.category !== 'Database').reduce((sum, s) => sum + s.monthlyCost, 0)
      };

      const trends = [
        { month: 'Jan', cost: Math.random() * 1000 },
        { month: 'Feb', cost: Math.random() * 1000 },
        { month: 'Mar', cost: Math.random() * 1000 },
        { month: 'Apr', cost: Math.random() * 1000 },
        { month: 'May', cost: Math.random() * 1000 },
        { month: 'Jun', cost: Math.random() * 1000 },
        { month: 'Jul', cost: Math.random() * 1000 },
        { month: 'Aug', cost: Math.random() * 1000 },
        { month: 'Sep', cost: Math.random() * 1000 },
        { month: 'Oct', cost: Math.random() * 1000 },
        { month: 'Nov', cost: Math.random() * 1000 },
        { month: 'Dec', cost: Math.random() * 1000 }
      ];

      const topExpenses = calculation.services.sort((a, b) => b.monthlyCost - a.monthlyCost).slice(0, 5);

      setCalculation((prev) => ({
        ...prev,
        analytics: {
          breakdown,
          trends,
          topExpenses
        }
      }));
    };

    generateAnalytics();
  }, [calculation.services]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Calculator className="w-8 h-8 mr-3 text-blue-600" />
          AWS Cost Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Estimate and optimize your AWS infrastructure costs with real-time pricing calculations.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Service Configuration */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add Service</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AWS Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ec2">Amazon EC2</option>
                  <option value="rds">Amazon RDS</option>
                  <option value="lambda">AWS Lambda</option>
                  <option value="s3">Amazon S3</option>
                  <option value="cloudfront">CloudFront</option>
                </select>
              </div>

              {/* EC2 Configuration */}
              {selectedService === 'ec2' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instance Type
                    </label>
                    <select
                      value={serviceConfig.instanceType || 't3.micro'}
                      onChange={(e) => setServiceConfig({...serviceConfig, instanceType: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="t3.micro">t3.micro (2 vCPU, 1GB RAM)</option>
                      <option value="t3.small">t3.small (2 vCPU, 2GB RAM)</option>
                      <option value="t3.medium">t3.medium (2 vCPU, 4GB RAM)</option>
                      <option value="t3.large">t3.large (2 vCPU, 8GB RAM)</option>
                      <option value="m5.large">m5.large (2 vCPU, 8GB RAM)</option>
                      <option value="m5.xlarge">m5.xlarge (4 vCPU, 16GB RAM)</option>
                      <option value="c5.large">c5.large (2 vCPU, 4GB RAM)</option>
                      <option value="r5.large">r5.large (2 vCPU, 16GB RAM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Instances
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={serviceConfig.instances || 1}
                      onChange={(e) => setServiceConfig({...serviceConfig, instances: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              {/* Lambda Configuration */}
              {selectedService === 'lambda' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Requests
                    </label>
                    <input
                      type="number"
                      value={serviceConfig.monthlyRequests || 1000000}
                      onChange={(e) => setServiceConfig({...serviceConfig, monthlyRequests: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Duration (ms)
                    </label>
                    <input
                      type="number"
                      value={serviceConfig.avgDuration || 100}
                      onChange={(e) => setServiceConfig({...serviceConfig, avgDuration: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Memory (MB)
                    </label>
                    <select
                      value={serviceConfig.memory || 128}
                      onChange={(e) => setServiceConfig({...serviceConfig, memory: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={128}>128 MB</option>
                      <option value={256}>256 MB</option>
                      <option value={512}>512 MB</option>
                      <option value={1024}>1024 MB</option>
                      <option value={2048}>2048 MB</option>
                      <option value={3008}>3008 MB</option>
                    </select>
                  </div>
                </>
              )}

              {/* S3 Configuration */}
              {selectedService === 's3' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage (GB)
                    </label>
                    <input
                      type="number"
                      value={serviceConfig.storageGB || 100}
                      onChange={(e) => setServiceConfig({...serviceConfig, storageGB: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage Class
                    </label>
                    <select
                      value={serviceConfig.storageClass || 'standard'}
                      onChange={(e) => setServiceConfig({...serviceConfig, storageClass: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="standard">Standard</option>
                      <option value="ia">Infrequent Access</option>
                      <option value="glacier">Glacier</option>
                    </select>
                  </div>
                </>
              )}

              <button
                onClick={addService}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Monthly Cost */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Cost</h3>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {formatCurrency(calculation.totalMonthlyCost)}
              </div>
              <p className="text-sm text-gray-600">Current configuration</p>
            </div>

            {/* Yearly Savings */}
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Potential Savings</h3>
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(calculation.savingsOpportunity)}
              </div>
              <p className="text-sm text-gray-600">
                {getSavingsPercentage().toFixed(1)}% with Reserved Instances
              </p>
            </div>
          </div>

          {/* Optimization Recommendations */}
          {calculation.savingsOpportunity > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Zap className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Cost Optimization Opportunities</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Consider Reserved Instances for consistent workloads</li>
                    <li>• Evaluate Spot Instances for fault-tolerant applications</li>
                    <li>• Right-size instances based on actual usage</li>
                    <li>• Use Auto Scaling to optimize capacity</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Services List */}
          <div className="bg-white border rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Cost Breakdown</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {calculation.services.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Calculator className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No services added yet. Add your first service to see cost calculations.</p>
                </div>
              ) : (
                calculation.services.map((service, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{service.service}</h4>
                          <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {service.category}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {Object.entries(service.configuration).map(([key, value]) => (
                            <span key={key} className="mr-4">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(service.monthlyCost)}/month
                        </div>
                        {service.yearlyDiscount && (
                          <div className="text-sm text-green-600">
                            Save {(service.yearlyDiscount * 100).toFixed(0)}% with RI
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeService(index)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Analysis Tabs */}
      <div className="mt-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center ${
              activeTab === 'calculator' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <Calculator className="w-5 h-5 mr-2" />
            Cost Calculator
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center ${
              activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Cost Analytics
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center ${
              activeTab === 'recommendations' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Recommendations
          </button>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'calculator' && (
          <div>
            {/* Existing calculator content... */}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analytics</h3>
            
            {/* Analytics breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Cost Breakdown</h4>
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Compute</span>
                    <span>{formatCurrency(calculation.analytics.breakdown.compute)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Storage</span>
                    <span>{formatCurrency(calculation.analytics.breakdown.storage)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Network</span>
                    <span>{formatCurrency(calculation.analytics.breakdown.network)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Database</span>
                    <span>{formatCurrency(calculation.analytics.breakdown.database)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Other</span>
                    <span>{formatCurrency(calculation.analytics.breakdown.other)}</span>
                  </div>
                </div>
              </div>

              {/* Trends chart (mocked) */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Monthly Trends</h4>
                <div className="h-32">
                  {/* Mocked trend chart - replace with actual chart component */}
                  <PieChart className="w-full h-full text-gray-300" />
                </div>
              </div>
            </div>

            {/* Top expenses */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Top Expenses</h4>
              <div className="space-y-4">
                {calculation.analytics.topExpenses.map((service, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">{service.service}</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {formatCurrency(service.monthlyCost)}/month
                      </div>
                    </div>
                    <button
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
            
            <div className="space-y-4">
              {calculation.recommendations.map((rec) => (
                <div key={rec.id} className="p-4 bg-gray-50 rounded-lg flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full mr-3 ${rec.type === 'cost-saving' ? 'bg-green-600' : rec.type === 'performance' ? 'bg-blue-600' : rec.type === 'security' ? 'bg-red-600' : 'bg-yellow-600'}`} />
                    <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Potential Savings: {formatCurrency(rec.potentialSavings)}</span>
                    <span>Impact: {rec.impact}</span>
                    <span>Effort: {rec.effort}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cost Analysis Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Cost Analysis Best Practices</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <p>• Use this calculator for initial estimates. Actual costs may vary based on usage patterns.</p>
              <p>• Consider data transfer costs, which can be significant for high-traffic applications.</p>
              <p>• Monitor actual usage with AWS Cost Explorer and CloudWatch for accurate optimization.</p>
              <p>• Factor in operational costs like monitoring, backup, and disaster recovery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
